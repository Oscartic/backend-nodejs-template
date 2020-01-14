
const Joi = require('@hapi/joi');
const { BadRequestError } = require('../../../errors/client-errors');
const apiError = require('../messages.errors');

module.exports = {
  someId: Joi.string()
    .required()
    .error(
      new BadRequestError(
        apiError.remove.name,
        apiError.remove.messages.someId,
      ),
    ),
};
