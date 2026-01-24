/**
 * @ReservationResources 
 */
module.exports = class ReservationResources {

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
        Nom_Client: model.Nom_Client,
        Prenom_Client: model.Prenom_Client,
        Email: model.Email,
        Country: model.Country,
        Phone: model.Phone,
        Arrival_Date: model.Arrival_Date,
        Start_Date: model.Start_Date,
        Person_Number: model.Person_Number,
        Client_Message: model.Client_Message,
        Payment_Mode: model.Payment_Mode,
        Offer: model.Offer,
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
        Nom_Client: model.Nom_Client,
        Prenom_Client: model.Prenom_Client,
        Email: model.Email,
        Country: model.Country,
        Phone: model.Phone,
        Arrival_Date: model.Arrival_Date,
        Start_Date: model.Start_Date,
        Person_Number: model.Person_Number,
        Client_Message: model.Client_Message,
        Payment_Mode: model.Payment_Mode,
      }

      return schema
    } catch (error) {
      throw error
    }
  }

}