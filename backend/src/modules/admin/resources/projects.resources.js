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
        title: model.title,
        country: model.country,
        town: model.town,
        services: model.services,
        worksType: model.worksType,
        partners: model.partners,
        sections: model.sections,
        projectType: model.projectType,
        status: model.status,
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
        country: model.country,
        town: model.town,
        services: model.services,
        worksType: model.worksType,
        partners: model.partners,
        projectType: model.projectType,
        status: model.status,
      }

      return schema
    } catch (error) {
      throw error
    }
  }

}