/**
 * @ArticleResources
 */
module.exports = class ArticleResources {

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
        title: model.title,
        coverImage: model.coverImage,
        tags: model.tags,
        sections: model.sections,
        status: model.status,
        createdAt: model.createdAt,
        createdBy: model.createdBy,
        updatedBy: model.updatedBy,
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
        title: model.title,
        coverImage: model.coverImage,
        tags: model.tags,
        sections: model.sections,
        status: model.status,
        createdAt: model.createdAt,
      }

      return schema
    } catch (error) {
      throw error
    }
  }

}
