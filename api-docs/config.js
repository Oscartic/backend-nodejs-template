const swaggerJsDoc = require('swagger-jsdoc');

// Info object follows this specification: https://swagger.io/specification/#infoObject
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: '{APPLICATION_NAME}',
      version: '0.0.1',
      description: 'This is a sample server for {APPLICATION_NAME} API.',
    },
  },
  apis: [
    './server/api/**/*.js',
    './api-docs/components.yml',
    './api-docs/schemas/*.yml',
  ],
};

module.exports = swaggerJsDoc(options);
