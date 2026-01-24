/**
 * @AuthIdentitySecurityResources 
 */
module.exports = class AuthIdentitySecurityResources {

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
        identity: model.identity,
        identifierVerification: model.identifierVerification,
        passwordReset: model.passwordReset,
        oauth: model.oauth,
        lastLogin: model.lastLogin,
      }

      return schema;
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
        identifierVerification: model.identifierVerification,
        passwordReset: model.passwordReset,
        oauth: model.oauth,
        lastLogin: model.lastLogin,
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
        identifierVerification: model.identifierVerification,
        passwordReset: model.passwordReset,
        oauth: model.oauth,
        lastLogin: model.lastLogin,
      }
      return schema;
    } catch (error) {
      throw error;
    }
  }

}