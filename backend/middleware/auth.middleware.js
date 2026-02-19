
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { sendError } = require('../utils/responseHelper');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return sendError(res, 401, 'Not authorized, token failed');
    }
  }

  if (!token) {
    return sendError(res, 401, 'Not authorized, no token');
  }
};

module.exports = { protect };
