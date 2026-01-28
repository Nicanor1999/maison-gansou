/**
 * @ReservationServices 
 */

const CoreServices = require("../../../shared/services/core.services")
module.exports = class ReservationServices extends CoreServices {

  constructor() {
    super();
    this.Reservation = require("../../admin/models/reservation.model");
    this.ReservationResources = require("../../admin/resources/reservation.resources");
    this.SharedAdminServices = new(require("../../admin/services/shared.admin.services"))();
  }
  /**
   * @instanceAlreadyExist
   */
  instanceAlreadyExist = async (payload, session = null) => {
    try {
      return await this.SessionManager.executeQueryHookWithSession(this.Reservation.findOne({
        // your condition
        name: payload.name,
      }), session)


    } catch (error) {
      throw error;

    }
  };
  /**
   * @findOrCreate
   */
  findOrCreate = async (payload, session = null) => {
    try {
      const reservationExist = await this.instanceAlreadyExist(payload, session)

      let save
      if (reservationExist) {
        save = reservationExist
      } else {
        save = await this.create(payload, session)
      }

      return save

    } catch (error) {
      reject(error);
    }
  };
  /**
   * @create
   */
  create = async (payload, session = null) => {
    try {
      const options = session ? {
        session
      } : {}

      const schema = {}
      if (this.HelperMethods.issetData(payload.createdBy)) {
        schema.createdBy = this.HelperMethods.getValidTrimData(payload.createdBy);
      }

      if (this.HelperMethods.issetData(payload.updatedBy)) {
        schema.updatedBy = this.HelperMethods.getValidTrimData(payload.updatedBy);
      }

      if (this.HelperMethods.issetData(payload.deletedBy)) {
        schema.deletedBy = this.HelperMethods.getValidTrimData(payload.deletedBy);
      }

      if (this.HelperMethods.issetData(payload.lastNameClient)) {
        schema.lastNameClient = this.HelperMethods.getValidTrimData(payload.lastNameClient);
      }
      if (this.HelperMethods.issetData(payload.firstNameClient)) {
        schema.firstNameClient = this.HelperMethods.getValidTrimData(payload.firstNameClient);
      }
      if (this.HelperMethods.issetData(payload.email)) {
        schema.email = this.HelperMethods.getValidTrimData(payload.email);
      }
      if (this.HelperMethods.issetData(payload.country)) {
        schema.country = this.HelperMethods.getValidTrimData(payload.country);
      }
      if (this.HelperMethods.issetData(payload.phone)) {
        schema.phone = this.HelperMethods.getValidTrimData(payload.phone);
      }
      if (this.HelperMethods.issetData(payload.arrivalDate)) {
        schema.arrivalDate = this.HelperMethods.getValidTrimData(payload.arrivalDate);
      }
      if (this.HelperMethods.issetData(payload.startDate)) {
        schema.startDate = this.HelperMethods.getValidTrimData(payload.startDate);
      }
      if (this.HelperMethods.issetData(payload.personNumber)) {
        schema.personNumber = this.HelperMethods.getValidTrimData(payload.personNumber);
      }
      if (this.HelperMethods.issetData(payload.clientMessage)) {
        schema.clientMessage = this.HelperMethods.getValidTrimData(payload.clientMessage);
      }
      if (this.HelperMethods.issetData(payload.paymentMode)) {
        schema.paymentMode = this.HelperMethods.getValidTrimData(payload.paymentMode);
      }
      if (this.HelperMethods.issetData(payload.offer)) {
        const offer = await this.SharedAdminServices.findOfferById(this.HelperMethods.getValidTrimData(payload.offer), session)
        if (!offer) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND("this offer"));
        schema.offer = this.HelperMethods.getValidTrimData(payload.offer);
      }



      const reservation = new this.Reservation(schema);
      const save = await reservation.save(options);

      return save


    } catch (error) {
      throw error;
    }
  };
  /**
   * @update
   */
  update = async (query, payload, session = null) => {
    try {
      const options = session ? {
        session
      } : {
        new: true
      };

      const reservation = await this.SessionManager.executeQueryHookWithSession(this.Reservation.findOne(query), session);

      if (!reservation) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this reservation'))

      const schema = {}
      if (this.HelperMethods.issetData(payload.createdBy)) {
        schema.createdBy = this.HelperMethods.getValidTrimData(payload.createdBy);
      }

      if (this.HelperMethods.issetData(payload.updatedBy)) {
        schema.updatedBy = this.HelperMethods.getValidTrimData(payload.updatedBy);
      }

      if (this.HelperMethods.issetData(payload.deletedBy)) {
        schema.deletedBy = this.HelperMethods.getValidTrimData(payload.deletedBy);
      }

      if (this.HelperMethods.issetData(payload.lastNameClient)) {
        schema.lastNameClient = this.HelperMethods.getValidTrimData(payload.lastNameClient);
      }
      if (this.HelperMethods.issetData(payload.firstNameClient)) {
        schema.firstNameClient = this.HelperMethods.getValidTrimData(payload.firstNameClient);
      }
      if (this.HelperMethods.issetData(payload.email)) {
        schema.email = this.HelperMethods.getValidTrimData(payload.email);
      }
      if (this.HelperMethods.issetData(payload.country)) {
        schema.country = this.HelperMethods.getValidTrimData(payload.country);
      }
      if (this.HelperMethods.issetData(payload.phone)) {
        schema.phone = this.HelperMethods.getValidTrimData(payload.phone);
      }
      if (this.HelperMethods.issetData(payload.arrivalDate)) {
        schema.arrivalDate = this.HelperMethods.getValidTrimData(payload.arrivalDate);
      }
      if (this.HelperMethods.issetData(payload.startDate)) {
        schema.startDate = this.HelperMethods.getValidTrimData(payload.startDate);
      }
      if (this.HelperMethods.issetData(payload.personNumber)) {
        schema.personNumber = this.HelperMethods.getValidTrimData(payload.personNumber);
      }
      if (this.HelperMethods.issetData(payload.clientMessage)) {
        schema.clientMessage = this.HelperMethods.getValidTrimData(payload.clientMessage);
      }
      if (this.HelperMethods.issetData(payload.paymentMode)) {
        schema.paymentMode = this.HelperMethods.getValidTrimData(payload.paymentMode);
      }
      if (this.HelperMethods.issetData(payload.offer)) {
        const offer = await this.SharedAdminServices.findOfferById(this.HelperMethods.getValidTrimData(payload.offer), session)
        if (!offer) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND("this offer"));
        schema.offer = this.HelperMethods.getValidTrimData(payload.offer);
      }



      const data = await this.Reservation.findOneAndUpdate({
          _id: reservation._id
        },
        schema, options
      );



      return data


    } catch (error) {
      throw error;
    }
  };
  /**
   * @delete
   */
  delete = async (query, session = null) => {
    try {

      const reservation = await this.SessionManager.executeQueryHookWithSession(this.Reservation.findOne(query), session);

      if (!reservation) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this reservation'))

      await reservation.softDelete(undefined, session);

      return reservation

    } catch (error) {
      throw error;

    }
  };
  /**
   * @findById
   */
  findById = async (id, session = null) => {
    try {
      const reservation = await this.SessionManager.executeQueryHookWithSession(this.Reservation.findOne({
        _id: id
      }), session)

      if (!reservation) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this reservation'))

      return await this.ReservationResources.ref(reservation)


    } catch (error) {
      throw error;
    }
  };
  /**
   * @getList
   */
  getList = async (querySchema, match = {
    matchOffer: {}
  }, session = null) => {
    try {
      const {
        matchOffer,
      } = match
      const data = []
      const reservationFindData = await this.SessionManager.executeQueryHookWithSession(this.Reservation.find(querySchema).populate({
        path: "Offer",
        match: matchOffer
      }), session)

      for (const item of reservationFindData) {
        if (item
          //&&item.Offer
        ) {
          data.push(await this.ReservationResources.collection(item))
        }
      }

      return data

    } catch (error) {
      throw error;
    }
  };
  /**
   * @findOne
   */
  findOne = async (querySchema, session = null) => {
    try {
      let data = null

      const reservationFindOneData = await this.SessionManager.executeQueryHookWithSession(this.Reservation.findOne(querySchema).populate({
        path: "Offer",
      }), session)

      if (reservationFindOneData) {
        data = await this.ReservationResources.collection(reservationFindOneData)
      }

      return data


    } catch (error) {
      throw error;

    }
  };
  /**
   * @getPaginatedList
   */
  getPaginatedList = async (inputPipeline, options) => {
    try {
      const {
        perPage,
        page,
        route,
        query,
        countDocumentSchema
      } = options

      const servicePipeline = [{
          $lookup: {
            from: "offers",
            localField: "offer",
            foreignField: "_id",
            as: "offerData"
          }
        },

        {
          $addFields: {
            offerData: {
              $ifNull: [{
                $arrayElemAt: ['$offerData', 0]
              }, null]
            }
          }
        },
        {
          $unwind: {
            path: '$offerData',
            preserveNullAndEmptyArrays: true
          }
        },

      ];
      const paginationResponse = await this.getPaginateAggregateDataService({
        Model: this.Reservation,
        perPage: perPage,
        page: page,
        query: query,
        route: route,
        pipeline: servicePipeline.concat(inputPipeline),
        countDocumentSchema: countDocumentSchema

      })

      const response = paginationResponse.data

      const data = await Promise.all(
        response.map(item => this.ReservationResources.collection(item))
      );


      return {
        "page": Number(page),
        "totalPages": paginationResponse.totalPages,
        "totalItems": paginationResponse.totalItems,
        "perPage": perPage,
        "nextLink": paginationResponse.nextLink,
        "prevLink": paginationResponse.prevLink,
        "data": data
      }


    } catch (error) {
      throw error;

    }
  };

}