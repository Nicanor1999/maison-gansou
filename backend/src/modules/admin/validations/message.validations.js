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

  /**
   * ContactFormValidation (Public - No Auth Required)
   */
  static ContactFormValidation(data) {
    const validationSchema = {
      senderName: Joi.string().required().messages({
        'string.empty': 'Le nom est requis',
        'any.required': 'Le nom est requis'
      }),
      senderEmail: Joi.string().email().required().messages({
        'string.email': 'Email invalide',
        'string.empty': 'L\'email est requis',
        'any.required': 'L\'email est requis'
      }),
      phone: Joi.string().allow('', null),
      subject: Joi.string().required().messages({
        'string.empty': 'Le sujet est requis',
        'any.required': 'Le sujet est requis'
      }),
      content: Joi.string().required().messages({
        'string.empty': 'Le message est requis',
        'any.required': 'Le message est requis'
      }),
    }

    const schema = Joi.object(validationSchema);
    return schema.validate(data);
  }

}
