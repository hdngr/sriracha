'use strict';

// import the moongoose helper utilities
var assert = require('assert');
var request = require('supertest');
var should = require('should');

describe('advanced e2e tests', function() {
  var agent;
  var server;

  before(function(done) {
    var mongoose = require('mongoose');
    mongoose.connection.models = {};
    mongoose.models = {};
    if(mongoose.connection.readyState === 1) {
      mongoose.disconnect();
    };
    console.log('starting advanced server');
    server = require('../examples/advanced/server');
    agent = request.agent(server);
    return done();
  });

  after(function(done) {
    var mock = require('../examples/advanced/mock');
    console.log('closing advanced server');
    server.close();
    mock.destroy(done);
  });


  describe('crazy-mount-path is the mountpath', function(done) {
    it('/crazy-mount-path should respond with a status code of 200', function(done) {
      agent.get('/crazy-mount-path')
      .expect(200)
      .end(done);
    });
  });

  describe('route /crazy-mount-path/users', function() {
    it('should respond with status code 200', function(done) {
      agent.get('/crazy-mount-path/users')
      .expect(200)
      .end(done);
    });

    it('should respond with user models rendered', function(done) {
      agent.get('/crazy-mount-path/users')
      .expect(function(res) {
        res.text.should.match(/Users/)
      })
      .end(done);
    });
  });

  describe('route /crazy-mount-path/posts', function() {
    it('should respond with status code 200', function(done) {
      agent.get('/crazy-mount-path/posts')
      .expect(200)
      .end(done);
    });

    it('should respond with Post model rendered', function(done) {
      agent.get('/crazy-mount-path/posts')
      .expect(function(res) {
        res.text.should.match(/Posts/)
      })
      .end(done);
    });
  });

});
