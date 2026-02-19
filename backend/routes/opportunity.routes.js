
const express = require('express');
const router = express.Router();
const { getOpportunities, getRecommendedOpportunities, getDeadlineOpportunities, getOpportunityById, optInToOpportunity, updateOpportunityStatus } = require('../controllers/opportunity.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getOpportunities);
router.get('/recommended', protect, getRecommendedOpportunities);
router.get('/deadlines', protect, getDeadlineOpportunities);
router.get('/:id', protect, getOpportunityById);
router.patch('/:id/opt-in', protect, optInToOpportunity);
router.patch('/:id/status', protect, updateOpportunityStatus);

module.exports = router;
