/**
 * @ArticleServices 
 */

const CoreServices = require("../../../shared/services/core.services")
module.exports = class ArticleServices extends CoreServices {

  constructor() {
    super();
    this.Article = require("../../admin/models/article.model");
    this.ArticleResources = require("../../admin/resources/article.resources");
    this.SharedAdminServices = new(require("../../admin/services/shared.admin.services"))();
  }
  /**
   * @instanceAlreadyExist
   */
  instanceAlreadyExist = async (payload, session = null) => {
    try {
      return await this.SessionManager.executeQueryHookWithSession(this.Article.findOne({
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
      const articleExist = await this.instanceAlreadyExist(payload, session)

      let save
      if (articleExist) {
        save = articleExist
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
        const Tags = await this.SharedAdminServices.findTagsById(this.HelperMethods.getValidTrimData(payload.Tags), session)
        if (!Tags) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND("this Tags"));

        schema.Tags = this.HelperMethods.getValidTrimData(payload.Tags);
      }

      if (this.HelperMethods.issetData(payload.Title)) {
        schema.Title = this.HelperMethods.getValidTrimData(payload.Title);
      }
      if (this.HelperMethods.issetData(payload.Section)) {
        const Section = await this.SharedAdminServices.findSectionById(this.HelperMethods.getValidTrimData(payload.Section), session)
        if (!Section) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND("this Section"));

        schema.Section = this.HelperMethods.getValidTrimData(payload.Section);
      }

      if (this.HelperMethods.issetData(payload.Statut)) {

        schema.Statut = this.HelperMethods.getValidTrimData(payload.Statut);


      }

      schema.createdBy = profile._id;
      schema.updatedBy = profile._id;

      const article = new this.Article(schema);
      const save = await article.save(options);

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

      const article = await this.SessionManager.executeQueryHookWithSession(this.Article.findOne(query), session);

      if (!article) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this article'))

      const schema = {}
      if (this.HelperMethods.issetData(payload.Tags)) {
        const Tags = await this.SharedAdminServices.findTagsById(this.HelperMethods.getValidTrimData(payload.Tags), session)
        if (!Tags) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND("this Tags"));

        schema.Tags = this.HelperMethods.getValidTrimData(payload.Tags);
      }

      if (this.HelperMethods.issetData(payload.Title)) {
        schema.Title = this.HelperMethods.getValidTrimData(payload.Title);
      }
      if (this.HelperMethods.issetData(payload.Section)) {
        const Section = await this.SharedAdminServices.findSectionById(this.HelperMethods.getValidTrimData(payload.Section), session)
        if (!Section) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND("this Section"));

        schema.Section = this.HelperMethods.getValidTrimData(payload.Section);
      }

      if (this.HelperMethods.issetData(payload.Statut)) {

        schema.Statut = this.HelperMethods.getValidTrimData(payload.Statut);


      }

      schema.updatedBy = profile._id;

      const data = await this.Article.findOneAndUpdate({
          _id: article._id
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

      const article = await this.SessionManager.executeQueryHookWithSession(this.Article.findOne(query), session);
      if (!article) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this article'))

      await article.softDelete(profile._id, session);

      return article

    } catch (error) {
      throw error;

    }
  };
  /**
   * @findById
   */
  findById = async (id, session = null) => {
    try {
      const article = await this.SessionManager.executeQueryHookWithSession(this.Article.findOne({
        _id: id
      }), session)

      if (!article) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this article'))

      return await this.ArticleResources.ref(article)


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
    matchDeletedBy: {},
    matchTags: {},
    matchSection: {}
  }, session = null) => {
    try {
      const {
        matchCreatedBy,
        matchUpdatedBy,
        matchDeletedBy,
        matchTags,
        matchSection,
      } = match
      const data = []
      const articleFindData = await this.SessionManager.executeQueryHookWithSession(this.Article.find(querySchema).populate({
        path: "createdBy",
        match: matchCreatedBy
      }).populate({
        path: "updatedBy",
        match: matchUpdatedBy
      }).populate({
        path: "deletedBy",
        match: matchDeletedBy
      }).populate({
        path: "Tags",
        match: matchTags
      }).populate({
        path: "Section",
        match: matchSection
      }), session)

      for (const item of articleFindData) {
        if (item
          //&&item.createdBy
          //&&item.updatedBy
          //&&item.deletedBy
          //&&item.Tags
          //&&item.Section
        ) {
          data.push(await this.ArticleResources.collection(item))
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

      const articleFindOneData = await this.SessionManager.executeQueryHookWithSession(this.Article.findOne(querySchema).populate({
        path: "createdBy",
      }).populate({
        path: "updatedBy",
      }).populate({
        path: "deletedBy",
      }).populate({
        path: "Tags",
      }).populate({
        path: "Section",
      }), session)

      if (articleFindOneData) {
        data = await this.ArticleResources.collection(articleFindOneData)
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

        {
          $lookup: {
            from: "tags",
            localField: "Tags",
            foreignField: "_id",
            as: "Tags"
          }
        },

        {
          $addFields: {
            Tags: {
              $ifNull: [{
                $arrayElemAt: ['$Tags', 0]
              }, null]
            }
          }
        },
        {
          $unwind: {
            path: '$Tags',
            preserveNullAndEmptyArrays: true
          }
        },

        {
          $lookup: {
            from: "sections",
            localField: "Section",
            foreignField: "_id",
            as: "Section"
          }
        },

        {
          $addFields: {
            Section: {
              $ifNull: [{
                $arrayElemAt: ['$Section', 0]
              }, null]
            }
          }
        },
        {
          $unwind: {
            path: '$Section',
            preserveNullAndEmptyArrays: true
          }
        },

      ];
      const paginationResponse = await this.getPaginateAggregateDataService({
        Model: this.Article,
        perPage: perPage,
        page: page,
        query: query,
        route: route,
        pipeline: servicePipeline.concat(inputPipeline),
        countDocumentSchema: countDocumentSchema

      })

      const response = paginationResponse.data

      const data = await Promise.all(
        response.map(item => this.ArticleResources.collection(item))
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