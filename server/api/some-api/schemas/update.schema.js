
const Joi = require('@hapi/joi');
const { BadRequestError } = require('../../../errors/client-errors');
const apiError = require('../messages.errors');

module.exports = {
  name: Joi.string()
    .required()
    .error(
      new BadRequestError(
        apiError.update.name,
        apiError.update.messages.name,
      ),
    ),
};
