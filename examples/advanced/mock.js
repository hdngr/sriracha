'use strict';

var User = require('./models/User');
var Post = require('./models/Post');
var async = require('async');
var _ = require('lodash');

module.exports = {
    init: function(done) {
        function createDocs() {
            var firstNames = ["John", "Kellen", "Jim", "Susan", "Chantelle", "Siracha"];
            var lastNames = ["Sartre", "Johnson", "Richardson", "Gerrard"];
            for (var i = 0; i < 20; i++) {
                var firstName = _.sample(firstNames);
                var author = new User({
                    firstName: firstName,
                    lastName: _.sample(lastNames),
                    email: firstName + "@gmail.com"
                }).save(function(err, doc) {
                    if (!doc) return doc;
                    var post = new Post({
                        title: doc.firstName + " wrote a Post on " + new Date(),
                        author: doc._id
                        }).save();
                });
            }
            if (done) done();
        };
        createDocs();
    },
    destroy: function(done) {
        // mongoose creates a database when a connection is made
        // it is unclear how to 'abort' if database already exists
        // this is a dirty check to make sure developer has not already
        // made other collections in the database before we destroy it 
        var db = User.db;
        if (Object.keys(db.collections).length > 2) {
            console.warn("Other collections exist in " + db.name + "!");
            return done
        };
        db.db.dropDatabase(function(err, result) {
            if (err) console.dir(err);
            return done();
        });
    }
}