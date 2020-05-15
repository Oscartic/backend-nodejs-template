
module.exports = {
  create: {
    name: 'some_api_create_validation_error',
    messages: {
      name: 'name is a required string',
    },
  },
  update: {
    name: 'some_api_update_validation_error',
    messages: {
      name: 'name is a required string',
    },
  },
  get: {
    name: 'some_api_get_validation_error',
    messages: {
      someId: 'someId is a required uuid in path',
    },
  },
  remove: {
    name: 'some_api_remove_validation_error',
    messages: {
      someId: 'someId is a required uuid in path',
    },
  },
};
