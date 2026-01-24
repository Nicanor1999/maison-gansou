/**
 * @AuthResources 
 */
module.exports = class AuthResources {

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
        actorType: model.actorType,
        accessToken: model.accessToken,
        accessTokenExpiresAt: model.accessTokenExpiresAt,
        refreshToken: model.refreshToken,
        refreshTokenExpiresAt: model.refreshTokenExpiresAt,
        mfa: model.mfa,
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
        actorType: model.actorType,
        accessToken: model.accessToken,
        accessTokenExpiresAt: model.accessTokenExpiresAt,
        refreshToken: model.refreshToken,
        refreshTokenExpiresAt: model.refreshTokenExpiresAt,
        mfa: model.mfa,
      }


      return schema
    } catch (error) {
      throw error
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
        actorType: model.actorType,
        accessToken: model.accessToken,
        accessTokenExpiresAt: model.accessTokenExpiresAt,
        refreshToken: model.refreshToken,
        refreshTokenExpiresAt: model.refreshTokenExpiresAt,
        mfa: model.mfa,
      }

      return schema;
    } catch (error) {
      throw error;
    }
  }

}