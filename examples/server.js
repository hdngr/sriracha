'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    User = require('./models/User'),
    Post = require('./models/Post'),
    admin = require('../');

var dbURL = 'mongodb://localhost/express-mongo-simple-example';

mongoose.connect(dbURL);

var app = express();
var models = [User, Post];
app.use('/admin', admin(models));

app.get('/', function(req, res) {
    res.send('This is the index route.  You are probably looking for the <a href="/admin">admin</a> route!');
})

app.listen(3000, function() {
    console.log('Example app listening at port %s', 3000);
});

module.exports = app;
