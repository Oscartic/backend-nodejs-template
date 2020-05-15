const { NotFoundError } = require('../../../errors/client-errors');
const parseError = require('../../utils/parse-error');
const serviceErrors = require('../messages.errors');
const Some = require('../models/some.model');

module.exports = async function get({
  someId,
}) {
  try {
    const some = await Some.findOne({ someId });
    if (!some) {
      throw new NotFoundError(
        serviceErrors.get.name,
        serviceErrors.get.messages.notFound,
      );
    }
    return { some };
  } catch (error) {
    throw parseError({ error, errorMessages: serviceErrors.get });
  }
};
