/**
 * @module SchemaModel
 */
const mongoose = require('mongoose');
const Promise = require('bluebird');
const uuid = require('uuid/v4');

const { Schema } = mongoose;

mongoose.Promise = Promise;

const SomeSchema = new Schema(
  {
    someId: {
      type: String,
      required: true,
      unique: [true, 'someId must be unique'],
      default: uuid,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'name is required'],
    },
  },
  {
    timestamps: true,
  },
);

SomeSchema.index({ createdAt: -1 });

const Some = mongoose.model(
  'Some',
  SomeSchema,
);

module.exports = Some;
