
const express = require('express');
const router = express.Router();
const { getUserCommunities, createCommunity, getCommunityMessages, sendMessage, joinCommunity } = require('../controllers/community.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getUserCommunities);
router.post('/', protect, createCommunity);
router.get('/:id/messages', protect, getCommunityMessages);
router.post('/:id/messages', protect, sendMessage);
router.post('/:id/join', protect, joinCommunity);

module.exports = router;
