const _ = require('lodash');

/**
 * Gets the value from an environment variable: `process.env[key]`. If the value is undefined,
 * `defaultValue` is returned instead.
 * @private
 * @param {object} args
 * @param {string} args.key
 * @param {(string|number|boolean)} [args.defaultValue]
 * @param {string} [args.type=string]
 * @returns {(string|number|boolean)}
 */
const getEnvValue = ({ key, defaultValue, type = 'string' }) => {
  if (!_.has(process.env, key)) {
    return defaultValue;
  }

  const value = _.get(process.env, key);

  switch (type) {
    case 'boolean':
      return value === 'true';
    case 'number':
      return Number(value);
    default:
      return value;
  }
};

module.exports = {
  node_env: getEnvValue({ key: 'NODE_ENV', defaultValue: 'development' }),

  mongo: {
    connection_string: getEnvValue({
      key: 'MONGO_CONNECTION_STR',
      defaultValue: '',
    }),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  apiPort: getEnvValue({
    key: 'API_PORT',
    defaultValue: '',
  }),
  
  jwt: {
    secret: getEnvValue({
      key: 'JWT_SECRET',
      defaultValue: '',
    }),
    duration: '1 days',
  },

  generateApiDocs: getEnvValue({
    key: 'GENERATE_API_DOCS',
    defaultValue: false,
  }),
};
