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
      const {} = filter

      const schema = {
        _id: model._id,
        createdBy: model.createdBy,
        updatedBy: model.updatedBy,
        deletedBy: model.deletedBy,
        Tags: model.Tags,
        Title: model.Title,
        Section: model.Section,
        Statut: model.Statut,
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
        Title: model.Title,
        Statut: model.Statut,
      }

      return schema
    } catch (error) {
      throw error
    }
  }

}