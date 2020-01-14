/* eslint-disable no-console */
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const config = require('./environment');
const routes = require('../api/routes');
const swaggerSpecs = require('../../api-docs/config');

module.exports = function initialize() {
  console.log(`Starting Express server on port ${config.apiPort}`);

  const corsOptionsDelegate = function (req, callback) {
    const corsOptions = { origin: true }; // disable CORS for this request
    callback(null, corsOptions); // callback expects two parameters: error and options
  };

  const app = express();

  try {
    app.use(cors(corsOptionsDelegate));
    app.use(bodyParser.json());

    if (config.generateApiDocs) {
      app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpecs, { explorer: true }),
      );
    }

    routes.default(app);

    app.listen(config.apiPort, function () {
      console.log(`Express server listening on port ${config.apiPort}`);
    });
  } catch (error) {
    console.log(error);
  }

  return app;
};
