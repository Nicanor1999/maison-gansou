const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const slug = require('mongoose-slug-generator');
const softDeletePlugin = require('../../../shared/plugins/softDeletePlugin');
const helperMethod = new(require("../../../shared/utils/helper.utils"))();


const Schema = new mongoose.Schema({

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Admin"
  },

  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Admin"
  },

  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Admin"
  },

  Nightly_Price: {
    type: Number,
    required: false,
  },

  Pictures: {
    type: Array,
    required: false,
    _isFileReference: true,
  },

  Title: {
    type: String,
    required: false,
  },

  Bio: {
    type: String,
    required: false,
  },

  Bed_Number: {
    type: Number,
    required: false,
  },

  Town: {
    type: String,
    required: false,
  },

  Room_Number: {
    type: Number,
    required: false,
  },

  Availability: {
    type: Boolean,
    required: false,
  },

  Kitchen_Number: {
    type: Number,
    required: false,
  },

  Parking: {
    type: Boolean,
    required: false,
  },

  Washing_Name: {
    type: Boolean,
    required: false,
  },

  Wifi: {
    type: Boolean,
    required: false,
  },

  AC: {
    type: Boolean,
    required: false,
  },

  Security: {
    type: Boolean,
    required: false,
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


module.exports = mongoose.model("Offer", Schema);