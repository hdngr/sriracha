'use strict';

// import the moongoose helper utilities
var assert = require('assert');
var request = require('supertest');
var should = require('should');

describe('simple e2e tests', function() {
  var agent;
  var server;
  
  before(function(done) {
    var mongoose = require('mongoose');
    mongoose.connection.models = {};
    mongoose.models = {};
    if(mongoose.connection.readyState === 1) {
      mongoose.disconnect();
    };
    console.log('starting simple server');
    server = require('../examples/simple/server');
    agent = request.agent(server);
    return done();
  });
  
  after(function(done) {
    var mock = require('../examples/simple/mock');
    console.log('closing simple server');
    server.close();
    mock.destroy(done);
  });

  describe('/admin is the mount path and', function() {
    it('should respond with a status code of 200', function(done) {
      agent.get('/admin')
      .expect(200)
      .end(done);
    });
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
});
