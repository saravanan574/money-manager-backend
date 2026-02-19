
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getGoogleAuthUrl,
  googleCallback,
  disconnectGoogle,
  changePassword,
  logoutUser
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { registerValidation, loginValidation } = require('../middleware/validation.middleware');

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post('/logout', protect, logoutUser);

router.get('/google/url', protect, getGoogleAuthUrl);
router.get('/google/callback', googleCallback);
router.post('/google/disconnect', protect, disconnectGoogle);
router.post('/change-password', protect, changePassword);

module.exports = router;
