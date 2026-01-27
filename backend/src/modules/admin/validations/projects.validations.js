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
      title: Joi.string().allow('').allow(null),
      country: Joi.string().allow('').allow(null),
      town: Joi.string().allow('').allow(null),
      services: Joi.string().allow('').allow(null),
      worksType: Joi.string().allow('').allow(null),
      partners: Joi.array().allow('').allow(null),
      section: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').allow(null),
      status: Joi.boolean().allow('').allow(null),
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
      title: Joi.string().allow('').allow(null),
      country: Joi.string().allow('').allow(null),
      town: Joi.string().allow('').allow(null),
      services: Joi.string().allow('').allow(null),
      worksType: Joi.string().allow('').allow(null),
      partners: Joi.array().allow('').allow(null),
      section: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').allow(null),
      status: Joi.boolean().allow('').allow(null),
    }


    const schema = Joi.object(validationSchema);

    return schema.validate(data);
  }

}