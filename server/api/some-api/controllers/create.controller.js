const _ = require('lodash');
const Joi = require('@hapi/joi');
const respondWithResult = require('../../utils/respond-with-result');
const handleError = require('../../../errors/errors-service');
const SomeService = require('../../../services/some-service');
const CreateSomeValidationSchema = require('../schemas/create.schema');

const schema = Joi.object().keys(CreateSomeValidationSchema);

module.exports = async function create(req, res) {
  const body = _.get(req, 'body', {});
  try {
    await schema.validateAsync(body);

    const { name } = body;
    const { some } = await SomeService.create({ name });

    return respondWithResult(res, 201)(some);
  } catch (error) {
    return handleError(res)(error);
  }
};
