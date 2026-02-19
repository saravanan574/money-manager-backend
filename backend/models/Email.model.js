
const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  messageId: {
    type: String,
    required: true,
    unique: true,
  },
  threadId: String,
  subject: {
    type: String,
    required: true,
  },
  from: {
    email: String,
    name: String,
  },
  to: [{
    email: String,
    name: String,
  }],
  date: {
    type: Date,
    required: true,
    index: true,
  },
  snippet: String,
  textBody: String,
  htmlBody: String,
  attachments: [{
    filename: String,
    mimeType: String,
    size: Number,
    attachmentId: String,
  }],
  category: {
    type: String,
    enum: ['internship', 'fulltime', 'interview', 'shortlist', 'rejection', 'offer', 'deadline', 'assessment', 'general', 'unclassified'],
    default: 'unclassified',
    index: true
  },
  isPlacementRelated: {
    type: Boolean,
    default: false,
    index: true,
  },
  isProcessed: {
    type: Boolean,
    default: false,
  },
  processedAt: Date,
  extractedInfo: {
    companyName: String,
    jobRole: String,
    deadline: Date,
    requiredSkills: [String],
    minCGPA: Number,
    minTenthPercent: Number,
    minTwelfthPercent: Number,
    maxBacklogs: Number,
    departments: [String],
  },
}, { timestamps: true });

module.exports = mongoose.model('Email', EmailSchema);
