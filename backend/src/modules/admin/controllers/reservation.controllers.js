/**
 * @ReservationController 
 */

const CoreServices = require("../../../shared/services/core.services")
module.exports = class ReservationController extends CoreServices {

  constructor() {
    super()

    this.ReservationServices = new(require("../../admin/services/reservation.services"))();
    this.ReservationValidations = require("../../admin/validations/reservation.validations");
  }
  /**
   * Reservation Create
   * ******************
   * @name create
   * @route  POST /reservation
   * @type 
   * @description 
   * ******************
   * 
   */
  create = async (req, res) => {
    // Validate data
    const {
      error
    } = this.ReservationValidations.CreateValidation(req.body);
    if (error) throw new this.ValidationError(error.details[0].message);


    const payload = {
      ...req.body
    }

    const save = await this.ReservationServices.create(payload);

    res.json({
      data: save,
      success: true,
      message: this.SUCCESS_MESSAGES.CREATED_SUCCESSFULLY('Reservation')
    })
  };
  /**
   * Reservation Update
   * ******************
   * @name update
   * @route  PUT /reservation/:id
   * @type 
   * @description 
   * ******************
   * 
   */
  update = async (req, res) => {
    // Validate data
    const {
      error
    } = this.ReservationValidations.UpdateValidation(req.body);
    if (error) throw new this.ValidationError(error.details[0].message);
    const query = {
      _id: req.params.id,

    }


    const payload = {
      ...req.body
    }


    const reservation = await this.ReservationServices.update(query, payload);

    res.json({
      data: reservation,
      success: true,
      message: this.SUCCESS_MESSAGES.UPDATED_SUCCESSFULLY('Reservation')

    })
  };
  /**
   * Reservation Delete
   * ******************
   * @name delete
   * @route  DELETE /reservation/:id
   * @type 
   * @description 
   * ******************
   * 
   */
  delete = async (req, res) => {
    const query = {
      _id: req.params.id,
    }

    const data = await this.ReservationServices.delete(query)
    res.json({
      success: true,
      data,
      message: this.SUCCESS_MESSAGES.DELETED_SUCCESSFULLY('Category')
    })
  };
  /**
   * Reservation findAll
   * ******************
   * @name findAll
   * @route  GET /reservation
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
      route: "/reservation",
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
    if (query.Nom_Client) {
      querySchema.push({
        Nom_Client: {
          $regex: ".*" + query.Nom_Client + ".*",
          $options: "i",
        }
      })

    }
    if (query.Prenom_Client) {
      querySchema.push({
        Prenom_Client: {
          $regex: ".*" + query.Prenom_Client + ".*",
          $options: "i",
        }
      })

    }
    if (query.Email) {
      querySchema.push({
        Email: {
          $regex: ".*" + query.Email + ".*",
          $options: "i",
        }
      })

    }
    if (query.Country) {
      querySchema.push({
        Country: {
          $regex: ".*" + query.Country + ".*",
          $options: "i",
        }
      })

    }
    if (query.Phone) {
      querySchema.push({
        Phone: {
          $regex: ".*" + query.Phone + ".*",
          $options: "i",
        }
      })

    }
    if (query.Arrival_Date) {
      querySchema.push({
        Arrival_Date: {
          $regex: ".*" + query.Arrival_Date + ".*",
          $options: "i",
        }
      })

    }
    if (query.Start_Date) {
      querySchema.push({
        Start_Date: {
          $regex: ".*" + query.Start_Date + ".*",
          $options: "i",
        }
      })

    }
    if (query.Person_Number) {
      querySchema.push({
        Person_Number: Number(query.Person_Number)
      })
    }
    if (query.Person_NumberLessThanOrEqualTo) {
      querySchema.push({
        Person_Number: {
          $lte: Number(query.Person_NumberLessThanOrEqualTo)
        }
      })

    } else if (query.Person_NumberLessThan) {
      querySchema.push({
        Person_Number: {
          $lt: Number(query.Person_NumberLessThan)
        }
      })
    }
    if (query.Person_NumberGreaterThanOrEqualTo) {
      querySchema.push({
        Person_Number: {
          $gte: Number(query.Person_NumberGreaterThanOrEqualTo)
        }
      })
    } else if (query.Person_NumberGreaterThan) {
      querySchema.push({
        Person_Number: {
          $gt: Number(query.Person_NumberGreaterThan)
        }
      })
    }
    if (query.Client_Message) {
      querySchema.push({
        Client_Message: {
          $regex: ".*" + query.Client_Message + ".*",
          $options: "i",
        }
      })

    }
    if (query.Payment_Mode) {
      querySchema.push({
        Payment_Mode: {
          $regex: ".*" + query.Payment_Mode + ".*",
          $options: "i",
        }
      })

    }
    if (query.Offer) {
      querySchema.push({
        ["Offer._id"]: this.HelperMethods.generateObjectId(query.Offer)
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


    const output = await this.ReservationServices.getPaginatedList(pipeline, options)

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
   * Reservation FindOne
   * ******************
   * @name findOne
   * @route  GET /reservation/:id
   * @type 
   * @description 
   * ******************
   * 
   */
  findOne = async (req, res) => {
    const querySchema = {
      _id: req.params.id,
    }

    const data = await this.ReservationServices.findOne(querySchema)
    if (!data) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this admin'), this.ERROR_CODES.CAN_NOT_FIND, this.STATUS_CODES.NOT_FOUND)
    res.json({
      data: data,
      success: true,
      message: this.SUCCESS_MESSAGES.RETRIEVED_SUCCESSFULLY('Reservation')
    })
  };

}