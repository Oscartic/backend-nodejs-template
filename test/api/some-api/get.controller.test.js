const request = require('supertest');
const { expect, sinon } = require('../../chai.commons');
const app = require('../../../server/app');
const apiErrors = require('../../../server/api/some-api/messages.errors');
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

  it('[ERROR] should return a bad request error when someId is missing', async function () {
    const response = await request(api)
      .get(`${url}/`)
      .set('Accept', 'application/json')
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body).to.exist;
    expect(response.body.error).to.exist;
    expect(response.body.error.statusCode).to.equal(400);
    expect(response.body.error.type).to.equal(apiErrors.get.name);
    expect(response.body.error.message).to.equal(apiErrors.get.messages.someId);
    expect(someServiceStub).to.have.not.been.called;
  });


  it('[SUCCESS]', async function () {
    const fakeSome = SomeFactory.build();
    someServiceStub.resolves({ some: fakeSome });

    const response = await request(api)
      .get(`${url}/${fakeSome.someId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/);

    const some = response.body;
    expect(some).to.exist;
    expect(some.name).to.equal(fakeSome.name);
    expect(some.someId).to.equal(fakeSome.someId);
    expect(someServiceStub).to.have.been.calledWith({ someId: fakeSome.someId });
  });
});
