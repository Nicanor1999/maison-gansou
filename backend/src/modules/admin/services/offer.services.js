/**
 * @OfferServices 
 */

const CoreServices = require("../../../shared/services/core.services")
module.exports = class OfferServices extends CoreServices {

  constructor() {
    super();
    this.Offer = require("../../admin/models/offer.model");
    this.OfferResources = require("../../admin/resources/offer.resources");
  }
  /**
   * @instanceAlreadyExist
   */
  instanceAlreadyExist = async (payload, session = null) => {
    try {
      return await this.SessionManager.executeQueryHookWithSession(this.Offer.findOne({
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
  findOrCreate = async (payload, profile, session = null) => {
    try {
      const offerExist = await this.instanceAlreadyExist(payload, session)

      let save
      if (offerExist) {
        save = offerExist
      } else {
        save = await this.create(payload, profile, session)
      }

      return save

    } catch (error) {
      throw error
    }
  };
  /**
   * @create
   */
  create = async (payload, profile, session = null) => {
    try {
      const options = session ? {
        session
      } : {}

      const schema = {}
      if (this.HelperMethods.issetData(payload.Nightly_Price)) {

        schema.Nightly_Price = this.HelperMethods.getValidTrimData(JSON.parse(payload.Nightly_Price));


      }
      if (this.HelperMethods.issetData(payload.Pictures)) {

        schema.Pictures = this.HelperMethods.getValidTrimData(payload.Pictures);

      }
      if (this.HelperMethods.issetData(payload.Title)) {
        schema.Title = this.HelperMethods.getValidTrimData(payload.Title);
      }
      if (this.HelperMethods.issetData(payload.Bio)) {
        schema.Bio = this.HelperMethods.getValidTrimData(payload.Bio);
      }
      if (this.HelperMethods.issetData(payload.Bed_Number)) {

        schema.Bed_Number = this.HelperMethods.getValidTrimData(JSON.parse(payload.Bed_Number));


      }
      if (this.HelperMethods.issetData(payload.Town)) {
        schema.Town = this.HelperMethods.getValidTrimData(payload.Town);
      }
      if (this.HelperMethods.issetData(payload.Room_Number)) {

        schema.Room_Number = this.HelperMethods.getValidTrimData(JSON.parse(payload.Room_Number));


      }
      if (this.HelperMethods.issetData(payload.Availability)) {

        schema.Availability = this.HelperMethods.getValidTrimData(payload.Availability);


      }
      if (this.HelperMethods.issetData(payload.Kitchen_Number)) {

        schema.Kitchen_Number = this.HelperMethods.getValidTrimData(JSON.parse(payload.Kitchen_Number));


      }
      if (this.HelperMethods.issetData(payload.Parking)) {

        schema.Parking = this.HelperMethods.getValidTrimData(payload.Parking);


      }
      if (this.HelperMethods.issetData(payload.Washing_Name)) {

        schema.Washing_Name = this.HelperMethods.getValidTrimData(payload.Washing_Name);


      }
      if (this.HelperMethods.issetData(payload.Wifi)) {

        schema.Wifi = this.HelperMethods.getValidTrimData(payload.Wifi);


      }
      if (this.HelperMethods.issetData(payload.AC)) {

        schema.AC = this.HelperMethods.getValidTrimData(payload.AC);


      }
      if (this.HelperMethods.issetData(payload.Security)) {

        schema.Security = this.HelperMethods.getValidTrimData(payload.Security);


      }

      schema.createdBy = profile._id;
      schema.updatedBy = profile._id;

      const offer = new this.Offer(schema);
      const save = await offer.save(options);

      return save


    } catch (error) {
      throw error;
    }
  };
  /**
   * @update
   */
  update = async (query, payload, profile, session = null) => {
    try {
      const options = session ? {
        session
      } : {
        new: true
      };
      const oldPaths = [];

      const offer = await this.SessionManager.executeQueryHookWithSession(this.Offer.findOne(query), session);

      if (!offer) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this offer'))

      const schema = {}
      if (this.HelperMethods.issetData(payload.Nightly_Price)) {

        schema.Nightly_Price = this.HelperMethods.getValidTrimData(JSON.parse(payload.Nightly_Price));


      }
      if (this.HelperMethods.issetData(payload.Pictures)) {

        schema.Pictures = this.HelperMethods.getValidTrimData(payload.Pictures);
        if (Array.isArray(offer.Pictures) && offer.Pictures.lenght > 0) {
          oldPaths.push(...offer.Pictures);
        }

      }
      if (this.HelperMethods.issetData(payload.Title)) {
        schema.Title = this.HelperMethods.getValidTrimData(payload.Title);
      }
      if (this.HelperMethods.issetData(payload.Bio)) {
        schema.Bio = this.HelperMethods.getValidTrimData(payload.Bio);
      }
      if (this.HelperMethods.issetData(payload.Bed_Number)) {

        schema.Bed_Number = this.HelperMethods.getValidTrimData(JSON.parse(payload.Bed_Number));


      }
      if (this.HelperMethods.issetData(payload.Town)) {
        schema.Town = this.HelperMethods.getValidTrimData(payload.Town);
      }
      if (this.HelperMethods.issetData(payload.Room_Number)) {

        schema.Room_Number = this.HelperMethods.getValidTrimData(JSON.parse(payload.Room_Number));


      }
      if (this.HelperMethods.issetData(payload.Availability)) {

        schema.Availability = this.HelperMethods.getValidTrimData(payload.Availability);


      }
      if (this.HelperMethods.issetData(payload.Kitchen_Number)) {

        schema.Kitchen_Number = this.HelperMethods.getValidTrimData(JSON.parse(payload.Kitchen_Number));


      }
      if (this.HelperMethods.issetData(payload.Parking)) {

        schema.Parking = this.HelperMethods.getValidTrimData(payload.Parking);


      }
      if (this.HelperMethods.issetData(payload.Washing_Name)) {

        schema.Washing_Name = this.HelperMethods.getValidTrimData(payload.Washing_Name);


      }
      if (this.HelperMethods.issetData(payload.Wifi)) {

        schema.Wifi = this.HelperMethods.getValidTrimData(payload.Wifi);


      }
      if (this.HelperMethods.issetData(payload.AC)) {

        schema.AC = this.HelperMethods.getValidTrimData(payload.AC);


      }
      if (this.HelperMethods.issetData(payload.Security)) {

        schema.Security = this.HelperMethods.getValidTrimData(payload.Security);


      }

      schema.updatedBy = profile._id;

      const data = await this.Offer.findOneAndUpdate({
          _id: offer._id
        },
        schema, options
      );



      this.HelperMethods.deletePaths(oldPaths)


      return data


    } catch (error) {
      throw error;
    }
  };
  /**
   * @delete
   */
  delete = async (query, profile, session = null) => {
    try {
      const oldPaths = [];

      const offer = await this.SessionManager.executeQueryHookWithSession(this.Offer.findOne(query), session);
      if (!offer) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this offer'))
      if (Array.isArray(offer.Pictures) && offer.Pictures.lenght > 0) {
        oldPaths.push(...offer.Pictures);
      }

      await offer.softDelete(profile._id, session);
      this.HelperMethods.deletePaths(oldPaths)

      return offer

    } catch (error) {
      throw error;

    }
  };
  /**
   * @findById
   */
  findById = async (id, session = null) => {
    try {
      const offer = await this.SessionManager.executeQueryHookWithSession(this.Offer.findOne({
        _id: id
      }), session)

      if (!offer) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this offer'))

      return await this.OfferResources.ref(offer)


    } catch (error) {
      throw error;
    }
  };
  /**
   * @getList
   */
  getList = async (querySchema, match = {
    matchCreatedBy: {},
    matchUpdatedBy: {},
    matchDeletedBy: {}
  }, session = null) => {
    try {
      const {
        matchCreatedBy,
        matchUpdatedBy,
        matchDeletedBy,
      } = match
      const data = []
      const offerFindData = await this.SessionManager.executeQueryHookWithSession(this.Offer.find(querySchema).populate({
        path: "createdBy",
        match: matchCreatedBy
      }).populate({
        path: "updatedBy",
        match: matchUpdatedBy
      }).populate({
        path: "deletedBy",
        match: matchDeletedBy
      }), session)

      for (const item of offerFindData) {
        if (item
          //&&item.createdBy
          //&&item.updatedBy
          //&&item.deletedBy
        ) {
          data.push(await this.OfferResources.collection(item))
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

      const offerFindOneData = await this.SessionManager.executeQueryHookWithSession(this.Offer.findOne(querySchema).populate({
        path: "createdBy",
      }).populate({
        path: "updatedBy",
      }).populate({
        path: "deletedBy",
      }), session)

      if (offerFindOneData) {
        data = await this.OfferResources.collection(offerFindOneData)
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
            from: "admins",
            localField: "createdBy",
            foreignField: "_id",
            as: "createdBy"
          }
        },

        {
          $addFields: {
            createdBy: {
              $ifNull: [{
                $arrayElemAt: ['$createdBy', 0]
              }, null]
            }
          }
        },
        {
          $unwind: {
            path: '$createdBy',
            preserveNullAndEmptyArrays: true
          }
        },

        {
          $lookup: {
            from: "admins",
            localField: "updatedBy",
            foreignField: "_id",
            as: "updatedBy"
          }
        },

        {
          $addFields: {
            updatedBy: {
              $ifNull: [{
                $arrayElemAt: ['$updatedBy', 0]
              }, null]
            }
          }
        },
        {
          $unwind: {
            path: '$updatedBy',
            preserveNullAndEmptyArrays: true
          }
        },

        {
          $lookup: {
            from: "admins",
            localField: "deletedBy",
            foreignField: "_id",
            as: "deletedBy"
          }
        },

        {
          $addFields: {
            deletedBy: {
              $ifNull: [{
                $arrayElemAt: ['$deletedBy', 0]
              }, null]
            }
          }
        },
        {
          $unwind: {
            path: '$deletedBy',
            preserveNullAndEmptyArrays: true
          }
        },

      ];
      const paginationResponse = await this.getPaginateAggregateDataService({
        Model: this.Offer,
        perPage: perPage,
        page: page,
        query: query,
        route: route,
        pipeline: servicePipeline.concat(inputPipeline),
        countDocumentSchema: countDocumentSchema

      })

      const response = paginationResponse.data

      const data = await Promise.all(
        response.map(item => this.OfferResources.collection(item))
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