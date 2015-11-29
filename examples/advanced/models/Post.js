'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    default: ''
    // adminSearchField: true
  },
  createdOn: {
    type: Date,
    default: new Date(),
    admin: false,
    adminFieldType: 'date'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  published: {
    type: Boolean,
    default: false
  },
  campaignHash: {
    type: String
  },
  body: {
    type: String,
    adminFieldType: 'textarea'
  },
  tags: {
    adminFieldType: 'array',
    type: Array
  }
});


module.exports = mongoose.model('Post', PostSchema);
