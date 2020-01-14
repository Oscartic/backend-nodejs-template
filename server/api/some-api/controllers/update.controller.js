const _ = require('lodash');
const Joi = require('@hapi/joi');
const respondWithResult = require('../../utils/respond-with-result');
const handleError = require('../../../errors/errors-service');
const SomeService = require('../../../services/some-service');
const RemoveSomeValidationSchema = require('../schemas/remove.schema');

const schema = Joi.object().keys(RemoveSomeValidationSchema);

module.exports = async function remove(req, res) {
  const body = _.get(req, 'body', {});
  const params = _.get(req, 'params', {});
  try {
    await schema.validateAsync(body);

    const { someId } = params;
    const { name } = body;
    const { some } = await SomeService.update({ someId, name });

    return respondWithResult(res)(some);
  } catch (error) {
    return handleError(res)(error);
  }
};
