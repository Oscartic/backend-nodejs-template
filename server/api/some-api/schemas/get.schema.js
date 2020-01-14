
const Joi = require('@hapi/joi');
const { BadRequestError } = require('../../../errors/client-errors');
const apiError = require('../messages.errors');

module.exports = {
  someId: Joi.string()
    .required()
    .error(
      new BadRequestError(
        apiError.get.name,
        apiError.get.messages.someId,
      ),
    ),
};
