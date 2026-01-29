/**
 * @PaymentValidations
 * FedaPay Payment Validations
 */

const Joi = require('@hapi/joi');

/**
 * Initiate Payment Validation
 */
const InitiatePaymentValidation = (data) => {
  const schema = Joi.object({
    reservationId: Joi.string().required().messages({
      'string.empty': 'Reservation ID is required',
      'any.required': 'Reservation ID is required'
    }),
    amount: Joi.number().positive().optional().messages({
      'number.positive': 'Amount must be a positive number'
    }),
    currency: Joi.string().valid('XOF', 'GNF', 'XAF').default('XOF').optional().messages({
      'any.only': 'Currency must be XOF, GNF, or XAF'
    }),
    email: Joi.string().email().optional().messages({
      'string.email': 'Please provide a valid email address'
    }),
    phone: Joi.string().optional(),
    phoneCountry: Joi.string().length(2).default('bj').optional().messages({
      'string.length': 'Phone country must be a 2-letter country code'
    })
  });

  return schema.validate(data);
};

/**
 * Callback Validation
 */
const CallbackValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().optional(),
    status: Joi.string().optional(),
    reference: Joi.string().optional(),
    amount: Joi.number().optional(),
    description: Joi.string().optional(),
    callback_url: Joi.string().optional(),
    created_at: Joi.string().optional(),
    updated_at: Joi.string().optional(),
    approved_at: Joi.string().optional().allow(null),
    canceled_at: Joi.string().optional().allow(null),
    declined_at: Joi.string().optional().allow(null),
    refunded_at: Joi.string().optional().allow(null),
    transferred_at: Joi.string().optional().allow(null),
    operator: Joi.string().optional().allow(null),
    mode: Joi.string().optional().allow(null),
    customer: Joi.object().optional(),
    currency: Joi.object().optional()
  }).unknown(true); // Allow unknown fields from FedaPay

  return schema.validate(data);
};

module.exports = {
  InitiatePaymentValidation,
  CallbackValidation
};
