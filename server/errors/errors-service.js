const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
} = require('./client-errors');
const { ServerError } = require('./server-errors');

/**
 * Gets an unhandled error and tries to recognize it
 * and translate it based on its statusCode
 * Else, it returns a generic error (500)
 * @param {Error} error
 * @param {number} error.statusCode HTTP response code
 * @param {string} error.name Error identifier
 * @param {string} error.message Error description
 * @returns {Error} translatedError
 */
function translateErrorByStatusCode(error) {
  const errorName = error.name;
  switch (error.statusCode) {
    case 400:
      return new BadRequestError(errorName, error.message);
    case 404:
      return new NotFoundError(errorName, error.message);
    case 401:
      return new UnauthorizedError(errorName, error.message);
    case 403:
      return new ForbiddenError(errorName, error.message);
    default:
      return new ServerError(errorName, error.message);
  }
}

/**
 * Gets an unhandled error and tries to recognize it
 * and translate it based on its cause, name or statusCode
 * Else, it returns a generic error (500)
 * @param {Error} error
 * @returns {Error} translatedError
 */
function translateError(error) {
  try {
    if (error.cause && error.cause.orig && error.cause.orig.code) {
      // These are eraro errors that come from mach-services
      const codeParts = error.cause.orig.code.split('-');
      const errorStatusCode = codeParts[0].trim();
      const errorName = codeParts[1].trim();
      const errorMessage = error.cause.orig.msg;
      return new ServerError(errorName, errorMessage, error, errorStatusCode);
    }
    if (error.statusCode) {
      return translateErrorByStatusCode(error);
    }
    if (error.name) {
      switch (error.name) {
        case 'bad_request_error':
          return new BadRequestError(undefined, error.message);
        case 'not_found_error':
          return new NotFoundError(undefined, error.message);
        case 'ValidationError':
          return new BadRequestError(undefined, error.message);
        default:
          return new ServerError(undefined, error.message);
      }
    }
    return new ServerError(undefined, error.message);
  } catch (e) {
    return new ServerError(error);
  }
}

function isTranslated(error) {
  return error.logAndSend && typeof error.logAndSend === 'function';
}

/**
 * Builds an error handling function given a request
 * @param {object} res
 * @returns {function}
 */
function handleError(res) {
/**
 * Takes the error information received by and endpoint when calling a third party, and converts it
 * into an Error instance that is able to respond accordingly to the client.
 * @param {object} error
 * @returns {undefined}
 */
  return (error) => {
    if (!isTranslated(error)) {
      error = translateError(error); // eslint-disable-line no-param-reassign
    }
    error.logAndSend(res);
  };
}

module.exports = handleError;
