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
        Nightly_Price: model.Nightly_Price,
        Pictures: model.Pictures ? model.Pictures.map(path => process.env.BASE_URL + path) : [],
        Title: model.Title,
        Bio: model.Bio,
        Bed_Number: model.Bed_Number,
        Town: model.Town,
        Room_Number: model.Room_Number,
        Availability: model.Availability,
        Kitchen_Number: model.Kitchen_Number,
        Parking: model.Parking,
        Washing_Name: model.Washing_Name,
        Wifi: model.Wifi,
        AC: model.AC,
        Security: model.Security,
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
        Nightly_Price: model.Nightly_Price,
        Pictures: model.Pictures ? model.Pictures.map(path => process.env.BASE_URL + path) : [],
        Title: model.Title,
        Bio: model.Bio,
        Bed_Number: model.Bed_Number,
        Town: model.Town,
        Room_Number: model.Room_Number,
        Availability: model.Availability,
        Kitchen_Number: model.Kitchen_Number,
        Parking: model.Parking,
        Washing_Name: model.Washing_Name,
        Wifi: model.Wifi,
        AC: model.AC,
        Security: model.Security,
      }

      return schema
    } catch (error) {
      throw error
    }
  }

}