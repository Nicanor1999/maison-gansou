/**
 * @MessageServices
 */

const CoreServices = require("../../../shared/services/core.services")
const EmailServices = require("../../../shared/services/email.services")

module.exports = class MessageServices extends CoreServices {

  constructor() {
    super();
    this.Message = require("../../admin/models/message.model");
    this.MessageResources = require("../../admin/resources/message.resources");
  }

  /**
   * @create
   */
  create = async (payload, profile = null, session = null) => {
    try {
      const options = session ? { session } : {}

      const schema = {
        senderName: payload.senderName,
        senderEmail: payload.senderEmail,
        recipientEmail: payload.recipientEmail,
        phone: payload.phone,
        subject: payload.subject,
        content: payload.content,
        category: payload.category || 'other',
        direction: payload.direction || 'outbound',
        read: payload.read || false,
        starred: payload.starred || false,
        archived: payload.archived || false,
        status: payload.status || 'pending',
        template: payload.template,
        parentMessage: payload.parentMessage,
        attachments: payload.attachments || [],
      }

      if (profile) {
        schema.createdBy = profile._id;
        schema.updatedBy = profile._id;
      }

      const message = new this.Message(schema);
      const save = await message.save(options);

      return save

    } catch (error) {
      throw error;
    }
  };

  /**
   * @update
   */
  update = async (query, payload, profile, session = null) => {
    try {
      const options = session ? { session } : { new: true };

      const message = await this.SessionManager.executeQueryHookWithSession(
        this.Message.findOne(query), session
      );

      if (!message) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this message'))

      const schema = {}

      if (payload.read !== undefined) schema.read = payload.read;
      if (payload.starred !== undefined) schema.starred = payload.starred;
      if (payload.archived !== undefined) schema.archived = payload.archived;

      schema.updatedBy = profile._id;

      const data = await this.Message.findOneAndUpdate(
        { _id: message._id },
        schema, options
      );

      return data

    } catch (error) {
      throw error;
    }
  };

  /**
   * @delete
   */
  delete = async (query, profile, session = null) => {
    try {
      const message = await this.SessionManager.executeQueryHookWithSession(
        this.Message.findOne(query), session
      );
      if (!message) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this message'))

      await message.softDelete(profile._id, session);

      return message

    } catch (error) {
      throw error;
    }
  };

  /**
   * @findById
   */
  findById = async (id, session = null) => {
    try {
      const message = await this.SessionManager.executeQueryHookWithSession(
        this.Message.findOne({ _id: id }), session
      )

      if (!message) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this message'))

      return await this.MessageResources.ref(message)

    } catch (error) {
      throw error;
    }
  };

  /**
   * @findOne
   */
  findOne = async (querySchema, session = null) => {
    try {
      let data = null

      const messageFindOneData = await this.SessionManager.executeQueryHookWithSession(
        this.Message.findOne(querySchema).populate({
          path: "createdBy",
        }).populate({
          path: "updatedBy",
        }).populate({
          path: "deletedBy",
        }), session
      )

      if (messageFindOneData) {
        data = await this.MessageResources.collection(messageFindOneData)
      }

      return data

    } catch (error) {
      throw error;
    }
  };

  /**
   * @getPaginatedList
   */
  getPaginatedList = async (inputPipeline, options) => {
    try {
      const {
        perPage,
        page,
        route,
        query,
        countDocumentSchema
      } = options

      const servicePipeline = [{
          $lookup: {
            from: "admins",
            localField: "createdBy",
            foreignField: "_id",
            as: "createdBy"
          }
        },
        {
          $addFields: {
            createdBy: {
              $ifNull: [{ $arrayElemAt: ['$createdBy', 0] }, null]
            }
          }
        },
        {
          $unwind: {
            path: '$createdBy',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "admins",
            localField: "updatedBy",
            foreignField: "_id",
            as: "updatedBy"
          }
        },
        {
          $addFields: {
            updatedBy: {
              $ifNull: [{ $arrayElemAt: ['$updatedBy', 0] }, null]
            }
          }
        },
        {
          $unwind: {
            path: '$updatedBy',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "admins",
            localField: "deletedBy",
            foreignField: "_id",
            as: "deletedBy"
          }
        },
        {
          $addFields: {
            deletedBy: {
              $ifNull: [{ $arrayElemAt: ['$deletedBy', 0] }, null]
            }
          }
        },
        {
          $unwind: {
            path: '$deletedBy',
            preserveNullAndEmptyArrays: true
          }
        },
      ];

      const paginationResponse = await this.getPaginateAggregateDataService({
        Model: this.Message,
        perPage: perPage,
        page: page,
        query: query,
        route: route,
        pipeline: servicePipeline.concat(inputPipeline),
        countDocumentSchema: countDocumentSchema
      })

      const response = paginationResponse.data

      const data = await Promise.all(
        response.map(item => this.MessageResources.collection(item))
      );

      return {
        "page": Number(page),
        "totalPages": paginationResponse.totalPages,
        "totalItems": paginationResponse.totalItems,
        "perPage": perPage,
        "nextLink": paginationResponse.nextLink,
        "prevLink": paginationResponse.prevLink,
        "data": data
      }

    } catch (error) {
      throw error;
    }
  };

  /**
   * @sendReply - Send a reply email via Zoho Mail and log it
   */
  sendReply = async (messageId, payload, profile) => {
    try {
      const originalMessage = await this.Message.findById(messageId);
      if (!originalMessage) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this message'))

      const fromName = process.env.ZOHO_SMTP_FROM_NAME || process.env.SMTP_FROM_NAME || 'Maison GANSOU';
      const fromEmail = process.env.ZOHO_SMTP_FROM_ADDRESS || process.env.ZOHO_SMTP_USERNAME || process.env.SMTP_FROM_ADDRESS || 'noreply@maisongansou.com';

      // Send email via Zoho Mail
      const emailResult = await EmailServices.sendDirectEmail(
        payload.to,
        payload.subject,
        payload.content
      );

      const status = (emailResult && emailResult.success) ? 'sent' : 'failed';

      // Log the reply as a new message (no auto-log from sendDirectEmail)
      const replyMessage = await this.create({
        senderName: fromName,
        senderEmail: fromEmail,
        recipientEmail: payload.to,
        subject: payload.subject,
        content: payload.content,
        category: originalMessage.category,
        direction: 'outbound',
        read: true,
        status: status,
        parentMessage: originalMessage._id,
      }, profile);

      return replyMessage

    } catch (error) {
      throw error;
    }
  };

  /**
   * @compose - Send a new email via Zoho Mail and log it
   */
  compose = async (payload, profile) => {
    try {
      const fromName = process.env.ZOHO_SMTP_FROM_NAME || process.env.SMTP_FROM_NAME || 'Maison GANSOU';
      const fromEmail = process.env.ZOHO_SMTP_FROM_ADDRESS || process.env.ZOHO_SMTP_USERNAME || process.env.SMTP_FROM_ADDRESS || 'noreply@maisongansou.com';

      // Send email via Zoho Mail
      const emailResult = await EmailServices.sendDirectEmail(
        payload.to,
        payload.subject,
        payload.content
      );

      const status = (emailResult && emailResult.success) ? 'sent' : 'failed';

      // Log the composed message
      const message = await this.create({
        senderName: fromName,
        senderEmail: fromEmail,
        recipientEmail: payload.to,
        subject: payload.subject,
        content: payload.content,
        category: payload.category || 'contact',
        direction: 'outbound',
        read: true,
        status: status,
      }, profile);

      return message

    } catch (error) {
      throw error;
    }
  };

}
