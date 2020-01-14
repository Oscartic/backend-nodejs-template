/* eslint-disable no-console */
/**
 * Main application file
 */
const initializeExpress = require('./config/express');
const initializeMongo = require('./config/mongo');

function initializeApp() {
  const app = {
    api: {
      express: initializeExpress(),
    },
    services: {
      mongo: initializeMongo(),
    },
  };
  return app;
}

let app;

try {
  app = initializeApp();
} catch (error) {
  console.log(`Error initializing app: ${error}`);
}

process.on('uncaughtException', () => {
  process.exit(-1);
});

// Expose app
exports = app;
module.exports = app;
