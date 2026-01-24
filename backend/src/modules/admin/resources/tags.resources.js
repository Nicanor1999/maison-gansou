/**
 * @TagsResources 
 */
module.exports = class TagsResources {

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
        Tags: model.Tags,
      }

      return schema
    } catch (error) {
      throw error
    }
  }

}