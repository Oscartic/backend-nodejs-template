const { NotFoundError } = require('../errors/client-errors');
const someApi = require('./some-api/routes');

function notFoundMiddleware(req, res) {
  const error = new NotFoundError();
  error.url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  error.logAndSend(res);
}

module.exports.default = (app) => {
  // Insert routes below
  app.use('/some', someApi);

  app.use('/healthcheck', (req, res) => {
    res.status(200);
    res.end();
  });

  // All other routes should send a not found error
  app.route('/*').get(notFoundMiddleware);
};
