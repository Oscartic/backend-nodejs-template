const ExtendableError = require('es6-error');
const { serializeError } = require('serialize-error');

class ServerError extends ExtendableError {
  constructor(
    type = 'internal_server_error',
    message = 'Something went wrong',
    error = {},
    statusCode = 500,
  ) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.error = error;
    this.message = message;
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

module.exports = {
  ServerError,
};
