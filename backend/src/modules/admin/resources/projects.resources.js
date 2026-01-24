/**
 * @ProjectsResources 
 */
module.exports = class ProjectsResources {

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
        Title: model.Title,
        Country: model.Country,
        Town: model.Town,
        Services: model.Services,
        Works_Type: model.Works_Type,
        Partners: model.Partners,
        Section: model.Section,
        Status: model.Status,
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
        Country: model.Country,
        Town: model.Town,
        Services: model.Services,
        Works_Type: model.Works_Type,
        Partners: model.Partners,
        Status: model.Status,
      }

      return schema
    } catch (error) {
      throw error
    }
  }

}