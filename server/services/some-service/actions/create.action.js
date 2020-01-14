const parseError = require('../../utils/parse-error');
const serviceErrors = require('../messages.errors');
const Some = require('../models/some.model');

module.exports = async function create({
  name,
}) {
  try {
    const some = await Some.create({ name });
    return { some };
  } catch (error) {
    throw parseError({ error, errorMessages: serviceErrors.create });
  }
}
