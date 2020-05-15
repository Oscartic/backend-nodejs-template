/* eslint-disable no-console */
const Promise = require('bluebird');
const mongoose = require('mongoose');
const config = require('./environment');

mongoose.Promise = Promise;

module.exports = function initializeMongo() {
  try {
    const { mongo } = config;
    console.log(`Starting mongo connection on ${mongo.connection_string}`);
    mongoose.connect(mongo.connection_string, mongo.options);
    mongoose.connection.on('error', (error) => {
      console.log(error);
      process.exit(-1);
    });
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
  } catch (error) {
    console.log(error);
  }
};
