'use strict';

// import the moongoose helper utilities
var assert = require('assert');
var User = require('../examples/models/User');
var request = require('supertest');
var mongoose = require('mongoose');
var server = require('../examples/server');
var agent = request.agent(server);
var mock = require('../examples/mock/simple');
var should = require('should');

describe('model routes', function() {
  before(function(done) {
    mock.init(done);
  });
  describe('/admin/users', function() {
    it('should respond with status code 200', function(done) {
      agent.get('/admin/users')
      .expect(200)
      .end(done);
    });

    it('should respond with user models rendered', function(done) {
      agent.get('/admin/users')
      .expect(function(res) {
        res.text.should.match(/Users/)
      })
      .end(done);
    });
  });

  describe('/admin/posts', function() {
    it('should respond with status code 200', function(done) {
      agent.get('/admin/posts')
      .expect(200)
      .end(done);
    });

    it('should respond with Post model rendered', function(done) {
      agent.get('/admin/posts')
      .expect(function(res) {
        res.text.should.match(/Posts/)
      })
      .end(done);
    });
  });

  after(function(done) {
      mock.destroy(done);
    })
});