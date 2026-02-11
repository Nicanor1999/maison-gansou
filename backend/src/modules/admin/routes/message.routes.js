/**
 * @MessageRoutes
 */

const ParentRoute = require("../../../routes/route.parent")
const SwaggerRouteBuilder = require("../../../shared/lib/swagger/SwaggerRouteBuilder")

module.exports = class MessageRoutes extends ParentRoute {

  constructor() {
    super()

    const adminauthmiddlewares = new(require("../../admin/middlewares/auth.admin.middlewares"))();
    const messagecontroller = new(require("../../admin/controllers/message.controllers"))();

    const router = this.express.Router();

    /**
     * @swagger
     * tags:
     *   name: Message
     *   description: Message / Mailbox management
     */
    const swaggerBuilder = new SwaggerRouteBuilder('Message');

    // Route: Public Contact Form (no authentication required)
    swaggerBuilder.addRoute('/api/v1/message/contact', 'post', 'Submit contact form (public)', ['Message'])
      .addRequestBody('#/components/schemas/ContactFormPayload', 'Contact Form')
      .addResponse(201, 'Message sent successfully', '#/components/schemas/ContactFormResponse')
      .addResponse(400, 'Bad request');

    router.route("/contact").post(
      this.use(messagecontroller.createContact));

    // Route: Get List of Messages
    swaggerBuilder.addRoute('/api/v1/message', 'get', 'Get list of messages', ['Message'])
      .addQueryParam('perPage', 'string', 'Items per page', false)
      .addQueryParam('page', 'string', 'Page number', false)
      .addQueryParam('category', 'string', 'Filter by category', false)
      .addQueryParam('direction', 'string', 'Filter by direction (inbound/outbound)', false)
      .addQueryParam('read', 'string', 'Filter by read status', false)
      .addQueryParam('starred', 'string', 'Filter by starred status', false)
      .addQueryParam('archived', 'string', 'Filter by archived status', false)
      .addQueryParam('search', 'string', 'Search in sender, email, subject', false)
      .addResponse(200, 'A list of messages', '#/components/schemas/MessagePaginationResponse');

    router.route("/").get(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.use(messagecontroller.findAll));

    // Route: Compose new email
    swaggerBuilder.addRoute('/api/v1/message/compose', 'post', 'Compose and send a new email', ['Message'])
      .addRequestBody('#/components/schemas/ComposeMessagePayload', 'Compose Message')
      .addResponse(200, 'Email sent successfully', '#/components/schemas/ComposeMessageResponse');

    router.route("/compose").post(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.use(messagecontroller.compose));

    // Route: Sync emails from IMAP
    swaggerBuilder.addRoute('/api/v1/message/sync', 'post', 'Sync emails from IMAP server', ['Message'])
      .addResponse(200, 'Sync result', '#/components/schemas/SyncMessageResponse');

    router.route("/sync").post(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.use(messagecontroller.sync));

    // Route: Get sync status
    swaggerBuilder.addRoute('/api/v1/message/sync/status', 'get', 'Get IMAP sync status', ['Message'])
      .addResponse(200, 'Sync status', '#/components/schemas/SyncStatusResponse');

    router.route("/sync/status").get(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.use(messagecontroller.syncStatus));

    // Route: Get Message by ID
    swaggerBuilder.addRoute('/api/v1/message/{id}', 'get', 'Get one message by ID', ['Message'])
      .addPathParam('id', 'string', 'message id', true)
      .addResponse(200, 'One Message', '#/components/schemas/FindMessageResponse');

    router.route("/:id").get(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.use(messagecontroller.findOne));

    // Route: Update Message (read/starred/archived)
    swaggerBuilder.addRoute('/api/v1/message/{id}', 'put', 'Update a message by ID', ['Message'])
      .addPathParam('id', 'string', 'message id', true)
      .addRequestBody('#/components/schemas/UpdateMessagePayload', 'Update Message')
      .addResponse(200, 'Updated successfully', '#/components/schemas/UpdateMessageResponse');

    router.route("/:id").put(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.use(messagecontroller.update));

    // Route: Delete Message by ID
    swaggerBuilder.addRoute('/api/v1/message/{id}', 'delete', 'Delete a message by ID', ['Message'])
      .addPathParam('id', 'string', 'message id', true)
      .addResponse(200, 'Deleted successfully', '#/components/schemas/DeleteMessageResponse');

    router.route("/:id").delete(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.use(messagecontroller.delete));

    // Route: Reply to a Message
    swaggerBuilder.addRoute('/api/v1/message/{id}/reply', 'post', 'Reply to a message', ['Message'])
      .addPathParam('id', 'string', 'message id', true)
      .addRequestBody('#/components/schemas/ReplyMessagePayload', 'Reply to Message')
      .addResponse(200, 'Reply sent successfully', '#/components/schemas/ReplyMessageResponse');

    router.route("/:id/reply").post(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.use(messagecontroller.reply));

    // Save Swagger routes
    swaggerBuilder.saveToModuleSpecFolder('admin', 'crud.message')

    return router
  }
}
