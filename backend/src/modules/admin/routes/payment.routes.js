/**
 * @PaymentRoutes
 * FedaPay Payment Routes
 */

const ParentRoute = require("../../../routes/route.parent")
const SwaggerRouteBuilder = require("../../../shared/lib/swagger/SwaggerRouteBuilder")

module.exports = class PaymentRoutes extends ParentRoute {

  constructor() {
    super()

    // Controller initialization
    const paymentController = new(require("../../admin/controllers/payment.controllers"))();

    // Initialize the express router
    const router = this.express.Router();

    /**
     * @swagger
     * tags:
     *   name: Payment
     *   description: FedaPay Payment management
     */
    const swaggerBuilder = new SwaggerRouteBuilder('Payment');

    // Route: Initiate Payment
    swaggerBuilder.addRoute('/api/v1/payment/initiate', 'post', 'Initiate a payment for a reservation', ['Payment'])
      .addRequestBody('#/components/schemas/InitiatePaymentPayload', 'Initiate Payment')
      .addResponse(200, 'Payment initiated successfully', '#/components/schemas/InitiatePaymentResponse')
      .addResponse(400, 'Bad request')
      .addResponse(404, 'Reservation not found');

    router.route("/initiate").post(
      this.use(paymentController.initiatePayment));

    // Route: Payment Callback (Webhook from FedaPay - POST)
    swaggerBuilder.addRoute('/api/v1/payment/callback', 'post', 'FedaPay webhook callback', ['Payment'])
      .addRequestBody('#/components/schemas/CallbackPayload', 'FedaPay Callback')
      .addResponse(200, 'Callback processed');

    router.route("/callback")
      .post(this.use(paymentController.callback))
      .get(this.use(paymentController.callbackRedirect));

    // Route: Get Payment Status
    swaggerBuilder.addRoute('/api/v1/payment/status/{reservationId}', 'get', 'Get payment status for a reservation', ['Payment'])
      .addPathParam('reservationId', 'string', 'Reservation ID', true)
      .addResponse(200, 'Payment status', '#/components/schemas/PaymentStatusResponse')
      .addResponse(404, 'Reservation not found');

    router.route("/status/:reservationId").get(
      this.use(paymentController.getStatus));

    // Route: Get Transaction Details
    swaggerBuilder.addRoute('/api/v1/payment/transaction/{transactionId}', 'get', 'Get FedaPay transaction details', ['Payment'])
      .addPathParam('transactionId', 'string', 'FedaPay Transaction ID', true)
      .addResponse(200, 'Transaction details', '#/components/schemas/TransactionResponse');

    router.route("/transaction/:transactionId").get(
      this.use(paymentController.getTransaction));

    // Route: Regenerate Payment Link
    swaggerBuilder.addRoute('/api/v1/payment/regenerate/{transactionId}', 'post', 'Regenerate payment link for a transaction', ['Payment'])
      .addPathParam('transactionId', 'string', 'FedaPay Transaction ID', true)
      .addResponse(200, 'Payment link regenerated', '#/components/schemas/RegeneratePaymentResponse');

    router.route("/regenerate/:transactionId").post(
      this.use(paymentController.regenerateLink));

    // Save Swagger routes to module spec folder
    swaggerBuilder.saveToModuleSpecFolder('admin', 'crud.payment')

    return router
  }
}
