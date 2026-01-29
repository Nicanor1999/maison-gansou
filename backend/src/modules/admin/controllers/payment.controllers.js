/**
 * @PaymentController
 * FedaPay Payment Controller
 */

const CoreServices = require("../../../shared/services/core.services")

module.exports = class PaymentController extends CoreServices {

  constructor() {
    super()
    this.PaymentServices = new(require("../../admin/services/payment.services"))();
    this.PaymentValidations = require("../../admin/validations/payment.validations");
  }

  /**
   * Initiate Payment
   * ******************
   * @name initiatePayment
   * @route POST /payment/initiate
   * @description Create a FedaPay transaction and return payment URL
   * ******************
   */
  initiatePayment = async (req, res) => {
    const { error } = this.PaymentValidations.InitiatePaymentValidation(req.body);
    if (error) throw new this.ValidationError(error.details[0].message);

    const { reservationId, amount, currency, email, phone, phoneCountry } = req.body;

    const result = await this.PaymentServices.initiatePayment(reservationId, {
      amount,
      currency,
      email,
      phone,
      phoneCountry
    });

    res.json({
      data: result,
      success: true,
      message: 'Payment initiated successfully'
    });
  };

  /**
   * Payment Callback (POST - Webhook)
   * ******************
   * @name callback
   * @route POST /payment/callback
   * @description Handle FedaPay webhook callback
   * ******************
   */
  callback = async (req, res) => {
    this.Logger.info('FedaPay Callback POST received:', JSON.stringify(req.body));

    const result = await this.PaymentServices.handleCallback(req.body);

    res.json({
      success: result.success,
      message: result.message || 'Callback processed'
    });
  };

  /**
   * Payment Callback Redirect (GET - User redirect)
   * ******************
   * @name callbackRedirect
   * @route GET /payment/callback
   * @description Handle FedaPay user redirect after payment
   * ******************
   */
  callbackRedirect = async (req, res) => {
    const { status, id } = req.query;
    const frontendUrl = process.env.FRONT_URL || 'https://maisongansou.com/';

    this.Logger.info('FedaPay Callback GET received:', { status, id });

    try {
      if (id) {
        // Process the callback with transaction ID
        await this.PaymentServices.handleCallback({ id: parseInt(id), status });
      }

      // Redirect to frontend with payment result
      if (status === 'approved') {
        res.redirect(`${frontendUrl}bookings?payment=success`);
      } else if (status === 'declined' || status === 'canceled') {
        res.redirect(`${frontendUrl}bookings?payment=failed`);
      } else {
        res.redirect(`${frontendUrl}bookings?payment=pending`);
      }
    } catch (error) {
      this.Logger.error('Callback redirect error:', error);
      res.redirect(`${frontendUrl}bookings?payment=error`);
    }
  };

  /**
   * Get Payment Status
   * ******************
   * @name getStatus
   * @route GET /payment/status/:reservationId
   * @description Get payment status for a reservation
   * ******************
   */
  getStatus = async (req, res) => {
    const { reservationId } = req.params;

    const result = await this.PaymentServices.getPaymentInfo(reservationId);

    res.json({
      data: result,
      success: true,
      message: 'Payment status retrieved successfully'
    });
  };

  /**
   * Get Transaction Details
   * ******************
   * @name getTransaction
   * @route GET /payment/transaction/:transactionId
   * @description Get FedaPay transaction details
   * ******************
   */
  getTransaction = async (req, res) => {
    const { transactionId } = req.params;

    const transaction = await this.PaymentServices.getTransactionStatus(transactionId);

    res.json({
      data: transaction,
      success: true,
      message: 'Transaction retrieved successfully'
    });
  };

  /**
   * Regenerate Payment Link
   * ******************
   * @name regenerateLink
   * @route POST /payment/regenerate/:transactionId
   * @description Generate a new payment link for an existing transaction
   * ******************
   */
  regenerateLink = async (req, res) => {
    const { transactionId } = req.params;

    const result = await this.PaymentServices.generatePaymentToken(transactionId);

    res.json({
      data: result,
      success: true,
      message: 'Payment link regenerated successfully'
    });
  };

}
