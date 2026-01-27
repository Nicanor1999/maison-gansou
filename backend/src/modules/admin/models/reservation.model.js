const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const slug = require('mongoose-slug-generator');
const softDeletePlugin = require('../../../shared/plugins/softDeletePlugin');
const helperMethod = new(require("../../../shared/utils/helper.utils"))();


const Schema = new mongoose.Schema({

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },

  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },

  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },

  lastNameClient: {
    type: String,
    required: false,
  },

  firstNameClient: {
    type: String,
    required: false,
  },

  email: {
    type: String,
    required: false,
  },

  country: {
    type: String,
    required: false,
  },

  phone: {
    type: String,
    required: false,
  },

  arrivalDate: {
    type: String,
    required: false,
  },

  startDate: {
    type: String,
    required: false,
  },

  personNumber: {
    type: Number,
    required: false,
  },

  clientMessage: {
    type: String,
    required: false,
  },

  paymentMode: {
    type: String,
    required: false,
  },

  offer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Offer"
  },
}, {
  timestamps: true
});

const dateFields = [];

Schema.plugin(slug);
Schema.plugin(uniqueValidator, {
  message: '{PATH} already exists.'
});
Schema.plugin(softDeletePlugin);

Schema.post("find", async function(docs, next) {
  if (docs && Array.isArray(docs)) {
    for (const item of docs) {
      if (item) {
        helperMethod.dateFieldsFormatAlgo(item, dateFields); // Added await
      }
    }
  }
  if (typeof next === 'function') {
    next();
  }
});

Schema.post("findOne", async function(doc, next) {
  if (doc) {
    helperMethod.dateFieldsFormatAlgo(doc, dateFields);
  }
  if (typeof next === 'function') {
    next();
  }
});


module.exports = mongoose.model("Reservation", Schema);