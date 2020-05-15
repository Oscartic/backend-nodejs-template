const _ = require('lodash');
const Joi = require('@hapi/joi');
const respondWithResult = require('../../utils/respond-with-result');
const handleError = require('../../../errors/errors-service');
const SomeService = require('../../../services/some-service');
const GetSomeValidationSchema = require('../schemas/get.schema');

const schema = Joi.object().keys(GetSomeValidationSchema);

module.exports = async function get(req, res) {
  const params = _.get(req, 'params', {});
  try {
    await schema.validateAsync(params);

    const { someId } = params;
    const { some } = await SomeService.get({ someId });

    return respondWithResult(res, 200)(some);
  } catch (error) {
    return handleError(res)(error);
  }
};
