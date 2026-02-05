const mongoose = require("mongoose");
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

  senderName: {
    type: String,
    required: false,
  },
  senderEmail: {
    type: String,
    required: false,
  },
  recipientEmail: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  subject: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    enum: ['contact', 'booking', 'recruitment', 'system', 'other'],
    default: 'other',
  },
  direction: {
    type: String,
    enum: ['outbound', 'inbound'],
    default: 'outbound',
  },
  read: {
    type: Boolean,
    default: false,
  },
  starred: {
    type: Boolean,
    default: false,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['sent', 'failed', 'pending'],
    default: 'pending',
  },
  template: {
    type: String,
    required: false,
  },
  parentMessage: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Message"
  },
  attachments: [{
    name: { type: String },
    url: { type: String }
  }],
}, {
  timestamps: true
});

const dateFields = [];

Schema.plugin(softDeletePlugin);

Schema.post("find", async function(docs, next) {
  if (docs && Array.isArray(docs)) {
    for (const item of docs) {
      if (item) {
        helperMethod.dateFieldsFormatAlgo(item, dateFields);
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

module.exports = mongoose.model("Message", Schema);
