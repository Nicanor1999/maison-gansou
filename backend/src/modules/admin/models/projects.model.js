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

  Title: {
    type: String,
    required: false,
  },

  Country: {
    type: String,
    required: false,
  },

  Town: {
    type: String,
    required: false,
  },

  Services: {
    type: String,
    required: false,
  },

  Works_Type: {
    type: String,
    required: false,
  },

  Partners: {
    type: Array,
    required: false,
  },

  Section: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Section"
  },

  Status: {
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


module.exports = mongoose.model("Projects", Schema);