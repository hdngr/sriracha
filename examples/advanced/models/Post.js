'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    default: ''
    // adminSearchField: true
  },
  date: {
    type: Date,
    default: new Date(),
    admin: false
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
  }
});


module.exports = mongoose.model('Post', PostSchema);
