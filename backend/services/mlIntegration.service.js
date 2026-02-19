
const axios = require('axios');

const ML_URL = process.env.ML_SERVICE_URL;

const classifyEmail = async (text, subject) => {
  try {
    const response = await axios.post(`${ML_URL}/classify`, { text, subject });
    return response.data;
  } catch (error) {
    console.error('ML classify error:', error.message);
    return { category: 'unclassified', confidence: 0, is_placement_related: false };
  }
};

const extractInfo = async (text, subject) => {
  try {
    const response = await axios.post(`${ML_URL}/extract`, { text, subject });
    return response.data;
  } catch (error) {
    console.error('ML extract error:', error.message);
    return {};
  }
};

const checkEligibility = async (user, criteria) => {
  try {
    const response = await axios.post(`${ML_URL}/check-eligibility`, { user, criteria });
    return response.data;
  } catch (error) {
    console.error('ML check-eligibility error:', error.message);
    return { is_eligible: null, failed_reasons: ['ML service unavailable'] };
  }
};

const matchSkills = async (job_skills, student_skills) => {
  try {
    const response = await axios.post(`${ML_URL}/match-skills`, { job_skills, student_skills });
    return response.data;
  } catch (error) {
    console.error('ML match-skills error:', error.message);
    return { match_score: 0, matched_skills: [], missing_skills: job_skills };
  }
};

module.exports = {
  classifyEmail,
  extractInfo,
  checkEligibility,
  matchSkills,
};
