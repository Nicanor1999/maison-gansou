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
   * Payment Callback
   * ******************
   * @name callback
   * @route POST /payment/callback
   * @description Handle FedaPay webhook callback
   * ******************
   */
  callback = async (req, res) => {
    this.Logger.info('FedaPay Callback received:', JSON.stringify(req.body));

    const result = await this.PaymentServices.handleCallback(req.body);

    res.json({
      success: result.success,
      message: result.message || 'Callback processed'
    });
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
