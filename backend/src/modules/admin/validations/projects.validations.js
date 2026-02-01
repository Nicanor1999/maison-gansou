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
      sections: Joi.array().items(Joi.object({
        type: Joi.string().valid('main-page', 'bio', 'full-text', 'full-image', 'text-image', 'image-text', 'double-image').allow('').allow(null),
        order: Joi.number().allow(null),
        title: Joi.string().allow('').allow(null),
        content: Joi.string().allow('').allow(null),
        image: Joi.string().allow('').allow(null),
        alt: Joi.string().allow('').allow(null),
        leftImage: Joi.string().allow('').allow(null),
        rightImage: Joi.string().allow('').allow(null),
        leftAlt: Joi.string().allow('').allow(null),
        rightAlt: Joi.string().allow('').allow(null),
        images: Joi.array().items(Joi.string().allow('').allow(null)).allow(null),
        headline: Joi.string().allow('').allow(null),
        buttonText: Joi.string().allow('').allow(null),
        servicesList: Joi.string().allow('').allow(null),
        workTypesList: Joi.string().allow('').allow(null),
      })).allow(null),
      projectType: Joi.string().valid('Commercial', 'Residential').allow('').allow(null),
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
      sections: Joi.array().items(Joi.object({
        type: Joi.string().valid('main-page', 'bio', 'full-text', 'full-image', 'text-image', 'image-text', 'double-image').allow('').allow(null),
        order: Joi.number().allow(null),
        title: Joi.string().allow('').allow(null),
        content: Joi.string().allow('').allow(null),
        image: Joi.string().allow('').allow(null),
        alt: Joi.string().allow('').allow(null),
        leftImage: Joi.string().allow('').allow(null),
        rightImage: Joi.string().allow('').allow(null),
        leftAlt: Joi.string().allow('').allow(null),
        rightAlt: Joi.string().allow('').allow(null),
        images: Joi.array().items(Joi.string().allow('').allow(null)).allow(null),
        headline: Joi.string().allow('').allow(null),
        buttonText: Joi.string().allow('').allow(null),
        servicesList: Joi.string().allow('').allow(null),
        workTypesList: Joi.string().allow('').allow(null),
      })).allow(null),
      projectType: Joi.string().valid('Commercial', 'Residential').allow('').allow(null),
      status: Joi.boolean().allow('').allow(null),
    }


    const schema = Joi.object(validationSchema);

    return schema.validate(data);
  }

}