const { Factory } = require('rosie');
const uuid = require('uuid/v4');

module.exports = new Factory()
  .attr('someId', uuid)
  .sequence('name', i => `name ${i}`);
