/**
 * @AdminServices 
 */

const CoreServices = require("../../../shared/services/core.services")
module.exports = class AdminServices extends CoreServices {

  constructor() {
    super();
    this.Admin = require("../../admin/models/admin.model");

    this.AuthIdentityEnum = require("../../auth/enums/identity.auth.enum");
    this.AuthServices = new(require("../../auth/services/auth.services"))();
  }
  /**
   * @instanceAlreadyExist
   */
  instanceAlreadyExist = async (payload, session = null) => {
    try {
      return await this.SessionManager.executeQueryHookWithSession(this.Admin.findOne({
          email: payload.email,
        })
        .populate({
          path: "identity"
        })
        .includeDeleted(), session)


    } catch (error) {
      throw error;
    }
  };
  /**
   * @findOrCreate
   */
  findOrCreate = async (payload, session = null) => {
    try {
      const adminExist = await this.instanceAlreadyExist(payload, session)

      let save
      if (adminExist) {
        save = adminExist
      } else {
        save = await this.create(payload, session)
      }
      return save

    } catch (error) {
      throw error;
    }
  };
  /**
   * @create
   */
  create = async (payload, session = null) => {
    return this.SessionManager.executeCallbackInTransaction(async (session) => {
      try {
        const options = session ? {
          session
        } : {}

        const identity = await this.AuthServices.createIdentity({
          firstName: payload.firstName,
          lastName: payload.lastName,
          password: payload.password,
          actorType: "admin",
          identifier: payload.email,
          identifierType: this.AuthIdentityEnum.IDENTIFIER_TYPES.EMAIL.KEY,
          shouldSkipVerificationCode: payload.shouldSkipVerificationCode || false,
        }, session)


        const schema = {}
        if (this.HelperMethods.issetData(payload.firstName)) {
          schema.firstName = this.HelperMethods.getValidTrimData(payload.firstName);
        }
        if (this.HelperMethods.issetData(payload.lastName)) {
          schema.lastName = this.HelperMethods.getValidTrimData(payload.lastName);
        }
        if (this.HelperMethods.issetData(payload.email)) {
          const emailExistForAdmin = await this.SessionManager.executeQueryHookWithSession(this.Admin.findOne({
            email: payload.email
          }), session)
          if (emailExistForAdmin) throw new this.ApiError("this email already exists")

          schema.email = this.HelperMethods.getValidTrimData(payload.email);
        }
        if (this.HelperMethods.issetData(payload.roles)) {

          schema.roles = this.HelperMethods.getValidTrimData(payload.roles);


        }


        schema.identity = identity._id
        schema.isActive = identity.isActive
        const admin = new this.Admin(schema);
        const save = await admin.save(options);


        return save
      } catch (error) {
        throw error;
      }
    }, session)
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

      const admin = await this.Admin.findOne(query);

      if (!admin) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this admin'))

      const schema = {}
      if (this.HelperMethods.issetData(payload.firstName)) {
        schema.firstName = this.HelperMethods.getValidTrimData(payload.firstName);
      }
      if (this.HelperMethods.issetData(payload.lastName)) {
        schema.lastName = this.HelperMethods.getValidTrimData(payload.lastName);
      }
      if (this.HelperMethods.issetData(payload.email)) {
        const emailExistForAdmin = await this.SessionManager.executeQueryHookWithSession(this.Admin.findOne({
          _id: {
            $ne: admin._id
          },
          email: payload.email
        }), session)
        if (emailExistForAdmin) throw new this.ApiError("this email already exists")

        schema.email = this.HelperMethods.getValidTrimData(payload.email);
      }
      if (this.HelperMethods.issetData(payload.roles)) {

        schema.roles = this.HelperMethods.getValidTrimData(payload.roles);


      }


      const data = await this.Admin.findOneAndUpdate({
          _id: admin._id
        },
        schema, options
      );



      return data

    } catch (error) {
      throw error;
    }
  };
  /**
   * @updateProfile
   */
  updateProfile = async (payload, profile, session = null) => {
    try {
      const options = session ? {
        session
      } : {
        new: true
      };

      const admin = await this.Admin.findOne({
        _id: profile._id
      });

      if (!admin) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this admin'))

      const schema = {}
      if (this.HelperMethods.issetData(payload.firstName)) {
        schema.firstName = this.HelperMethods.getValidTrimData(payload.firstName);
      }
      if (this.HelperMethods.issetData(payload.lastName)) {
        schema.lastName = this.HelperMethods.getValidTrimData(payload.lastName);
      }
      if (this.HelperMethods.issetData(payload.email)) {
        const emailExistForAdmin = await this.SessionManager.executeQueryHookWithSession(this.Admin.findOne({
          _id: {
            $ne: admin._id
          },
          email: payload.email
        }), session)
        if (emailExistForAdmin) throw new this.ApiError("this email already exists")

        schema.email = this.HelperMethods.getValidTrimData(payload.email);
      }
      if (this.HelperMethods.issetData(payload.roles)) {

        schema.roles = this.HelperMethods.getValidTrimData(payload.roles);


      }


      const data = await this.Admin.findOneAndUpdate({
          _id: admin._id
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
  delete = async (query, profile, session = null) => {
    try {

      const admin = await this.Admin.findOne(query);

      if (!admin) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this admin'))

      await admin.softDelete(profile._id, session);

      return admin

    } catch (error) {
      throw error;
    }
  };
  /**
   * @deleteProfile
   */
  deleteProfile = async (profile, session = null) => {
    try {

      const admin = await this.Admin.findOne({
        _id: profile._id
      });
      if (!admin) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this admin'))

      await admin.softDelete(profile._id, session);

      return admin

    } catch (error) {
      throw error
    }
  };
  /**
   * @findById
   */
  findById = async (id, session = null) => {
    try {
      const admin = await this.SessionManager.executeQueryHookWithSession(this.Admin.findOne({
        _id: id
      }), session)

      if (!admin) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this admin'))

      return admin


    } catch (error) {
      throw error;
    }
  };
  /**
   * @getList
   */
  getList = async (querySchema, match = {
    matchIdentity: {}
  }, session = null) => {
    try {
      const {
        matchIdentity,
      } = match
      const data = []
      const adminFindData = await this.SessionManager.executeQueryHookWithSession(this.Admin.find(querySchema).populate({
        path: "identity",
        match: matchIdentity
      }), session)


      for (const item of adminFindData) {
        if (item
          //&&item.identity
        ) {
          data.push(item)
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
      const adminFindOneData = await this.SessionManager.executeQueryHookWithSession(this.Admin.findOne(querySchema).populate({
        path: "identity",
      }), session)

      if (adminFindOneData) {
        data = adminFindOneData
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
            from: "authidentities",
            localField: "identity",
            foreignField: "_id",
            as: "identity"
          }
        },

        {
          $addFields: {
            identity: {
              $ifNull: [{
                $arrayElemAt: ['$identity', 0]
              }, null]
            }
          }
        },
        {
          $unwind: {
            path: '$identity',
            preserveNullAndEmptyArrays: true
          }
        },

      ];
      const paginationResponse = await this.getPaginateAggregateDataService({
        Model: this.Admin,
        perPage: perPage,
        page: page,
        query: query,
        route: route,
        pipeline: servicePipeline.concat(inputPipeline),
        countDocumentSchema: countDocumentSchema
      })

      const response = paginationResponse.data

      const data = response.map(item => item)


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