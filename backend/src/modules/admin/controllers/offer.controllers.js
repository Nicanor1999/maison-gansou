/**
 * @OfferController 
 */

const CoreServices = require("../../../shared/services/core.services")
module.exports = class OfferController extends CoreServices {

  constructor() {
    super()

    this.OfferServices = new(require("../../admin/services/offer.services"))();
    this.OfferValidations = require("../../admin/validations/offer.validations");
  }
  /**
   * Offer Create
   * ******************
   * @name create
   * @route  POST /offer
   * @type 
   * @description 
   * ******************
   * 
   */
  create = async (req, res) => {
    // Validate data
    const {
      error
    } = this.OfferValidations.CreateValidation(req.body);
    if (error) throw new this.ValidationError(error.details[0].message);

    const profile = req.admin;


    const payload = {
      ...req.body
    }

    if (req.files) {
      const picturesFields = req.files ? req.files : []
      const picturesPaths = []
      for (const field of picturesFields) {
        picturesPaths.push(field.path);
      }
      payload.pictures = picturesPaths;
    }



    const save = await this.OfferServices.create(payload, profile);

    res.json({
      data: save,
      success: true,
      message: this.SUCCESS_MESSAGES.CREATED_SUCCESSFULLY('Offer')
    })
  };
  /**
   * Offer Update
   * ******************
   * @name update
   * @route  PUT /offer/:id
   * @type 
   * @description 
   * ******************
   * 
   */
  update = async (req, res) => {
    // Validate data
    const {
      error
    } = this.OfferValidations.UpdateValidation(req.body);
    if (error) throw new this.ValidationError(error.details[0].message);

    const profile = req.admin;

    const query = {
      _id: req.params.id,
      createdBy: profile._id
    }


    const payload = {
      ...req.body
    }

    // Only update pictures if new files were uploaded
    if (req.files && req.files.length > 0) {
      const picturesPaths = []
      for (const field of req.files) {
        picturesPaths.push(field.path);
      }
      payload.pictures = picturesPaths;
    }

    const offer = await this.OfferServices.update(query, payload, profile);

    res.json({
      data: offer,
      success: true,
      message: this.SUCCESS_MESSAGES.UPDATED_SUCCESSFULLY('Offer')
    })
  };
  /**
   * Offer Delete
   * ******************
   * @route  DELETE /offer/:id
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

    const data = await this.OfferServices.delete(query, profile)

    res.json({
      data: data,
      success: true,
      message: this.SUCCESS_MESSAGES.DELETED_SUCCESSFULLY('Offer')
    })
  };
  /**
   * Offer FindAll
   * ******************
   * @name findAll
   * @route  GET /offer
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
      route: "/offer",
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
    if (query.nightlyPrice) {
      querySchema.push({ nightlyPrice: Number(query.nightlyPrice) })
    }
    if (query.nightlyPriceLessThanOrEqualTo) {
      querySchema.push({ nightlyPrice: { $lte: Number(query.nightlyPriceLessThanOrEqualTo) } })
    } else if (query.nightlyPriceLessThan) {
      querySchema.push({ nightlyPrice: { $lt: Number(query.nightlyPriceLessThan) } })
    }
    if (query.nightlyPriceGreaterThanOrEqualTo) {
      querySchema.push({ nightlyPrice: { $gte: Number(query.nightlyPriceGreaterThanOrEqualTo) } })
    } else if (query.nightlyPriceGreaterThan) {
      querySchema.push({ nightlyPrice: { $gt: Number(query.nightlyPriceGreaterThan) } })
    }
    if (query.title) {
      querySchema.push({ title: { $regex: ".*" + query.title + ".*", $options: "i" } })
    }
    if (query.bio) {
      querySchema.push({ bio: { $regex: ".*" + query.bio + ".*", $options: "i" } })
    }
    if (query.bedNumber) {
      querySchema.push({ bedNumber: Number(query.bedNumber) })
    }
    if (query.bedNumberLessThanOrEqualTo) {
      querySchema.push({ bedNumber: { $lte: Number(query.bedNumberLessThanOrEqualTo) } })
    } else if (query.bedNumberLessThan) {
      querySchema.push({ bedNumber: { $lt: Number(query.bedNumberLessThan) } })
    }
    if (query.bedNumberGreaterThanOrEqualTo) {
      querySchema.push({ bedNumber: { $gte: Number(query.bedNumberGreaterThanOrEqualTo) } })
    } else if (query.bedNumberGreaterThan) {
      querySchema.push({ bedNumber: { $gt: Number(query.bedNumberGreaterThan) } })
    }
    if (query.town) {
      querySchema.push({ town: { $regex: ".*" + query.town + ".*", $options: "i" } })
    }
    if (query.roomNumber) {
      querySchema.push({ roomNumber: Number(query.roomNumber) })
    }
    if (query.roomNumberLessThanOrEqualTo) {
      querySchema.push({ roomNumber: { $lte: Number(query.roomNumberLessThanOrEqualTo) } })
    } else if (query.roomNumberLessThan) {
      querySchema.push({ roomNumber: { $lt: Number(query.roomNumberLessThan) } })
    }
    if (query.roomNumberGreaterThanOrEqualTo) {
      querySchema.push({ roomNumber: { $gte: Number(query.roomNumberGreaterThanOrEqualTo) } })
    } else if (query.roomNumberGreaterThan) {
      querySchema.push({ roomNumber: { $gt: Number(query.roomNumberGreaterThan) } })
    }
    if (query.availability == 'true') {
      querySchema.push({ availability: true })
    }
    if (query.availability == 'false') {
      querySchema.push({ availability: false })
    }
    if (query.kitchenNumber) {
      querySchema.push({ kitchenNumber: Number(query.kitchenNumber) })
    }
    if (query.kitchenNumberLessThanOrEqualTo) {
      querySchema.push({ kitchenNumber: { $lte: Number(query.kitchenNumberLessThanOrEqualTo) } })
    } else if (query.kitchenNumberLessThan) {
      querySchema.push({ kitchenNumber: { $lt: Number(query.kitchenNumberLessThan) } })
    }
    if (query.kitchenNumberGreaterThanOrEqualTo) {
      querySchema.push({ kitchenNumber: { $gte: Number(query.kitchenNumberGreaterThanOrEqualTo) } })
    } else if (query.kitchenNumberGreaterThan) {
      querySchema.push({ kitchenNumber: { $gt: Number(query.kitchenNumberGreaterThan) } })
    }
    if (query.parking == 'true') {
      querySchema.push({ parking: true })
    }
    if (query.parking == 'false') {
      querySchema.push({ parking: false })
    }
    if (query.washingName == 'true') {
      querySchema.push({ washingName: true })
    }
    if (query.washingName == 'false') {
      querySchema.push({ washingName: false })
    }
    if (query.wifi == 'true') {
      querySchema.push({ wifi: true })
    }
    if (query.wifi == 'false') {
      querySchema.push({ wifi: false })
    }
    if (query.ac == 'true') {
      querySchema.push({ ac: true })
    }
    if (query.ac == 'false') {
      querySchema.push({ ac: false })
    }
    if (query.security == 'true') {
      querySchema.push({ security: true })
    }
    if (query.security == 'false') {
      querySchema.push({ security: false })
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


    const output = await this.OfferServices.getPaginatedList(pipeline, options)

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
   * Offer FindOne
   * ******************
   * @name findOne
   * @route  GET /offer/:id
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

    const data = await this.OfferServices.findOne(querySchema)
    if (!data) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this admin'), this.ERROR_CODES.CAN_NOT_FIND, this.STATUS_CODES.NOT_FOUND)
    res.json({
      data: data,
      success: true,
      message: this.SUCCESS_MESSAGES.RETRIEVED_SUCCESSFULLY('Offer')
    })
  };

}