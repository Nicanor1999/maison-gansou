/**
 * @ArticleController 
 */

const CoreServices = require("../../../shared/services/core.services")
module.exports = class ArticleController extends CoreServices {

  constructor() {
    super()

    this.ArticleServices = new(require("../../admin/services/article.services"))();
    this.ArticleValidations = require("../../admin/validations/article.validations");
  }
  /**
   * Article Create
   * ******************
   * @name create
   * @route  POST /article
   * @type 
   * @description 
   * ******************
   * 
   */
  create = async (req, res) => {
    // Validate data
    const {
      error
    } = this.ArticleValidations.CreateValidation(req.body);
    if (error) throw new this.ValidationError(error.details[0].message);

    const profile = req.admin;


    const payload = {
      ...req.body
    }

    const save = await this.ArticleServices.create(payload, profile);

    res.json({
      data: save,
      success: true,
      message: this.SUCCESS_MESSAGES.CREATED_SUCCESSFULLY('Article')
    })
  };
  /**
   * Article Update
   * ******************
   * @name update
   * @route  PUT /article/:id
   * @type 
   * @description 
   * ******************
   * 
   */
  update = async (req, res) => {
    // Validate data
    const {
      error
    } = this.ArticleValidations.UpdateValidation(req.body);
    if (error) throw new this.ValidationError(error.details[0].message);

    const profile = req.admin;

    const query = {
      _id: req.params.id,
      createdBy: profile._id
    }


    const payload = {
      ...req.body
    }

    const article = await this.ArticleServices.update(query, payload, profile);

    res.json({
      data: article,
      success: true,
      message: this.SUCCESS_MESSAGES.UPDATED_SUCCESSFULLY('Article')
    })
  };
  /**
   * Article Delete
   * ******************
   * @route  DELETE /article/:id
   * @type 
   * @description 
   * ******************
   * 
   */
  delete = async (req, res) => {
    const profile = req.admin;

    const query = {
      _id: req.params.id,
      createdBy: profile._id
    }

    const data = await this.ArticleServices.delete(query, profile)

    res.json({
      data: data,
      success: true,
      message: this.SUCCESS_MESSAGES.DELETED_SUCCESSFULLY('Article')
    })
  };
  /**
   * Article findAll
   * ******************
   * @name findAll
   * @route  GET /article
   * @type 
   * @description 
   * ******************
   * 
   */
  findAll = async (req, res) => {
    const query = req.query

    const options = {
      perPage: process.env.PAGINATION_TOTAL_PER_PAGE || 10,
      page: 1,
      route: "/article",
      query: query,
      withOutDeletedRestriction: query.withOutDeletedRestriction,
      onlyDeletedData: query.onlyDeletedData,
    }

    if (query.page) {
      options.page = query.page
    }
    if (query.perPage) {
      options.perPage = query.perPage
    }

    let countDocumentSchema = {}

    const querySchema = []
    if (query.createdBy) {
      querySchema.push({
        ["createdBy._id"]: this.HelperMethods.generateObjectId(query.createdBy)
      })
    }
    if (query.updatedBy) {
      querySchema.push({
        ["updatedBy._id"]: this.HelperMethods.generateObjectId(query.updatedBy)
      })
    }
    if (query.deletedBy) {
      querySchema.push({
        ["deletedBy._id"]: this.HelperMethods.generateObjectId(query.deletedBy)
      })
    }
    if (query.Tags) {
      querySchema.push({
        ["Tags._id"]: this.HelperMethods.generateObjectId(query.Tags)
      })
    }
    if (query.Title) {
      querySchema.push({
        Title: {
          $regex: ".*" + query.Title + ".*",
          $options: "i",
        }
      })

    }
    if (query.Section) {
      querySchema.push({
        ["Section._id"]: this.HelperMethods.generateObjectId(query.Section)
      })
    }
    if (query.Statut == 'true') {
      querySchema.push({
        Statut: true
      })
    }
    if (query.Statut == 'false') {
      querySchema.push({
        Statut: false
      })
    }


    options.countDocumentSchema = this.convertArrayToObjectQuerySchema(querySchema, countDocumentSchema, {
      ignoredSubPrivateData: true
    })

    const pipeline = []
    if (querySchema.length > 0) {
      pipeline.push({
        $match: {
          $or: [{
            $and: querySchema
          }]
        }
      })
    }


    const output = await this.ArticleServices.getPaginatedList(pipeline, options)

    res.json({
      page: output.page,
      totalPages: output.totalPages,
      totalItems: output.totalItems,
      perPage: output.perPage,
      data: output.data,
      nextLink: output.nextLink,
      prevLink: output.prevLink,
      success: true,
    })
  };
  /**
   * Article FindOne
   * ******************
   * @name findOne
   * @route  GET /article/:id
   * @type 
   * @description 
   * ******************
   * 
   */
  findOne = async (req, res) => {
    const querySchema = {
      _id: req.params.id,
    }

    const data = await this.ArticleServices.findOne(querySchema)
    if (!data) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this admin'), this.ERROR_CODES.CAN_NOT_FIND, this.STATUS_CODES.NOT_FOUND)
    res.json({
      data: data,
      success: true,
      message: this.SUCCESS_MESSAGES.RETRIEVED_SUCCESSFULLY('Article')
    })
  };

}