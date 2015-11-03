'use strict';

// import the moongoose helper utilities
var assert = require('assert'),
  request = require('supertest'),
  should = require('should'),
  cheerio = require('cheerio');

describe('e2e tests using advanced example', function() {
  var agent;
  var server;

  before(function(done) {
    var mongoose = require('mongoose');
    mongoose.connection.models = {};
    mongoose.models = {};
    if (mongoose.connection.readyState === 1) {
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

  describe('/crazy-mount-path/login', function() {
    it('should authenticate the user', function(done) {
      // create session
      agent.post('/crazy-mount-path/login')
        .type('form')
        .send({
          username: 'admin',
          password: 'admin'
        })
        .expect(302)
        .end(done);
    });
  });

  describe('crazy-mount-path is the mountpath', function(done) {
    it('/crazy-mount-path should respond with the index page a status code of 200', function(done) {
      agent.get('/crazy-mount-path')
        .expect(200)
        .expect(function(res) {
          var $ = cheerio.load(res.text);
          $('body').attr('id').should.match('index');
        })
        .end(done);
    });
  });

  describe('route /crazy-mount-path/users', function() {
    it('should respond with status code 200 and Users rendered', function(done) {
      agent.get('/crazy-mount-path/users')
        .expect(200)
        .expect(function(res) {
          var $ = cheerio.load(res.text);
          $('h1.page-header').text().should.equal('Users');
        })
        .end(done);
    });
  });

  describe('route /crazy-mount-path/posts', function() {
    it('should respond with status code 200 and Posts rendered', function(done) {
      agent.get('/crazy-mount-path/posts')
        .expect(200)
        .expect(function(res) {
          var $ = cheerio.load(res.text);
          $('h1.page-header').text().should.equal('Posts');
        })
        .end(done);
    });

  });

});