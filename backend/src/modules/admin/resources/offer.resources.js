/**
 * @OfferResources 
 */
module.exports = class OfferResources {

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
        nightlyPrice: model.nightlyPrice,
        pictures: model.pictures ? model.pictures.map(path => process.env.BASE_URL + path) : [],
        title: model.title,
        bio: model.bio,
        bedNumber: model.bedNumber,
        town: model.town,
        roomNumber: model.roomNumber,
        availability: model.availability,
        kitchenNumber: model.kitchenNumber,
        parking: model.parking,
        washingName: model.washingName,
        wifi: model.wifi,
        ac: model.ac,
        security: model.security,
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
        nightlyPrice: model.nightlyPrice,
        pictures: model.pictures ? model.pictures.map(path => process.env.BASE_URL + path) : [],
        title: model.title,
        bio: model.bio,
        bedNumber: model.bedNumber,
        town: model.town,
        roomNumber: model.roomNumber,
        availability: model.availability,
        kitchenNumber: model.kitchenNumber,
        parking: model.parking,
        washingName: model.washingName,
        wifi: model.wifi,
        ac: model.ac,
        security: model.security,
      }

      return schema
    } catch (error) {
      throw error
    }
  }

}