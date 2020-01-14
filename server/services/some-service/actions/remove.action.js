const { NotFoundError } = require('../../../errors/client-errors');
const parseError = require('../../utils/parse-error');
const serviceErrors = require('../messages.errors');
const Some = require('../models/some.model');

module.exports = async function get({
  someId,
}) {
  try {
    const some = await Some.findOneAndDelete({ someId });
    return;
  } catch (error) {
    throw parseError({ error, errorMessages: serviceErrors.remove });
  }
}
