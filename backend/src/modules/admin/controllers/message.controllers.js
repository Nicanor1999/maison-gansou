/**
 * @MessageController
 */

const CoreServices = require("../../../shared/services/core.services")
const ImapServices = require("../../../shared/services/imap.services")

module.exports = class MessageController extends CoreServices {

  constructor() {
    super()
    this.MessageServices = new(require("../../admin/services/message.services"))();
    this.MessageValidations = require("../../admin/validations/message.validations");
  }

  /**
   * Create Contact Message (Public - No Auth Required)
   * @route  POST /message/contact
   */
  createContact = async (req, res) => {
    const { error } = this.MessageValidations.ContactFormValidation(req.body);
    if (error) throw new this.ValidationError(error.details[0].message);

    const payload = {
      senderName: req.body.senderName,
      senderEmail: req.body.senderEmail,
      phone: req.body.phone || '',
      subject: req.body.subject,
      content: req.body.content,
      category: 'contact',
      direction: 'inbound',
      status: 'received',
      read: false,
      starred: false,
      archived: false,
      receivedAt: new Date(),
    };

    const message = await this.MessageServices.create(payload);

    res.status(201).json({
      data: message,
      success: true,
      message: 'Votre message a été envoyé avec succès'
    });
  };

  /**
   * Message FindAll
   * @route  GET /message
   */
  findAll = async (req, res) => {
    const profile = req.admin;
    const query = req.query

    const options = {
      perPage: process.env.PAGINATION_TOTAL_PER_PAGE || 10,
      page: 1,
      route: "/message",
      query: query,
      withOutDeletedRestriction: query.withOutDeletedRestriction,
      onlyDeletedData: query.onlyDeletedData,
    }

    if (query.page) {
      options.page = query.page
    }
    if (query.perPage) {
      options.perPage = query.perPage
    }

    let countDocumentSchema = {}

    const querySchema = []
    if (query.category) {
      querySchema.push({
        category: query.category
      })
    }
    if (query.direction) {
      querySchema.push({
        direction: query.direction
      })
    }
    if (query.read !== undefined) {
      querySchema.push({
        read: query.read === 'true'
      })
    }
    if (query.starred !== undefined) {
      querySchema.push({
        starred: query.starred === 'true'
      })
    }
    if (query.archived !== undefined) {
      querySchema.push({
        archived: query.archived === 'true'
      })
    }
    if (query.status) {
      querySchema.push({
        status: query.status
      })
    }
    if (query.search) {
      querySchema.push({
        $or: [
          { senderName: { $regex: ".*" + query.search + ".*", $options: "i" } },
          { senderEmail: { $regex: ".*" + query.search + ".*", $options: "i" } },
          { recipientEmail: { $regex: ".*" + query.search + ".*", $options: "i" } },
          { subject: { $regex: ".*" + query.search + ".*", $options: "i" } },
        ]
      })
    }

    options.countDocumentSchema = this.convertArrayToObjectQuerySchema(querySchema, countDocumentSchema, {
      ignoredSubPrivateData: true
    })

    const pipeline = []
    if (querySchema.length > 0) {
      pipeline.push({
        $match: {
          $and: querySchema
        }
      })
    }

    // Sort by most recent first
    pipeline.push({ $sort: { createdAt: -1 } })

    const output = await this.MessageServices.getPaginatedList(pipeline, options)

    res.json({
      page: output.page,
      totalPages: output.totalPages,
      totalItems: output.totalItems,
      perPage: output.perPage,
      data: output.data,
      nextLink: output.nextLink,
      prevLink: output.prevLink,
      success: true,
    })
  };

  /**
   * Message FindOne
   * @route  GET /message/:id
   */
  findOne = async (req, res) => {
    const querySchema = {
      _id: req.params.id,
    }

    const data = await this.MessageServices.findOne(querySchema)
    if (!data) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this message'))

    res.json({
      data: data,
      success: true,
      message: this.SUCCESS_MESSAGES.RETRIEVED_SUCCESSFULLY('Message')
    })
  };

  /**
   * Message Update
   * @route  PUT /message/:id
   */
  update = async (req, res) => {
    const { error } = this.MessageValidations.UpdateValidation(req.body);
    if (error) throw new this.ValidationError(error.details[0].message);

    const profile = req.admin;

    const query = {
      _id: req.params.id,
    }

    const payload = { ...req.body }

    const message = await this.MessageServices.update(query, payload, profile);

    res.json({
      data: message,
      success: true,
      message: this.SUCCESS_MESSAGES.UPDATED_SUCCESSFULLY('Message')
    })
  };

  /**
   * Message Delete
   * @route  DELETE /message/:id
   */
  delete = async (req, res) => {
    const profile = req.admin;

    const query = {
      _id: req.params.id,
    }

    const data = await this.MessageServices.delete(query, profile)

    res.json({
      data: data,
      success: true,
      message: this.SUCCESS_MESSAGES.DELETED_SUCCESSFULLY('Message')
    })
  };

  /**
   * Message Reply
   * @route  POST /message/:id/reply
   */
  reply = async (req, res) => {
    const { error } = this.MessageValidations.ReplyValidation(req.body);
    if (error) throw new this.ValidationError(error.details[0].message);

    const profile = req.admin;
    const messageId = req.params.id;

    const payload = { ...req.body }

    const replyMessage = await this.MessageServices.sendReply(messageId, payload, profile);

    res.json({
      data: replyMessage,
      success: true,
      message: 'Réponse envoyée avec succès'
    })
  };

  /**
   * Message Compose (new email)
   * @route  POST /message/compose
   */
  compose = async (req, res) => {
    const { error } = this.MessageValidations.ComposeValidation(req.body);
    if (error) throw new this.ValidationError(error.details[0].message);

    const profile = req.admin;
    const payload = { ...req.body }

    const message = await this.MessageServices.compose(payload, profile);

    res.json({
      data: message,
      success: true,
      message: 'Email envoyé avec succès'
    })
  };

  /**
   * Sync emails from IMAP
   * @route  POST /message/sync
   */
  sync = async (req, res) => {
    if (!ImapServices.isConfigured()) {
      throw new this.ValidationError('IMAP n\'est pas configuré');
    }

    const result = await ImapServices.syncEmails({
      limit: 100
    });

    res.json({
      data: result,
      success: result.success,
      message: result.success
        ? `Synchronisation terminée: ${result.saved} nouveaux, ${result.skipped} ignorés`
        : 'Échec de la synchronisation'
    })
  };

  /**
   * Get sync status
   * @route  GET /message/sync/status
   */
  syncStatus = async (req, res) => {
    const status = ImapServices.getSyncStatus();

    res.json({
      data: status,
      success: true,
      message: 'Statut de synchronisation récupéré'
    })
  };

}
