/**
 * @ProjectsController 
 */

const CoreServices = require("../../../shared/services/core.services")
module.exports = class ProjectsController extends CoreServices {

  constructor() {
    super()

    this.ProjectsServices = new(require("../../admin/services/projects.services"))();
    this.ProjectsValidations = require("../../admin/validations/projects.validations");
  }
  /**
   * Projects Create
   * ******************
   * @name create
   * @route  POST /projects
   * @type 
   * @description 
   * ******************
   * 
   */
  /**
   * Parse FormData body: sections, fileMapping and partners are JSON strings
   * Distribute uploaded files into sections based on fileMapping
   */
  _parseBodyAndFiles = (req) => {
    const body = { ...req.body }

    if (typeof body.sections === 'string') {
      try { body.sections = JSON.parse(body.sections) } catch (e) { body.sections = [] }
    }
    let fileMapping = []
    if (typeof body.fileMapping === 'string') {
      try { fileMapping = JSON.parse(body.fileMapping) } catch (e) { fileMapping = [] }
      delete body.fileMapping
    }
    if (typeof body.partners === 'string') {
      try { body.partners = JSON.parse(body.partners) } catch (e) { body.partners = [] }
    }
    // Convert status from string to boolean (FormData sends strings)
    if (typeof body.status === 'string') {
      body.status = body.status === 'true'
    }

    if (req.files && req.files.length > 0 && body.sections) {
      for (let i = 0; i < req.files.length; i++) {
        const mapping = fileMapping[i]
        if (mapping && body.sections[mapping.sectionIndex] !== undefined) {
          const section = body.sections[mapping.sectionIndex]
          const filePath = '/' + req.files[i].path.replace(/^\.?\//, '')
          if (mapping.field === 'images') {
            if (!Array.isArray(section.images)) section.images = []
            section.images.push(filePath)
          } else {
            section[mapping.field] = filePath
          }
        }
      }
    }

    return body
  };

  create = async (req, res) => {
    const body = this._parseBodyAndFiles(req)

    const { error } = this.ProjectsValidations.CreateValidation(body);
    if (error) throw new this.ValidationError(error.details[0].message);

    const save = await this.ProjectsServices.create(body);

    res.json({
      data: save,
      success: true,
      message: this.SUCCESS_MESSAGES.CREATED_SUCCESSFULLY('Projects')
    })
  };
  /**
   * Projects Update
   * ******************
   * @name update
   * @route  PUT /projects/:id
   * @type 
   * @description 
   * ******************
   * 
   */
  update = async (req, res) => {
    const body = this._parseBodyAndFiles(req)

    const { error } = this.ProjectsValidations.UpdateValidation(body);
    if (error) throw new this.ValidationError(error.details[0].message);
    const query = {
      _id: req.params.id,
    }

    const payload = { ...body }

    const projects = await this.ProjectsServices.update(query, payload);

    res.json({
      data: projects,
      success: true,
      message: this.SUCCESS_MESSAGES.UPDATED_SUCCESSFULLY('Projects')

    })
  };
  /**
   * Projects Delete
   * ******************
   * @name delete
   * @route  DELETE /projects/:id
   * @type 
   * @description 
   * ******************
   * 
   */
  delete = async (req, res) => {
    const query = {
      _id: req.params.id,
    }

    const data = await this.ProjectsServices.delete(query)
    res.json({
      success: true,
      data,
      message: this.SUCCESS_MESSAGES.DELETED_SUCCESSFULLY('Category')
    })
  };
  /**
   * Projects findAll
   * ******************
   * @name findAll
   * @route  GET /projects
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
      route: "/projects",
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
    if (query.title) {
      querySchema.push({
        title: {
          $regex: ".*" + query.title + ".*",
          $options: "i",
        }
      })
    }
    if (query.country) {
      querySchema.push({
        country: {
          $regex: ".*" + query.country + ".*",
          $options: "i",
        }
      })
    }
    if (query.town) {
      querySchema.push({
        town: {
          $regex: ".*" + query.town + ".*",
          $options: "i",
        }
      })
    }
    if (query.services) {
      querySchema.push({
        services: {
          $regex: ".*" + query.services + ".*",
          $options: "i",
        }
      })
    }
    if (query.worksType) {
      querySchema.push({
        worksType: {
          $regex: ".*" + query.worksType + ".*",
          $options: "i",
        }
      })
    }
    if (query.partners) {
      querySchema.push({
        partners: query.partners
      })
    }
    if (query.section) {
      querySchema.push({
        ["section._id"]: this.HelperMethods.generateObjectId(query.section)
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


    const output = await this.ProjectsServices.getPaginatedList(pipeline, options)

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
   * Projects FindOne
   * ******************
   * @name findOne
   * @route  GET /projects/:id
   * @type 
   * @description 
   * ******************
   * 
   */
  findOne = async (req, res) => {
    const querySchema = {
      _id: req.params.id,
    }

    const data = await this.ProjectsServices.findOne(querySchema)
    if (!data) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this admin'), this.ERROR_CODES.CAN_NOT_FIND, this.STATUS_CODES.NOT_FOUND)
    res.json({
      data: data,
      success: true,
      message: this.SUCCESS_MESSAGES.RETRIEVED_SUCCESSFULLY('Projects')
    })
  };

}