// eslint-disable-next-line max-classes-per-file
const ExtendableError = require('es6-error');
const { serializeError } = require('serialize-error');

class ClientError extends ExtendableError {
  constructor(type = 'client_error', message = 'You made a mistake', error = {}) {
    super(message);
    this.type = type;
    this.message = message;
    this.statusCode = 400;
    this.error = error;
  }

  logAndSend(res) {
    const jsonError = this.serialize();
    delete jsonError.stack;
    delete jsonError.error;
    res.status(this.statusCode).send({ error: jsonError }); // Send generic
  }

  serialize() {
    return serializeError(this);
  }
}

class BadRequestError extends ClientError {
  constructor(type = 'bad_request_error', message = 'Bad request error', error = {}) {
    super(message);
    this.type = type;
    this.message = message;
    this.statusCode = 400;
    this.error = error;
  }
}

class NotFoundError extends ClientError {
  constructor(type = 'not_found_error', message = 'Not found error', error = {}) {
    super(message);
    this.type = type;
    this.message = message;
    this.statusCode = 404;
    this.error = error;
  }
}

class UnauthorizedError extends ClientError {
  constructor(type = 'unauthorized_error', message = 'Unauthorized error', error = {}) {
    super(message);
    this.type = type;
    this.message = message;
    this.statusCode = 401;
    this.error = error;
  }
}

module.exports = {
  ClientError, BadRequestError, NotFoundError, UnauthorizedError,
};
