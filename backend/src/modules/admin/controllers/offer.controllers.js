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
      const PicturesFields = req.files ? req.files : []
      const PicturesPaths = []
      for (const field of PicturesFields) {
        PicturesPaths.push(field.path);
      }

      payload.Pictures = PicturesPaths;
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

    if (req.files) {
      const PicturesFields = req.files ? req.files : []
      const PicturesPaths = []
      for (const field of PicturesFields) {
        PicturesPaths.push(field.path);
      }

      payload.Pictures = PicturesPaths;
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
    if (query.Nightly_Price) {
      querySchema.push({
        Nightly_Price: Number(query.Nightly_Price)
      })
    }
    if (query.Nightly_PriceLessThanOrEqualTo) {
      querySchema.push({
        Nightly_Price: {
          $lte: Number(query.Nightly_PriceLessThanOrEqualTo)
        }
      })

    } else if (query.Nightly_PriceLessThan) {
      querySchema.push({
        Nightly_Price: {
          $lt: Number(query.Nightly_PriceLessThan)
        }
      })
    }
    if (query.Nightly_PriceGreaterThanOrEqualTo) {
      querySchema.push({
        Nightly_Price: {
          $gte: Number(query.Nightly_PriceGreaterThanOrEqualTo)
        }
      })
    } else if (query.Nightly_PriceGreaterThan) {
      querySchema.push({
        Nightly_Price: {
          $gt: Number(query.Nightly_PriceGreaterThan)
        }
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
    if (query.Bio) {
      querySchema.push({
        Bio: {
          $regex: ".*" + query.Bio + ".*",
          $options: "i",
        }
      })

    }
    if (query.Bed_Number) {
      querySchema.push({
        Bed_Number: Number(query.Bed_Number)
      })
    }
    if (query.Bed_NumberLessThanOrEqualTo) {
      querySchema.push({
        Bed_Number: {
          $lte: Number(query.Bed_NumberLessThanOrEqualTo)
        }
      })

    } else if (query.Bed_NumberLessThan) {
      querySchema.push({
        Bed_Number: {
          $lt: Number(query.Bed_NumberLessThan)
        }
      })
    }
    if (query.Bed_NumberGreaterThanOrEqualTo) {
      querySchema.push({
        Bed_Number: {
          $gte: Number(query.Bed_NumberGreaterThanOrEqualTo)
        }
      })
    } else if (query.Bed_NumberGreaterThan) {
      querySchema.push({
        Bed_Number: {
          $gt: Number(query.Bed_NumberGreaterThan)
        }
      })
    }
    if (query.Town) {
      querySchema.push({
        Town: {
          $regex: ".*" + query.Town + ".*",
          $options: "i",
        }
      })

    }
    if (query.Room_Number) {
      querySchema.push({
        Room_Number: Number(query.Room_Number)
      })
    }
    if (query.Room_NumberLessThanOrEqualTo) {
      querySchema.push({
        Room_Number: {
          $lte: Number(query.Room_NumberLessThanOrEqualTo)
        }
      })

    } else if (query.Room_NumberLessThan) {
      querySchema.push({
        Room_Number: {
          $lt: Number(query.Room_NumberLessThan)
        }
      })
    }
    if (query.Room_NumberGreaterThanOrEqualTo) {
      querySchema.push({
        Room_Number: {
          $gte: Number(query.Room_NumberGreaterThanOrEqualTo)
        }
      })
    } else if (query.Room_NumberGreaterThan) {
      querySchema.push({
        Room_Number: {
          $gt: Number(query.Room_NumberGreaterThan)
        }
      })
    }
    if (query.Availability == 'true') {
      querySchema.push({
        Availability: true
      })
    }
    if (query.Availability == 'false') {
      querySchema.push({
        Availability: false
      })
    }
    if (query.Kitchen_Number) {
      querySchema.push({
        Kitchen_Number: Number(query.Kitchen_Number)
      })
    }
    if (query.Kitchen_NumberLessThanOrEqualTo) {
      querySchema.push({
        Kitchen_Number: {
          $lte: Number(query.Kitchen_NumberLessThanOrEqualTo)
        }
      })

    } else if (query.Kitchen_NumberLessThan) {
      querySchema.push({
        Kitchen_Number: {
          $lt: Number(query.Kitchen_NumberLessThan)
        }
      })
    }
    if (query.Kitchen_NumberGreaterThanOrEqualTo) {
      querySchema.push({
        Kitchen_Number: {
          $gte: Number(query.Kitchen_NumberGreaterThanOrEqualTo)
        }
      })
    } else if (query.Kitchen_NumberGreaterThan) {
      querySchema.push({
        Kitchen_Number: {
          $gt: Number(query.Kitchen_NumberGreaterThan)
        }
      })
    }
    if (query.Parking == 'true') {
      querySchema.push({
        Parking: true
      })
    }
    if (query.Parking == 'false') {
      querySchema.push({
        Parking: false
      })
    }
    if (query.Washing_Name == 'true') {
      querySchema.push({
        Washing_Name: true
      })
    }
    if (query.Washing_Name == 'false') {
      querySchema.push({
        Washing_Name: false
      })
    }
    if (query.Wifi == 'true') {
      querySchema.push({
        Wifi: true
      })
    }
    if (query.Wifi == 'false') {
      querySchema.push({
        Wifi: false
      })
    }
    if (query.AC == 'true') {
      querySchema.push({
        AC: true
      })
    }
    if (query.AC == 'false') {
      querySchema.push({
        AC: false
      })
    }
    if (query.Security == 'true') {
      querySchema.push({
        Security: true
      })
    }
    if (query.Security == 'false') {
      querySchema.push({
        Security: false
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