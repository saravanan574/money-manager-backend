
const sendSuccess = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data: data,
  });
};

const sendError = (res, statusCode = 500, message, errors = []) => {
  res.status(statusCode).json({
    success: false,
    message: message,
    errors: errors,
  });
};

module.exports = {
  sendSuccess,
  sendError,
};
