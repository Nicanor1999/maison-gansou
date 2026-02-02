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

      // Calculate total price based on nights and nightly price
      let price = null
      if (model.startDate && model.arrivalDate && model.offerData?.nightlyPrice) {
        const start = new Date(model.startDate)
        const end = new Date(model.arrivalDate)
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
        if (nights > 0) {
          price = nights * model.offerData.nightlyPrice
        }
      }

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
        offer: model.offerData?.title || model.offer,
        offerId: model.offer,
        nightlyPrice: model.offerData?.nightlyPrice || null,
        price: price,
        // Payment fields
        paymentStatus: model.paymentStatus || 'not_initiated',
        paymentTransactionId: model.paymentTransactionId || null,
        paymentAmount: model.paymentAmount || null,
        paymentCompletedAt: model.paymentCompletedAt || null,
        createdAt: model.createdAt,
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