const chai = require('chai');

// Load Chai assertions
module.exports.expect = chai.expect;
module.exports.assert = chai.assert;
chai.should();

// Load Sinon
module.exports.sinon = require('sinon');

// Initialize Chai plugins
chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));
chai.use(require('chai-things'));
chai.use(require('chai-datetime'));
