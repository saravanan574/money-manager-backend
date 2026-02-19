
const express = require('express');
const router = express.Router();
const { syncEmails, getEmails, getEmailStats, getEmailById } = require('../controllers/email.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/sync', protect, syncEmails);
router.get('/', protect, getEmails);
router.get('/stats', protect, getEmailStats);
router.get('/:id', protect, getEmailById);

module.exports = router;
