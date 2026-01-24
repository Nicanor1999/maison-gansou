/**
 * @ArticleValidations 
 */

const Joi = require("@hapi/joi");
module.exports = class ArticleValidations {

  constructor() {

  }
  /**
   * CreateValidation 
   */
  static CreateValidation(data) {
    const validationSchema = {
      Tags: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').allow(null),
      Title: Joi.string().allow('').allow(null),
      Section: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').allow(null),
      Statut: Joi.boolean().allow('').allow(null),
    }


    const schema = Joi.object(validationSchema);

    return schema.validate(data);
  }
  /**
   * UpdateValidation 
   */
  static UpdateValidation(data) {
    const validationSchema = {
      Tags: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').allow(null),
      Title: Joi.string().allow('').allow(null),
      Section: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').allow(null),
      Statut: Joi.boolean().allow('').allow(null),
    }


    const schema = Joi.object(validationSchema);

    return schema.validate(data);
  }

}