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

      // Encode picture paths to handle special characters like # and spaces
      const encodePicturePath = (path) => {
        const basePath = path.substring(0, path.lastIndexOf('/') + 1)
        const filename = path.substring(path.lastIndexOf('/') + 1)
        return (process.env.BASE_URL || '') + basePath + encodeURIComponent(filename)
      }

      const schema = {
        _id: model._id,
        createdBy: model.createdBy,
        updatedBy: model.updatedBy,
        deletedBy: model.deletedBy,
        nightlyPrice: model.nightlyPrice,
        pictures: model.pictures ? model.pictures.map(encodePicturePath) : [],
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

      // Encode picture paths to handle special characters like # and spaces
      const encodePicturePath = (path) => {
        const basePath = path.substring(0, path.lastIndexOf('/') + 1)
        const filename = path.substring(path.lastIndexOf('/') + 1)
        return (process.env.BASE_URL || '') + basePath + encodeURIComponent(filename)
      }

      const schema = {
        _id: model._id,
        nightlyPrice: model.nightlyPrice,
        pictures: model.pictures ? model.pictures.map(encodePicturePath) : [],
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