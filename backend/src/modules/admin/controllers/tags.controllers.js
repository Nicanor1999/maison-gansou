/**
 * @TagsController 
 */

const CoreServices = require("../../../shared/services/core.services")
module.exports = class TagsController extends CoreServices {

  constructor() {
    super()

    this.TagsServices = new(require("../../admin/services/tags.services"))();
    this.TagsValidations = require("../../admin/validations/tags.validations");
  }
  /**
   * Tags Create
   * ******************
   * @name create
   * @route  POST /tags
   * @type 
   * @description 
   * ******************
   * 
   */
  create = async (req, res) => {
    // Validate data
    const {
      error
    } = this.TagsValidations.CreateValidation(req.body);
    if (error) throw new this.ValidationError(error.details[0].message);

    const profile = req.admin;


    const payload = {
      ...req.body
    }

    const save = await this.TagsServices.create(payload, profile);

    res.json({
      data: save,
      success: true,
      message: this.SUCCESS_MESSAGES.CREATED_SUCCESSFULLY('Tags')
    })
  };
  /**
   * Tags Update
   * ******************
   * @name update
   * @route  PUT /tags/:id
   * @type 
   * @description 
   * ******************
   * 
   */
  update = async (req, res) => {
    // Validate data
    const {
      error
    } = this.TagsValidations.UpdateValidation(req.body);
    if (error) throw new this.ValidationError(error.details[0].message);

    const profile = req.admin;

    const query = {
      _id: req.params.id,
      createdBy: profile._id
    }


    const payload = {
      ...req.body
    }

    const tags = await this.TagsServices.update(query, payload, profile);

    res.json({
      data: tags,
      success: true,
      message: this.SUCCESS_MESSAGES.UPDATED_SUCCESSFULLY('Tags')
    })
  };
  /**
   * Tags Delete
   * ******************
   * @route  DELETE /tags/:id
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

    const data = await this.TagsServices.delete(query, profile)

    res.json({
      data: data,
      success: true,
      message: this.SUCCESS_MESSAGES.DELETED_SUCCESSFULLY('Tags')
    })
  };
  /**
   * Tags FindAll
   * ******************
   * @name findAll
   * @route  GET /tags
   * @type 
   * @description 
   * ******************
   * 
   */
  findAll = async (req, res) => {
    const profile = req.admin;
    const query = req.query

    const options = {
      perPage: process.env.PAGINATION_TOTAL_PER_PAGE || 10,
      page: 1,
      route: "/tags",
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
        Tags: {
          $regex: ".*" + query.Tags + ".*",
          $options: "i",
        }
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


    const output = await this.TagsServices.getPaginatedList(pipeline, options)

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
   * Tags FindOne
   * ******************
   * @name findOne
   * @route  GET /tags/:id
   * @type 
   * @description 
   * ******************
   * 
   */
  findOne = async (req, res) => {
    const profile = req.admin;

    const querySchema = {
      _id: req.params.id,
    }

    const data = await this.TagsServices.findOne(querySchema)
    if (!data) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this admin'), this.ERROR_CODES.CAN_NOT_FIND, this.STATUS_CODES.NOT_FOUND)
    res.json({
      data: data,
      success: true,
      message: this.SUCCESS_MESSAGES.RETRIEVED_SUCCESSFULLY('Tags')
    })
  };

}