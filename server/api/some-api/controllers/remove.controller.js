const _ = require('lodash');
const Joi = require('@hapi/joi');
const respondWithResult = require('../../utils/respond-with-result');
const handleError = require('../../../errors/errors-service');
const SomeService = require('../../../services/some-service');
const RemoveSomeValidationSchema = require('../schemas/remove.schema');

const schema = Joi.object().keys(RemoveSomeValidationSchema);

module.exports = async function remove(req, res) {
  const params = _.get(req, 'params', {});
  try {
    await schema.validateAsync(params);

    const { someId } = params;
    await SomeService.remove({ someId });

    return respondWithResult(res, 201)();
  } catch (error) {
    return handleError(res)(error);
  }
};
