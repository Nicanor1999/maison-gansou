/**
 * @AuthIdentityResources 
 */
module.exports = class AuthIdentityResources {

  constructor() {

  }
  /**
   * @Default collection
   */
  static async collection(model, filter = {}) {
    try {
      if (!model) return null

      const {} = filter

      const schema = {
        _id: model._id,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
        firstName: model.firstName,
        lastName: model.lastName,
        identifier: model.identifier,
        identifierType: model.identifierType,
        isActive: model.isActive,
        isBlocked: model.isBlocked,
      }


      return schema
    } catch (error) {
      throw error;
    }
  }
  /**
   * @statistical collection
   */
  static async statistical(model, filter = {}) {
    try {
      if (!model) return null

      const {} = filter

      const schema = {
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
        firstName: model.firstName,
        lastName: model.lastName,
        identifier: model.identifier,
        identifierType: model.identifierType,
        isActive: model.isActive,
        isBlocked: model.isBlocked,
      }

      return schema;
    } catch (error) {
      throw error;
    }
  }
  /**
   * @ref collection
   */
  static async ref(model, filter = {}) {
    try {
      if (!model) return null

      const schema = {
        _id: model._id,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
        firstName: model.firstName,
        lastName: model.lastName,
        identifier: model.identifier,
        identifierType: model.identifierType,
        isActive: model.isActive,
        isBlocked: model.isBlocked,
      }

      return schema;
    } catch (error) {
      throw error;
    }
  }

}