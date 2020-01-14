module.exports = {
  get: {
    name: 'some_service_get_some_service_error',
    messages: {
      notFound: 'a some with the given someId does not exist',
    },
  },
  create: {
    name: 'some_service_create_some_service_error',
    messages: {
      name: 'name is required',
    },
  },
  update: {
    name: 'some_service_update_some_service_error',
    messages: {
      notFound: 'a some with the given someId does not exist',
      name: 'name cannot be empty',
    },
  },
  remove: {
    name: 'some_service_remove_some_service_error',
    messages: {
      notFound: 'a some with the given someId does not exist',
    },
  },
};
