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

  title: {
    type: String,
    required: false,
  },

  coverImage: {
    type: String,
    required: false,
  },

  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tags"
  }],

  sections: [{
    type: { type: String, enum: ['main-page', 'bio', 'full-text', 'full-image', 'text-image', 'image-text', 'double-image'] },
    order: { type: Number },
    title: { type: String },
    content: { type: String },
    image: { type: String },
    alt: { type: String },
    leftImage: { type: String },
    rightImage: { type: String },
    leftAlt: { type: String },
    rightAlt: { type: String },
    images: [{ type: String }],
    headline: { type: String },
    buttonText: { type: String },
    // Bio specific field
    partners: { type: String },
  }],

  status: {
    type: Boolean,
    required: false,
    default: false,
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


module.exports = mongoose.model("Article", Schema);