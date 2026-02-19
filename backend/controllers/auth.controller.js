
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const { sendSuccess, sendError } = require('../utils/responseHelper');
const { getOAuth2Client, GMAIL_SCOPES } = require('../config/googleOAuth.config');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  const {
    name,
    registerNumber,
    loginEmail,
    password,
    college,
    degree,
    department,
    year,
    phone,
    collegeEmail,
    tenthPercentage,
    twelfthPercentage,
    currentCGPA
  } = req.body;

  try {
    const userExists = await User.findOne({ loginEmail });
    if (userExists) {
      return sendError(res, 400, 'User already exists with this email.');
    }

    const user = await User.create({
      name,
      registerNumber,
      loginEmail,
      password,
      college,
      degree,
      department,
      year,
      phone,
      collegeEmail,
      tenthPercentage,
      twelfthPercentage,
      currentCGPA
    });
    console.log(userExists);
    if (user) {
      const token = generateToken(user._id);
      sendSuccess(res, {
        _id: user._id,
        name: user.name,
        loginEmail: user.loginEmail,
        token: token,
      }, 201);
    } else {
      sendError(res, 400, 'Invalid user data.');
    }
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ loginEmail: email }).select('+password');
    if (user && (await user.comparePassword(password))) {
      const token = generateToken(user._id);
      sendSuccess(res, {
        _id: user._id,
        name: user.name,
        loginEmail: user.loginEmail,
        token: token,
      });
    } else {
      sendError(res, 401, 'Invalid email or password.');
    }
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      sendSuccess(res, user);
    } else {
      sendError(res, 404, 'User not found');
    }
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      Object.assign(user, req.body);
      const updatedUser = await user.save();
      sendSuccess(res, updatedUser);
    } else {
      sendError(res, 404, 'User not found');
    }
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const logoutUser = (req, res) => {
  // In a stateless JWT setup, logout is handled client-side by deleting the token.
  // This endpoint can be used for logging or if using a token blacklist.
  sendSuccess(res, { message: 'Logged out successfully' });
};

const getGoogleAuthUrl = async (req, res) => {
  const oauth2Client = getOAuth2Client();
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: GMAIL_SCOPES,
    state: req.user._id.toString(), // Pass user ID to identify user in callback
  });
  sendSuccess(res, { authUrl: url });
};

const googleCallback = async (req, res) => {
  const { code, state: userId } = req.query;
  const oauth2Client = getOAuth2Client();
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const profile = await gmail.users.getProfile({ userId: 'me' });
    
    const user = await User.findById(userId);
    if (user) {
      user.googleAccount = {
        email: profile.data.emailAddress,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        isConnected: true,
        lastSyncedAt: new Date(),
      };
      await user.save();
      res.redirect(`${process.env.FRONTEND_URL}/dashboard?gmail_connected=true`);
    } else {
      res.redirect(`${process.env.FRONTEND_URL}/settings?error=user_not_found`);
    }
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/settings?error=auth_failed`);
  }
};

const disconnectGoogle = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.googleAccount = {
        isConnected: false
      };
      await user.save();
      sendSuccess(res, { message: "Gmail disconnected successfully" });
    } else {
      sendError(res, 404, 'User not found');
    }
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id).select('+password');
    if (user && (await user.comparePassword(currentPassword))) {
      user.password = newPassword;
      await user.save();
      sendSuccess(res, { message: "Password changed successfully" });
    } else {
      sendError(res, 401, 'Current password is incorrect');
    }
  } catch (error) {
    sendError(res, 500, error.message);
  }
};


module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
  getGoogleAuthUrl,
  googleCallback,
  disconnectGoogle,
  changePassword
};
