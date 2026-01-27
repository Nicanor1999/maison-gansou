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

  nightlyPrice: {
    type: Number,
    required: false,
  },

  pictures: {
    type: Array,
    required: false,
    _isFileReference: true,
  },

  title: {
    type: String,
    required: false,
  },

  bio: {
    type: String,
    required: false,
  },

  bedNumber: {
    type: Number,
    required: false,
  },

  town: {
    type: String,
    required: false,
  },

  roomNumber: {
    type: Number,
    required: false,
  },

  availability: {
    type: Boolean,
    required: false,
  },

  kitchenNumber: {
    type: Number,
    required: false,
  },

  parking: {
    type: Boolean,
    required: false,
  },

  washingName: {
    type: Boolean,
    required: false,
  },

  wifi: {
    type: Boolean,
    required: false,
  },

  ac: {
    type: Boolean,
    required: false,
  },

  security: {
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