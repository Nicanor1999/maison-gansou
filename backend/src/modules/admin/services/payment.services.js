/**
 * @PaymentServices
 * FedaPay Payment Integration Service
 */

require('dotenv').config();
const CoreServices = require("../../../shared/services/core.services")
const EmailServices = require("../../../shared/services/email.services")
const axios = require('axios')

module.exports = class PaymentServices extends CoreServices {

  constructor() {
    super();
    this.Reservation = require("../../admin/models/reservation.model");
    this.ReservationServices = new(require("../../admin/services/reservation.services"))();

    // FedaPay configuration
    this.fedaPayBaseUrl = process.env.FEDAPAY_ENV === 'live'
      ? 'https://api.fedapay.com/v1'
      : 'https://sandbox-api.fedapay.com/v1';
    this.fedaPaySecretKey = process.env.FEDAPAY_SECRET_KEY;
  }

  /**
   * Get FedaPay headers for API calls
   */
  getFedaPayHeaders = () => {
    return {
      'Authorization': `Bearer ${this.fedaPaySecretKey}`,
      'Content-Type': 'application/json'
    };
  };

  /**
   * Create a FedaPay transaction for a reservation
   * @param {string} reservationId - The reservation ID
   * @param {object} paymentData - Payment details
   */
  createTransaction = async (reservationId, paymentData) => {
    try {
      // Find the reservation
      const reservation = await this.Reservation.findOne({ _id: reservationId }).populate('offer');

      if (!reservation) {
        throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this reservation'));
      }

      // Calculate the price based on dates and nightly price
      let amount = paymentData.amount;
      if (!amount && reservation.startDate && reservation.arrivalDate) {
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.arrivalDate);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        if (nights > 0 && reservation.offer?.nightlyPrice) {
          amount = nights * reservation.offer.nightlyPrice;
        }
      }

      if (!amount || amount <= 0) {
        throw new this.ValidationError('Invalid amount for transaction');
      }

      // Clean phone number (remove spaces and special characters except +)
      const cleanPhone = (phone) => {
        if (!phone) return '';
        return phone.replace(/[\s\-\(\)]/g, '');
      };

      // Create customer data
      const customerData = {
        firstname: reservation.firstNameClient || 'Client',
        lastname: reservation.lastNameClient || 'Client',
        email: reservation.email || paymentData.email,
        phone_number: {
          number: cleanPhone(reservation.phone || paymentData.phone),
          country: paymentData.phoneCountry || 'bj'
        }
      };

      // Create FedaPay transaction
      const transactionData = {
        description: `Réservation ${reservation._id} - ${reservation.offer?.title || 'Location'}`,
        amount: amount,
        currency: {
          iso: paymentData.currency || 'XOF'
        },
        callback_url: `${process.env.BASE_URL}api/v1/payment/callback`,
        customer: customerData
      };

      const response = await axios.post(
        `${this.fedaPayBaseUrl}/transactions`,
        transactionData,
        { headers: this.getFedaPayHeaders() }
      );

      // FedaPay returns 'v1/transaction' with a slash
      const transaction = response.data['v1/transaction'];

      // Update reservation with transaction info
      await this.Reservation.findByIdAndUpdate(reservationId, {
        paymentTransactionId: transaction.id,
        paymentStatus: 'pending',
        paymentAmount: amount
      });

      return {
        transactionId: transaction.id,
        amount: amount,
        status: transaction.status,
        paymentUrl: transaction.payment_url,
        paymentToken: transaction.payment_token,
        transaction: transaction
      };

    } catch (error) {
      if (error.response) {
        this.Logger.error('FedaPay API Error - Status:', error.response.status);
        this.Logger.error('FedaPay API Error - Data:', JSON.stringify(error.response.data, null, 2));
        const errorMessage = error.response.data?.message ||
                            error.response.data?.error?.message ||
                            JSON.stringify(error.response.data) ||
                            'Payment service error';
        throw new this.ApiError(errorMessage);
      }
      throw error;
    }
  };

  /**
   * Generate payment token/link for a transaction
   * @param {number} transactionId - FedaPay transaction ID
   */
  generatePaymentToken = async (transactionId) => {
    try {
      const response = await axios.post(
        `${this.fedaPayBaseUrl}/transactions/${transactionId}/token`,
        {},
        { headers: this.getFedaPayHeaders() }
      );

      const token = response.data.token;
      const paymentUrl = process.env.FEDAPAY_ENV === 'live'
        ? `https://process.fedapay.com/${token}`
        : `https://sandbox-process.fedapay.com/${token}`;

      return {
        token: token,
        paymentUrl: paymentUrl
      };

    } catch (error) {
      if (error.response) {
        this.Logger.error('FedaPay Token Error:', error.response.data);
        throw new this.ApiError(error.response.data.message || 'Failed to generate payment link');
      }
      throw error;
    }
  };

  /**
   * Create transaction and get payment URL in one call
   * @param {string} reservationId - The reservation ID
   * @param {object} paymentData - Payment details
   */
  initiatePayment = async (reservationId, paymentData) => {
    try {
      // Create the transaction - FedaPay returns payment_url directly
      const transactionResult = await this.createTransaction(reservationId, paymentData);

      return {
        transactionId: transactionResult.transactionId,
        amount: transactionResult.amount,
        status: transactionResult.status,
        paymentUrl: transactionResult.paymentUrl,
        token: transactionResult.paymentToken
      };

    } catch (error) {
      throw error;
    }
  };

  /**
   * Get transaction status from FedaPay
   * @param {number} transactionId - FedaPay transaction ID
   */
  getTransactionStatus = async (transactionId) => {
    try {
      const response = await axios.get(
        `${this.fedaPayBaseUrl}/transactions/${transactionId}`,
        { headers: this.getFedaPayHeaders() }
      );

      // FedaPay returns 'v1/transaction' with a slash
      return response.data['v1/transaction'];

    } catch (error) {
      if (error.response) {
        this.Logger.error('FedaPay Status Error:', error.response.data);
        throw new this.ApiError(error.response.data.message || 'Failed to get transaction status');
      }
      throw error;
    }
  };

  /**
   * Handle FedaPay webhook/callback
   * @param {object} callbackData - Callback data from FedaPay
   */
  handleCallback = async (callbackData) => {
    try {
      const { id, status } = callbackData;

      if (!id) {
        throw new this.ValidationError('Transaction ID is required');
      }

      // Get full transaction details from FedaPay
      const transaction = await this.getTransactionStatus(id);

      // Find reservation by transaction ID
      const reservation = await this.Reservation.findOne({ paymentTransactionId: id });

      if (!reservation) {
        this.Logger.warn(`Reservation not found for transaction: ${id}`);
        return { success: false, message: 'Reservation not found' };
      }

      // Map FedaPay status to our status
      let paymentStatus = 'pending';
      if (transaction.status === 'approved') {
        paymentStatus = 'completed';
      } else if (transaction.status === 'declined' || transaction.status === 'canceled') {
        paymentStatus = 'failed';
      } else if (transaction.status === 'refunded') {
        paymentStatus = 'refunded';
      }

      // Update reservation payment status
      await this.Reservation.findByIdAndUpdate(reservation._id, {
        paymentStatus: paymentStatus,
        paymentCompletedAt: paymentStatus === 'completed' ? new Date() : undefined
      });

      this.Logger.info(`Payment ${paymentStatus} for reservation: ${reservation._id}`);

      // Send confirmation email when payment is completed
      if (paymentStatus === 'completed' && reservation.email) {
        try {
          const fullReservation = await this.Reservation.findById(reservation._id).populate('offer');

          const formatDate = (dateString) => {
            if (!dateString) return '-';
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '-';
            return date.toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });
          };

          const emailResult = await EmailServices.sendEmail(
            fullReservation.email,
            {
              clientName: `${fullReservation.firstNameClient || ''} ${fullReservation.lastNameClient || ''}`.trim() || 'Client',
              reservationId: fullReservation._id,
              offerTitle: fullReservation.offer?.title || 'Location',
              amount: fullReservation.paymentAmount,
              startDate: formatDate(fullReservation.startDate),
              arrivalDate: formatDate(fullReservation.arrivalDate),
              transactionId: id,
              year: new Date().getFullYear(),
            },
            'payment-confirmation'
          );

          if (emailResult && emailResult.success) {
            this.Logger.info(`Payment confirmation email sent to: ${fullReservation.email}`);
          } else {
            this.Logger.error(`Payment confirmation email failed for: ${fullReservation.email}`, emailResult?.error);
          }
        } catch (emailError) {
          this.Logger.error('Failed to send payment confirmation email:', emailError.message);
        }
      }

      return {
        success: true,
        reservationId: reservation._id,
        paymentStatus: paymentStatus,
        transactionStatus: transaction.status
      };

    } catch (error) {
      this.Logger.error('Callback handling error:', error);
      throw error;
    }
  };

  /**
   * Get payment info for a reservation
   * @param {string} reservationId - The reservation ID
   */
  getPaymentInfo = async (reservationId) => {
    try {
      const reservation = await this.Reservation.findOne({ _id: reservationId });

      if (!reservation) {
        throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this reservation'));
      }

      let fedaPayTransaction = null;
      if (reservation.paymentTransactionId) {
        try {
          fedaPayTransaction = await this.getTransactionStatus(reservation.paymentTransactionId);
        } catch (err) {
          this.Logger.warn('Could not fetch FedaPay transaction:', err.message);
        }
      }

      return {
        reservationId: reservation._id,
        paymentStatus: reservation.paymentStatus || 'not_initiated',
        paymentAmount: reservation.paymentAmount,
        transactionId: reservation.paymentTransactionId,
        paymentCompletedAt: reservation.paymentCompletedAt,
        fedaPayTransaction: fedaPayTransaction
      };

    } catch (error) {
      throw error;
    }
  };

}
