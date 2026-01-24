/**
 * @TagsServices 
 */

const CoreServices = require("../../../shared/services/core.services")
module.exports = class TagsServices extends CoreServices {

  constructor() {
    super();
    this.Tags = require("../../admin/models/tags.model");
    this.TagsResources = require("../../admin/resources/tags.resources");
  }
  /**
   * @instanceAlreadyExist
   */
  instanceAlreadyExist = async (payload, session = null) => {
    try {
      return await this.SessionManager.executeQueryHookWithSession(this.Tags.findOne({
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
      const tagsExist = await this.instanceAlreadyExist(payload, session)

      let save
      if (tagsExist) {
        save = tagsExist
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
      if (this.HelperMethods.issetData(payload.Tags)) {
        const TagsExistForTags = await this.SessionManager.executeQueryHookWithSession(this.Tags.findOne({
          Tags: payload.Tags
        }), session)
        if (TagsExistForTags) throw new this.ApiError("this Tags already exists")

        schema.Tags = this.HelperMethods.getValidTrimData(payload.Tags);
      }

      schema.createdBy = profile._id;
      schema.updatedBy = profile._id;

      const tags = new this.Tags(schema);
      const save = await tags.save(options);

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

      const tags = await this.SessionManager.executeQueryHookWithSession(this.Tags.findOne(query), session);

      if (!tags) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this tags'))

      const schema = {}
      if (this.HelperMethods.issetData(payload.Tags)) {
        const TagsExistForTags = await this.SessionManager.executeQueryHookWithSession(this.Tags.findOne({
          _id: {
            $ne: tags._id
          },
          Tags: payload.Tags
        }), session)
        if (TagsExistForTags) throw new this.ApiError("this Tags already exists")

        schema.Tags = this.HelperMethods.getValidTrimData(payload.Tags);
      }

      schema.updatedBy = profile._id;

      const data = await this.Tags.findOneAndUpdate({
          _id: tags._id
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

      const tags = await this.SessionManager.executeQueryHookWithSession(this.Tags.findOne(query), session);
      if (!tags) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this tags'))

      await tags.softDelete(profile._id, session);

      return tags

    } catch (error) {
      throw error;

    }
  };
  /**
   * @findById
   */
  findById = async (id, session = null) => {
    try {
      const tags = await this.SessionManager.executeQueryHookWithSession(this.Tags.findOne({
        _id: id
      }), session)

      if (!tags) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this tags'))

      return await this.TagsResources.ref(tags)


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
      const tagsFindData = await this.SessionManager.executeQueryHookWithSession(this.Tags.find(querySchema).populate({
        path: "createdBy",
        match: matchCreatedBy
      }).populate({
        path: "updatedBy",
        match: matchUpdatedBy
      }).populate({
        path: "deletedBy",
        match: matchDeletedBy
      }), session)

      for (const item of tagsFindData) {
        if (item
          //&&item.createdBy
          //&&item.updatedBy
          //&&item.deletedBy
        ) {
          data.push(await this.TagsResources.collection(item))
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

      const tagsFindOneData = await this.SessionManager.executeQueryHookWithSession(this.Tags.findOne(querySchema).populate({
        path: "createdBy",
      }).populate({
        path: "updatedBy",
      }).populate({
        path: "deletedBy",
      }), session)

      if (tagsFindOneData) {
        data = await this.TagsResources.collection(tagsFindOneData)
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
        Model: this.Tags,
        perPage: perPage,
        page: page,
        query: query,
        route: route,
        pipeline: servicePipeline.concat(inputPipeline),
        countDocumentSchema: countDocumentSchema

      })

      const response = paginationResponse.data

      const data = await Promise.all(
        response.map(item => this.TagsResources.collection(item))
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