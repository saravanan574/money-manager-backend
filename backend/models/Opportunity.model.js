
const mongoose = require('mongoose');

const CheckSchema = new mongoose.Schema({
  required: mongoose.Schema.Types.Mixed,
  userValue: mongoose.Schema.Types.Mixed,
  passed: Boolean
}, { _id: false });

const OpportunitySchema = new mongoose.Schema({
  emailId: { type: mongoose.Schema.Types.ObjectId, ref: 'Email', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  companyName: { type: String, required: true },
  jobRole: { type: String, required: true },
  jobType: { type: String, enum: ['internship', 'fulltime', 'contract'], required: true },
  location: String,
  salary: String,
  deadline: { type: Date, index: true },
  eligibilityResult: {
    isEligible: Boolean,
    cgpaCheck: CheckSchema,
    tenthCheck: CheckSchema,
    twelfthCheck: CheckSchema,
    backlogCheck: CheckSchema,
    departmentCheck: CheckSchema,
    failedReasons: [String]
  },
  matchScore: { type: Number, min: 0, max: 100, index: true },
  matchedSkills: [String],
  missingSkills: [String],
  isRecommended: { type: Boolean, index: true },
  applicationStatus: {
    type: String,
    enum: ['not_applied', 'applied', 'shortlisted', 'test_scheduled', 'interview_scheduled', 'offered', 'rejected', 'accepted', 'declined'],
    default: 'not_applied'
  },
  isOptedIn: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Opportunity', OpportunitySchema);
