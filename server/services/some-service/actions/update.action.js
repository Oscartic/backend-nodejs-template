const { NotFoundError } = require('../../../errors/client-errors');
const parseError = require('../../utils/parse-error');
const serviceErrors = require('../messages.errors');
const Some = require('../models/some.model');

module.exports = async function get({
  someId,
  name
}) {
  try {
    const some = await Some.findOneAndUpdate(
      { someId },
      { name },
      {
        omitUndefined: true,
        new: true,
      },
    );
    if (!some) {
      throw new NotFoundError(
        serviceErrors.update.name,
        serviceErrors.update.messages.notFound,
      );
    }
    return { some };
  } catch (error) {
    throw parseError({ error, errorMessages: serviceErrors.update });
  }
}
