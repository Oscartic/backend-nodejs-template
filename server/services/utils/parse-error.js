const { BadRequestError } = require('../../errors/client-errors');
const { ServerError } = require('../../errors/server-errors');

module.exports = function parseError({ error, errorMessages }) {
  if (error.name === 'MongoError' && error.code === 11000) {
    const key = Object.keys(error.keyValue)[0];
    return new BadRequestError(
      errorMessages.name,
      errorMessages.messages[key],
    );
  }
  if (error.name === 'ValidationError') {
    const key = Object.keys(error.errors)[0];
    return new BadRequestError(
      errorMessages.name,
      errorMessages.messages[key],
    );
  }
  if (!error.statusCode) {
    const message = error.message || 'A service error occurred';
    return new ServerError(errorMessages.name, message, error);
  }
  return error;
};
