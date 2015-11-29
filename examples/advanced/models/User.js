'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: '',
    unique: true
  },
  onboarding: {
    signupDate: {
      type: String,
      adminFieldType: 'date'
    },
    hasLoggedIn: {
      type: Boolean,
      default: false
    }
  },
  roles: []
});

UserSchema.path('email').validate(function(email) {
  return email.length;
}, 'Email cannot be blank');

var User = mongoose.model('User', UserSchema);
module.exports = User;
