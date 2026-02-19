
const express = require('express');
const router = express.Router();
// This functionality is handled by auth.controller for simplicity
const { getUserProfile, updateUserProfile } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getUserProfile);
router.put('/', protect, updateUserProfile);

module.exports = router;
