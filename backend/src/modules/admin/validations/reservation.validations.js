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
      Nom_Client: Joi.string().allow('').allow(null),
      Prenom_Client: Joi.string().allow('').allow(null),
      Email: Joi.string().allow('').allow(null),
      Country: Joi.string().allow('').allow(null),
      Phone: Joi.string().allow('').allow(null),
      Arrival_Date: Joi.string().allow('').allow(null),
      Start_Date: Joi.string().allow('').allow(null),
      Person_Number: Joi.number().allow('').allow(null),
      Client_Message: Joi.string().allow('').allow(null),
      Payment_Mode: Joi.string().allow('').allow(null),
      Offer: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
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
      Nom_Client: Joi.string().allow('').allow(null),
      Prenom_Client: Joi.string().allow('').allow(null),
      Email: Joi.string().allow('').allow(null),
      Country: Joi.string().allow('').allow(null),
      Phone: Joi.string().allow('').allow(null),
      Arrival_Date: Joi.string().allow('').allow(null),
      Start_Date: Joi.string().allow('').allow(null),
      Person_Number: Joi.number().allow('').allow(null),
      Client_Message: Joi.string().allow('').allow(null),
      Payment_Mode: Joi.string().allow('').allow(null),
      Offer: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').allow(null),
    }


    const schema = Joi.object(validationSchema);

    return schema.validate(data);
  }

}