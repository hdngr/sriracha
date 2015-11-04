'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    async = require('async'),
    mock = require('./mock'),
    User = require('./models/User'),
    Post = require('./models/Post'),
    admin = require('../../');

var dbURL = 'mongodb://localhost/siracha-advanced-example';

mongoose.connect(dbURL);

var app = express();

app.use('/crazy-mount-path', admin({
    User: {
        searchField: 'email',
    },
    hideFields: ['__v'],
    Post: {
        searchField: 'title',
        campaignHash: {
            admin: false
        }
    }
}));

app.get('/', function(req, res) {
    res.send('This is the index route.  You are probably looking for the <a href="/crazy-mount-path">Advanced App</a> route!');
})

var server = app.listen(3000, function() {
    mock.init();
    console.log('Advanced example app listening at port %s', 3000);
})

server.on('close', function(done) {
    console.log('Closing advanced example app port %s', 3000);
});

process.on('SIGINT', function() {
    mock.destroy(function() {
        server.close();
        process.kill(0);
    });
});

module.exports = server;