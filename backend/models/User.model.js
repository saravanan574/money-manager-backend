
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  techStack: String,
  description: String
});

const InternshipSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: String,
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  registerNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 20,
  },
  loginEmail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  college: {
    type: String,
    required: true,
    trim: true
  },
  degree: {
    type: String,
    required: true,
    enum: ['B.Tech', 'M.Tech', 'MCA', 'MBA', 'B.E', 'M.E', 'B.Sc', 'M.Sc']
  },
  department: {
    type: String,
    required: true,
    enum: ['CSE', 'IT', 'ECE', 'MECH', 'CIVIL', 'EEE', 'CHEM', 'BT', 'Other']
  },
  year: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4]
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[6-9]\d{9}$/, 'Please fill a valid 10-digit phone number'],
    default: null
  },
  collegeEmail: {
    type: String,
    trim: true,
    lowercase: true,
    default: null
  },
  tenthPercentage: { type: Number, min: 0, max: 100, default: null },
  twelfthPercentage: { type: Number, min: 0, max: 100, default: null },
  currentCGPA: { type: Number, min: 0, max: 10, default: null },
  numberOfBacklogs: { type: Number, default: 0, min: 0 },
  activeBacklogs: { type: Number, default: 0, min: 0 },
  skills: { type: [String], default: [] },
  certifications: { type: [String], default: [] },
  projects: { type: [ProjectSchema], default: [] },
  internships: { type: [InternshipSchema], default: [] },
  resumeUrl: String,
  linkedinUrl: String,
  githubUrl: String,
  googleAccount: {
    email: String,
    accessToken: { type: String, select: false },
    refreshToken: { type: String, select: false },
    isConnected: { type: Boolean, default: false },
    lastSyncedAt: Date,
  },
  notifications: {
    email: { type: Boolean, default: true },
    deadlineReminder: { type: Boolean, default: true },
    shortlistAlert: { type: Boolean, default: true },
    reminderDays: { type: Number, default: 3, enum: [1, 3, 7] },
  },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
