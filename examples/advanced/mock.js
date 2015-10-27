'use strict';

var User = require('./models/User');
var Post = require('./models/Post');
var async = require('async');

module.exports = {
    init: function(done) {
        function createDocs() {
            var raw = [{
                firstName: "John",
                email: "John@example.com"
            }, {
                firstName: "Jack",
                email: "Jack@another.com"
            }];
            for (var i = 0; i < raw.length; i++) {
                var author = new User(raw[i]).save(function(err, doc) {
                    var post = new Post({
                        title: "A Blog Post!",
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
        debugger;
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