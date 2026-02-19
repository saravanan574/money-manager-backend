
const { sendSuccess, sendError } = require('../utils/responseHelper');

const getUserNotifications = async (req, res) => {
  sendSuccess(res, { message: "Endpoint not implemented." });
};

const markNotificationAsRead = async (req, res) => {
  sendSuccess(res, { message: "Endpoint not implemented." });
};

module.exports = {
  getUserNotifications,
  markNotificationAsRead
};
