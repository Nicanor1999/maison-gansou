/**
 * @ProjectsValidations 
 */

const Joi = require("@hapi/joi");
module.exports = class ProjectsValidations {

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
      Title: Joi.string().allow('').allow(null),
      Country: Joi.string().allow('').allow(null),
      Town: Joi.string().allow('').allow(null),
      Services: Joi.string().allow('').allow(null),
      Works_Type: Joi.string().allow('').allow(null),
      Partners: Joi.array().allow('').allow(null),
      Section: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').allow(null),
      Status: Joi.boolean().allow('').allow(null),
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
      Title: Joi.string().allow('').allow(null),
      Country: Joi.string().allow('').allow(null),
      Town: Joi.string().allow('').allow(null),
      Services: Joi.string().allow('').allow(null),
      Works_Type: Joi.string().allow('').allow(null),
      Partners: Joi.array().allow('').allow(null),
      Section: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').allow(null),
      Status: Joi.boolean().allow('').allow(null),
    }


    const schema = Joi.object(validationSchema);

    return schema.validate(data);
  }

}