'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    async = require('async'),
    mock = require('./mock'),
    User = require('./models/User'),
    Post = require('./models/Post'),
    admin = require('../../');


var dbURL = 'mongodb://localhost/siracha-simple-example';

mongoose.connect(dbURL);

var app = express();

app.use('/admin', admin());

app.get('/', function(req, res) {
    res.send('This is the index route.  You are probably looking for the <a href="/admin">admin</a> route!');
})

var server = app.listen(3000, function() {
    mock.init();
    console.log('Simple example app listening at port %s', 3000);
})

server.on('close', function(done) {
    console.log('Closing simple example app port %s', 3000);
});

process.on('SIGINT', function() {
  server.close();
  mock.destroy(function() {
    process.kill(0);
  });
});

module.exports = server;
