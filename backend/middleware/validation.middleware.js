
const { body, validationResult } = require('express-validator');
const { sendError } = require('../utils/responseHelper');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 400, 'Validation Error', errors.array());
  }
  next();
};

const registerValidation = [
  body('name', 'Full Name is required').not().isEmpty().trim().escape(),
  body('registerNumber', 'Register Number is required').not().isEmpty().trim().escape(),
  body('loginEmail', 'Please include a valid email').isEmail().normalizeEmail(),
  body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),
  body('college', 'College Name is required').not().isEmpty().trim().escape(),
  body('degree', 'Degree is required').not().isEmpty(),
  body('department', 'Department is required').not().isEmpty(),
  body('year', 'Year of study is required').isNumeric(),
  body('phone').optional({ checkFalsy: true }).isMobilePhone('en-IN').withMessage('Must be a valid Indian phone number'),
  body('tenthPercentage').optional({ checkFalsy: true }).isFloat({ min: 0, max: 100 }).withMessage('Must be a number between 0 and 100'),
  body('twelfthPercentage').optional({ checkFalsy: true }).isFloat({ min: 0, max: 100 }).withMessage('Must be a number between 0 and 100'),
  body('currentCGPA').optional({ checkFalsy: true }).isFloat({ min: 0, max: 10 }).withMessage('Must be a number between 0 and 10'),
  handleValidationErrors
];

const loginValidation = [
  body('email', 'Please include a valid email').isEmail().normalizeEmail(),
  body('password', 'Password is required').exists(),
  handleValidationErrors
];

module.exports = {
  registerValidation,
  loginValidation,
};
