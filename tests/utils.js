'use strict';

var request = require('supertest')

module.exports = {
    advanced: {
        start: function() {
            var mongoose = require('mongoose');
            mongoose.connection.models = {};
            mongoose.models = {};
            if (mongoose.connection.readyState === 1) {
                mongoose.disconnect();
            };
            console.log('starting advanced server');
            var server = require('../examples/advanced/server');
            var agent = request.agent(server);
            return [agent, server]
        },
        stop: function(server, done) {
            var mock = require('../examples/advanced/mock');
            console.log('closing advanced server');
            server.close();
            mock.destroy(done);
        }
    }
};