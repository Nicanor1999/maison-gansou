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
   * Parse FormData body: sections, tags, fileMapping are JSON strings
   * Distribute uploaded files into sections based on fileMapping
   */
  _parseBodyAndFiles = (req) => {
    const body = { ...req.body }

    // Parse JSON strings
    if (typeof body.sections === 'string') {
      try { body.sections = JSON.parse(body.sections) } catch (e) { body.sections = [] }
    }
    if (typeof body.tags === 'string') {
      try { body.tags = JSON.parse(body.tags) } catch (e) { body.tags = [] }
    }

    let fileMapping = []
    if (typeof body.fileMapping === 'string') {
      try { fileMapping = JSON.parse(body.fileMapping) } catch (e) { fileMapping = [] }
      delete body.fileMapping
    }

    // Convert status from string to boolean (FormData sends strings)
    if (typeof body.status === 'string') {
      body.status = body.status === 'true'
    }

    // Handle files
    if (req.files) {
      // Handle CoverImage
      if (req.files.CoverImage && req.files.CoverImage.length > 0) {
        const coverFile = req.files.CoverImage[0]
        body.coverImage = '/' + coverFile.path.replace(/^\.?\//, '')
      }

      // Handle Pictures (section images)
      if (req.files.Pictures && req.files.Pictures.length > 0 && body.sections) {
        for (let i = 0; i < req.files.Pictures.length; i++) {
          const mapping = fileMapping[i]
          if (mapping && body.sections[mapping.sectionIndex] !== undefined) {
            const section = body.sections[mapping.sectionIndex]
            const filePath = '/' + req.files.Pictures[i].path.replace(/^\.?\//, '')
            if (mapping.field === 'images') {
              if (!Array.isArray(section.images)) section.images = []
              section.images.push(filePath)
            } else {
              section[mapping.field] = filePath
            }
          }
        }
      }
    }

    return body
  };

  /**
   * Article Create
   * ******************
   * @name create
   * @route  POST /article
   */
  create = async (req, res) => {
    const body = this._parseBodyAndFiles(req)

    const { error } = this.ArticleValidations.CreateValidation(body);
    if (error) throw new this.ValidationError(error.details[0].message);

    const save = await this.ArticleServices.create(body);

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
   */
  update = async (req, res) => {
    const body = this._parseBodyAndFiles(req)

    const { error } = this.ArticleValidations.UpdateValidation(body);
    if (error) throw new this.ValidationError(error.details[0].message);

    const query = {
      _id: req.params.id,
    }

    const article = await this.ArticleServices.update(query, body);

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
   */
  delete = async (req, res) => {
    const query = {
      _id: req.params.id,
    }

    const data = await this.ArticleServices.delete(query)

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
    if (query.title) {
      querySchema.push({
        title: {
          $regex: ".*" + query.title + ".*",
          $options: "i",
        }
      })
    }
    if (query.status == 'true') {
      querySchema.push({
        status: true
      })
    }
    if (query.status == 'false') {
      querySchema.push({
        status: false
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
   */
  findOne = async (req, res) => {
    const querySchema = {
      _id: req.params.id,
    }

    const data = await this.ArticleServices.findOne(querySchema)
    if (!data) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this article'), this.ERROR_CODES.CAN_NOT_FIND, this.STATUS_CODES.NOT_FOUND)
    res.json({
      data: data,
      success: true,
      message: this.SUCCESS_MESSAGES.RETRIEVED_SUCCESSFULLY('Article')
    })
  };

}
