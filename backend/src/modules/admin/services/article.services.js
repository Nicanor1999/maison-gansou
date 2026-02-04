/**
 * @ArticleServices
 */

const CoreServices = require("../../../shared/services/core.services")
module.exports = class ArticleServices extends CoreServices {

  constructor() {
    super();
    this.Article = require("../../admin/models/article.model");
    this.ArticleResources = require("../../admin/resources/article.resources");
  }
  /**
   * @instanceAlreadyExist
   */
  instanceAlreadyExist = async (payload, session = null) => {
    try {
      return await this.SessionManager.executeQueryHookWithSession(this.Article.findOne({
        title: payload.title,
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
      const articleExist = await this.instanceAlreadyExist(payload, session)

      let save
      if (articleExist) {
        save = articleExist
      } else {
        save = await this.create(payload, session)
      }

      return save

    } catch (error) {
      throw error
    }
  };
  /**
   * @create
   */
  create = async (payload, session = null) => {
    try {
      const options = session ? { session } : {}

      const schema = {}

      if (payload.title !== undefined) {
        schema.title = typeof payload.title === 'string' ? payload.title.trim() : payload.title;
      }
      if (payload.coverImage !== undefined) {
        schema.coverImage = payload.coverImage;
      }
      if (payload.tags !== undefined) {
        schema.tags = payload.tags;
      }
      if (payload.sections && Array.isArray(payload.sections)) {
        schema.sections = payload.sections;
      }
      if (payload.status !== undefined) {
        schema.status = payload.status;
      }
      if (payload.createdBy !== undefined) {
        schema.createdBy = payload.createdBy;
      }

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
  update = async (query, payload, session = null) => {
    try {
      const options = session ? { session } : { new: true };

      const article = await this.SessionManager.executeQueryHookWithSession(this.Article.findOne(query), session);

      if (!article) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this article'))

      const schema = {}

      if (payload.title !== undefined) {
        schema.title = typeof payload.title === 'string' ? payload.title.trim() : payload.title;
      }
      if (payload.coverImage !== undefined) {
        schema.coverImage = payload.coverImage;
      }
      if (payload.tags !== undefined) {
        schema.tags = payload.tags;
      }
      if (payload.sections && Array.isArray(payload.sections)) {
        schema.sections = payload.sections;
      }
      if (payload.status !== undefined) {
        schema.status = payload.status;
      }
      if (payload.updatedBy !== undefined) {
        schema.updatedBy = payload.updatedBy;
      }

      const data = await this.Article.findOneAndUpdate(
        { _id: article._id },
        schema,
        options
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
      const article = await this.SessionManager.executeQueryHookWithSession(this.Article.findOne(query), session);
      if (!article) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this article'))

      await article.softDelete(undefined, session);

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
  getList = async (querySchema, match = {}, session = null) => {
    try {
      const data = []
      const articleFindData = await this.SessionManager.executeQueryHookWithSession(
        this.Article.find(querySchema).populate({ path: "tags" }),
        session
      )

      for (const item of articleFindData) {
        if (item) {
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

      const articleFindOneData = await this.SessionManager.executeQueryHookWithSession(
        this.Article.findOne(querySchema).populate({ path: "tags" }),
        session
      )

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

      const servicePipeline = [
        {
          $lookup: {
            from: "tags",
            localField: "tags",
            foreignField: "_id",
            as: "tags"
          }
        }
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
