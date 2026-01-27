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
        lastNameClient: model.lastNameClient,
        firstNameClient: model.firstNameClient,
        email: model.email,
        country: model.country,
        phone: model.phone,
        arrivalDate: model.arrivalDate,
        startDate: model.startDate,
        personNumber: model.personNumber,
        clientMessage: model.clientMessage,
        paymentMode: model.paymentMode,
        offer: model.offer,
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
        lastNameClient: model.lastNameClient,
        firstNameClient: model.firstNameClient,
        email: model.email,
        country: model.country,
        phone: model.phone,
        arrivalDate: model.arrivalDate,
        startDate: model.startDate,
        personNumber: model.personNumber,
        clientMessage: model.clientMessage,
        paymentMode: model.paymentMode,
      }

      return schema
    } catch (error) {
      throw error
    }
  }

}