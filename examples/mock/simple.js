'use strict';

var User = require('../models/User');
var Post = require('../models/Post');
var async = require('async');

module.exports = {
    init: function(done) {
        function createUsers() {
            var raw = [{
                firstName: "John",
                email: "John@example.com"
            }, {
                firstName: "Jack",
                email: "Jack@another.com"
            }];
            for (var i = 0; i < raw.length; i++) {
                new User(raw[i]).save();
            }
            new Post({
                title: "A Blog Post!",
                author: {firstName: 'John'}
            }).save();
            done();
        };
        createUsers();
    },
    destroy: function(done) {
        async.parallel([
            function(cb) {
                User.collection.remove(cb)
            }
        ], done)
    }
}