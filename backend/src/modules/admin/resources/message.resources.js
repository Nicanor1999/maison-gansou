/**
 * @MessageResources
 */
module.exports = class MessageResources {

  constructor() {

  }
  /**
   * @collection
   */
  static async collection(model, filter = {}) {
    try {
      if (!model) return null

      const schema = {
        _id: model._id,
        createdBy: model.createdBy,
        updatedBy: model.updatedBy,
        deletedBy: model.deletedBy,
        senderName: model.senderName,
        senderEmail: model.senderEmail,
        recipientEmail: model.recipientEmail,
        phone: model.phone,
        subject: model.subject,
        content: model.content,
        category: model.category,
        direction: model.direction,
        read: model.read,
        starred: model.starred,
        archived: model.archived,
        status: model.status,
        template: model.template,
        parentMessage: model.parentMessage,
        attachments: model.attachments,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
      }

      return schema
    } catch (error) {
      throw error
    }
  }
  /**
   * @ref
   */
  static async ref(model, filter = {}) {
    try {
      if (!model) return null

      const schema = {
        _id: model._id,
        senderName: model.senderName,
        senderEmail: model.senderEmail,
        recipientEmail: model.recipientEmail,
        subject: model.subject,
        content: model.content,
        category: model.category,
        direction: model.direction,
        read: model.read,
        starred: model.starred,
        archived: model.archived,
        status: model.status,
        attachments: model.attachments,
        createdAt: model.createdAt,
      }

      return schema
    } catch (error) {
      throw error
    }
  }

}
