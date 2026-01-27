/**
 * @OfferValidations 
 */

const Joi = require("@hapi/joi");
module.exports = class OfferValidations {

  constructor() {

  }
  /**
   * CreateValidation 
   */
  static CreateValidation(data) {
    const validationSchema = {
      nightlyPrice: Joi.string().allow('').allow(null),
      title: Joi.string().allow('').allow(null),
      bio: Joi.string().allow('').allow(null),
      bedNumber: Joi.string().allow('').allow(null),
      town: Joi.string().allow('').allow(null),
      roomNumber: Joi.string().allow('').allow(null),
      availability: Joi.boolean().allow('').allow(null),
      kitchenNumber: Joi.string().allow('').allow(null),
      parking: Joi.boolean().allow('').allow(null),
      washingName: Joi.boolean().allow('').allow(null),
      wifi: Joi.boolean().allow('').allow(null),
      ac: Joi.boolean().allow('').allow(null),
      security: Joi.boolean().allow('').allow(null),
    }


    const schema = Joi.object(validationSchema);

    return schema.validate(data);
  }
  /**
   * UpdateValidation 
   */
  static UpdateValidation(data) {
    const validationSchema = {
      nightlyPrice: Joi.string().allow('').allow(null),
      title: Joi.string().allow('').allow(null),
      bio: Joi.string().allow('').allow(null),
      bedNumber: Joi.string().allow('').allow(null),
      town: Joi.string().allow('').allow(null),
      roomNumber: Joi.string().allow('').allow(null),
      availability: Joi.boolean().allow('').allow(null),
      kitchenNumber: Joi.string().allow('').allow(null),
      parking: Joi.boolean().allow('').allow(null),
      washingName: Joi.boolean().allow('').allow(null),
      wifi: Joi.boolean().allow('').allow(null),
      ac: Joi.boolean().allow('').allow(null),
      security: Joi.boolean().allow('').allow(null),
    }


    const schema = Joi.object(validationSchema);

    return schema.validate(data);
  }

}