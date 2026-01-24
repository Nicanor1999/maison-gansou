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
      Nightly_Price: Joi.string().allow('').allow(null),
      Title: Joi.string().allow('').allow(null),
      Bio: Joi.string().allow('').allow(null),
      Bed_Number: Joi.string().allow('').allow(null),
      Town: Joi.string().allow('').allow(null),
      Room_Number: Joi.string().allow('').allow(null),
      Availability: Joi.boolean().allow('').allow(null),
      Kitchen_Number: Joi.string().allow('').allow(null),
      Parking: Joi.boolean().allow('').allow(null),
      Washing_Name: Joi.boolean().allow('').allow(null),
      Wifi: Joi.boolean().allow('').allow(null),
      AC: Joi.boolean().allow('').allow(null),
      Security: Joi.boolean().allow('').allow(null),
    }


    const schema = Joi.object(validationSchema);

    return schema.validate(data);
  }
  /**
   * UpdateValidation 
   */
  static UpdateValidation(data) {
    const validationSchema = {
      Nightly_Price: Joi.string().allow('').allow(null),
      Title: Joi.string().allow('').allow(null),
      Bio: Joi.string().allow('').allow(null),
      Bed_Number: Joi.string().allow('').allow(null),
      Town: Joi.string().allow('').allow(null),
      Room_Number: Joi.string().allow('').allow(null),
      Availability: Joi.boolean().allow('').allow(null),
      Kitchen_Number: Joi.string().allow('').allow(null),
      Parking: Joi.boolean().allow('').allow(null),
      Washing_Name: Joi.boolean().allow('').allow(null),
      Wifi: Joi.boolean().allow('').allow(null),
      AC: Joi.boolean().allow('').allow(null),
      Security: Joi.boolean().allow('').allow(null),
    }


    const schema = Joi.object(validationSchema);

    return schema.validate(data);
  }

}