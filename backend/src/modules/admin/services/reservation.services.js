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

      if (this.HelperMethods.issetData(payload.Nom_Client)) {
        schema.Nom_Client = this.HelperMethods.getValidTrimData(payload.Nom_Client);
      }
      if (this.HelperMethods.issetData(payload.Prenom_Client)) {
        schema.Prenom_Client = this.HelperMethods.getValidTrimData(payload.Prenom_Client);
      }
      if (this.HelperMethods.issetData(payload.Email)) {
        schema.Email = this.HelperMethods.getValidTrimData(payload.Email);
      }
      if (this.HelperMethods.issetData(payload.Country)) {
        schema.Country = this.HelperMethods.getValidTrimData(payload.Country);
      }
      if (this.HelperMethods.issetData(payload.Phone)) {
        schema.Phone = this.HelperMethods.getValidTrimData(payload.Phone);
      }
      if (this.HelperMethods.issetData(payload.Arrival_Date)) {
        schema.Arrival_Date = this.HelperMethods.getValidTrimData(payload.Arrival_Date);
      }
      if (this.HelperMethods.issetData(payload.Start_Date)) {
        schema.Start_Date = this.HelperMethods.getValidTrimData(payload.Start_Date);
      }
      if (this.HelperMethods.issetData(payload.Person_Number)) {

        schema.Person_Number = this.HelperMethods.getValidTrimData(payload.Person_Number);


      }
      if (this.HelperMethods.issetData(payload.Client_Message)) {
        schema.Client_Message = this.HelperMethods.getValidTrimData(payload.Client_Message);
      }
      if (this.HelperMethods.issetData(payload.Payment_Mode)) {
        schema.Payment_Mode = this.HelperMethods.getValidTrimData(payload.Payment_Mode);
      }
      if (this.HelperMethods.issetData(payload.Offer)) {
        const Offer = await this.SharedAdminServices.findOfferById(this.HelperMethods.getValidTrimData(payload.Offer), session)
        if (!Offer) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND("this Offer"));

        schema.Offer = this.HelperMethods.getValidTrimData(payload.Offer);
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

      if (this.HelperMethods.issetData(payload.Nom_Client)) {
        schema.Nom_Client = this.HelperMethods.getValidTrimData(payload.Nom_Client);
      }
      if (this.HelperMethods.issetData(payload.Prenom_Client)) {
        schema.Prenom_Client = this.HelperMethods.getValidTrimData(payload.Prenom_Client);
      }
      if (this.HelperMethods.issetData(payload.Email)) {
        schema.Email = this.HelperMethods.getValidTrimData(payload.Email);
      }
      if (this.HelperMethods.issetData(payload.Country)) {
        schema.Country = this.HelperMethods.getValidTrimData(payload.Country);
      }
      if (this.HelperMethods.issetData(payload.Phone)) {
        schema.Phone = this.HelperMethods.getValidTrimData(payload.Phone);
      }
      if (this.HelperMethods.issetData(payload.Arrival_Date)) {
        schema.Arrival_Date = this.HelperMethods.getValidTrimData(payload.Arrival_Date);
      }
      if (this.HelperMethods.issetData(payload.Start_Date)) {
        schema.Start_Date = this.HelperMethods.getValidTrimData(payload.Start_Date);
      }
      if (this.HelperMethods.issetData(payload.Person_Number)) {

        schema.Person_Number = this.HelperMethods.getValidTrimData(payload.Person_Number);


      }
      if (this.HelperMethods.issetData(payload.Client_Message)) {
        schema.Client_Message = this.HelperMethods.getValidTrimData(payload.Client_Message);
      }
      if (this.HelperMethods.issetData(payload.Payment_Mode)) {
        schema.Payment_Mode = this.HelperMethods.getValidTrimData(payload.Payment_Mode);
      }
      if (this.HelperMethods.issetData(payload.Offer)) {
        const Offer = await this.SharedAdminServices.findOfferById(this.HelperMethods.getValidTrimData(payload.Offer), session)
        if (!Offer) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND("this Offer"));

        schema.Offer = this.HelperMethods.getValidTrimData(payload.Offer);
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
            localField: "Offer",
            foreignField: "_id",
            as: "Offer"
          }
        },

        {
          $addFields: {
            Offer: {
              $ifNull: [{
                $arrayElemAt: ['$Offer', 0]
              }, null]
            }
          }
        },
        {
          $unwind: {
            path: '$Offer',
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