'use strict';

// import the moongoose helper utilities
var request = require('supertest');
var should = require('should');

describe('using simple example', function() {
  var agent;
  var server;

  before(function(done) {
    var mongoose = require('mongoose');
    // clear all mongoose connections
    mongoose.connection.models = {};
    mongoose.models = {};
    // if mongoose connection is still alive disconnect it
    if (mongoose.connection.readyState === 1) {
      mongoose.disconnect();
    };
    // start the server
    console.log('starting simple server');
    server = require('../examples/simple/server');
    agent = request.agent(server);
    done();
  });

  after(function(done) {
    var mock = require('../examples/simple/mock');
    console.log('closing simple server');
    try {
      server.close();
    } catch(e) {
      console.log(e);
    }
    mock.destroy(done);
  });

  describe('/admin/login', function() {
    it('should authenticate the user', function(done) {
      // create session
      agent.post('/admin/login')
        .type('form')
        .send({
          username: 'admin',
          password: 'admin'
        })
        .expect(302)
        .end(done);
    });
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
