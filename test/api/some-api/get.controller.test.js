const request = require('supertest');
const { expect, sinon } = require('../../chai.commons');
const app = require('../../../server/app');
const SomeService = require('../../../server/services/some-service');
const SomeFactory = require('../../factories/some.factory');

const api = app.api.express;

const url = '/some/';

describe('SOME-API: get', function () {
  let someServiceStub;

  beforeEach(function () {
    someServiceStub = sinon.stub(SomeService, 'get');
  });

  afterEach(function () {
    someServiceStub.restore();
  });

  it('[SUCCESS]', async function () {
    const fakeSome = SomeFactory.build();
    someServiceStub.resolves({ some })

    const response = await request(api)
      .get(`${url}/${fakeSome.someId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/);

    const some = response.body
    expect(some).to.exist;
    expect(some.name).to.equal(fakeSome.name);
    expect(some.someId).to.equal(fakeSome.someId);
    expect(someServiceStub).to.have.been.calledWith({ someId: fakeSome.someId });
  });
});
