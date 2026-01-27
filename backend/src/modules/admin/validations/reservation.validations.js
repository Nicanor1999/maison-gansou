/**
 * @ReservationValidations 
 */

const Joi = require("@hapi/joi");
module.exports = class ReservationValidations {

  constructor() {

  }
  /**
   * CreateValidation 
   */
  static CreateValidation(data) {
    const validationSchema = {
      createdBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').allow(null),
      updatedBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').allow(null),
      deletedBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').allow(null),
      lastNameClient: Joi.string().allow('').allow(null),
      firstNameClient: Joi.string().allow('').allow(null),
      email: Joi.string().allow('').allow(null),
      country: Joi.string().allow('').allow(null),
      phone: Joi.string().allow('').allow(null),
      arrivalDate: Joi.string().allow('').allow(null),
      startDate: Joi.string().allow('').allow(null),
      personNumber: Joi.number().allow('').allow(null),
      clientMessage: Joi.string().allow('').allow(null),
      paymentMode: Joi.string().allow('').allow(null),
      offer: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    }


    const schema = Joi.object(validationSchema);

    return schema.validate(data);
  }
  /**
   * UpdateValidation 
   */
  static UpdateValidation(data) {
    const validationSchema = {
      createdBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').allow(null),
      updatedBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').allow(null),
      deletedBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').allow(null),
      lastNameClient: Joi.string().allow('').allow(null),
      firstNameClient: Joi.string().allow('').allow(null),
      email: Joi.string().allow('').allow(null),
      country: Joi.string().allow('').allow(null),
      phone: Joi.string().allow('').allow(null),
      arrivalDate: Joi.string().allow('').allow(null),
      startDate: Joi.string().allow('').allow(null),
      personNumber: Joi.number().allow('').allow(null),
      clientMessage: Joi.string().allow('').allow(null),
      paymentMode: Joi.string().allow('').allow(null),
      offer: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').allow(null),
    }


    const schema = Joi.object(validationSchema);

    return schema.validate(data);
  }

}