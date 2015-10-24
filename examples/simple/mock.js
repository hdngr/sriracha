'use strict';

var async = require('async');
var User = require('./models/User');
var Post = require('./models/Post');

module.exports = {
    createUsers: function() {
            var raw = [{
                firstName: "John",
                lastName: "Snow",
                email: "John@example.com"
            }, {
                firstName: "Jack",
                lastName: "In The Box",
                email: "Jack@another.com"
            }];
            var users = [];
            for (var i = 0; i < raw.length; i++) {
                var user = new User(raw[i]);
                user.save();
                users.push(user);
            }
            new Post({
                title: "A Blog Post!",
                author: {
                    firstName: 'John'
                }
            }).save()
            return users;
        },
    init: function() {
        this.createUsers();
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
            console.log("Removing database.")
            return done();
        });
    }
}