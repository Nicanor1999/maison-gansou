/**
 * @MessageValidations
 */

const Joi = require("@hapi/joi");
module.exports = class MessageValidations {

  constructor() {

  }
  /**
   * UpdateValidation
   */
  static UpdateValidation(data) {
    const validationSchema = {
      read: Joi.boolean().allow(null),
      starred: Joi.boolean().allow(null),
      archived: Joi.boolean().allow(null),
    }

    const schema = Joi.object(validationSchema);
    return schema.validate(data);
  }
  /**
   * ReplyValidation
   */
  static ReplyValidation(data) {
    const validationSchema = {
      to: Joi.string().email().required(),
      subject: Joi.string().required(),
      content: Joi.string().required(),
    }

    const schema = Joi.object(validationSchema);
    return schema.validate(data);
  }

  /**
   * ComposeValidation
   */
  static ComposeValidation(data) {
    const validationSchema = {
      to: Joi.string().email().required(),
      subject: Joi.string().required(),
      content: Joi.string().required(),
      category: Joi.string().valid('contact', 'booking', 'recruitment', 'system', 'other').allow(null),
    }

    const schema = Joi.object(validationSchema);
    return schema.validate(data);
  }

}
