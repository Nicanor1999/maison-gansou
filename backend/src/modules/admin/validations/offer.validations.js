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
    const booleanSchema = Joi.boolean().truthy('true').falsy('false').allow('').allow(null);
    const validationSchema = {
      nightlyPrice: Joi.string().allow('').allow(null),
      title: Joi.string().allow('').allow(null),
      bio: Joi.string().allow('').allow(null),
      bedNumber: Joi.string().allow('').allow(null),
      town: Joi.string().allow('').allow(null),
      roomNumber: Joi.string().allow('').allow(null),
      availability: booleanSchema,
      kitchenNumber: Joi.string().allow('').allow(null),
      parking: booleanSchema,
      washingName: booleanSchema,
      wifi: booleanSchema,
      ac: booleanSchema,
      security: booleanSchema,
    }


    const schema = Joi.object(validationSchema);

    return schema.validate(data);
  }
  /**
   * UpdateValidation 
   */
  static UpdateValidation(data) {
    const booleanSchema = Joi.boolean().truthy('true').falsy('false').allow('').allow(null);
    const validationSchema = {
      nightlyPrice: Joi.string().allow('').allow(null),
      title: Joi.string().allow('').allow(null),
      bio: Joi.string().allow('').allow(null),
      bedNumber: Joi.string().allow('').allow(null),
      town: Joi.string().allow('').allow(null),
      roomNumber: Joi.string().allow('').allow(null),
      availability: booleanSchema,
      kitchenNumber: Joi.string().allow('').allow(null),
      parking: booleanSchema,
      washingName: booleanSchema,
      wifi: booleanSchema,
      ac: booleanSchema,
      security: booleanSchema,
    }


    const schema = Joi.object(validationSchema);

    return schema.validate(data);
  }

}