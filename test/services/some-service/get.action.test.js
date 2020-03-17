const { expect } = require('../../../chai.commons');
const SomeFactory = require('../../factories/some.factory');
const SomeService = require('../../../server/services/some-service/');
const Some = require('../../../server/services/some-service/models/some.model');
const serviceErrors = require('../../../server/services/some-service/messages.errors');
require('../../../server/app');

describe('SOME-SERVICE: get', function () {
  beforeEach(async function () {
    await Some.deleteMany({});
    return;
  });

  afterEach(function () {
  });

  it('[ERROR] should throw not found error when someId doesnt exist', async function () {
    const someId = 'some-id';
    try {
      const { some } = await SomeService.get({ someId });
      throw new Error('shouldve thrown an error');
    } catch (error) {
      expect(error).to.exist;
      expect(error.statusCode).to.equal(404);
      expect(error.type).to.equal(serviceErrors.get.name);
      expect(error.message).to.equal(serviceErrors.get.messages.notFound);
    }
  });

  it('[SUCCESS]', async function () {
    const someId = 'some-id';
    await Some.create(SomeFactory.build({ someId }));

    const { some } = await SomeService.get({ someId });
    expect(some).to.exist;
    expect(some.someId).to.equal(someId);
  });
});
