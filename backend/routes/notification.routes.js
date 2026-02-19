
const express = require('express');
const router = express.Router();
const { getUserNotifications, markNotificationAsRead } = require('../controllers/notification.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getUserNotifications);
router.patch('/:id/read', protect, markNotificationAsRead);

module.exports = router;
