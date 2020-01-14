const returnArgument = args => args;

/**
 * Provides a function to respond to a client with a given HTTP status code.
 * @param {object} res
 * @param {number} statusCode
 * @param {object} [options]
 * @param {function} [options.transformEntity] Function to apply to the entity
 * to transform it. E.g: keys to snake case
 * @returns {function}
 */
function respondWithResult(res, statusCode = 200, options = {}) {
  return (entity) => {
    if (entity) {
      const transformEntity = options.transformEntity || returnArgument;
      const transformedEntity = transformEntity(entity);
      return res.status(statusCode).json(transformedEntity);
    }
    return res.status(statusCode).json();
  };
}

module.exports = respondWithResult;
