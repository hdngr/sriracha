'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: new Date(),
    admin: false
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});


module.exports = mongoose.model('Post', PostSchema);
