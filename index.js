'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    routes = require('./controllers/main'),
    _ = require('lodash'),
    Collection = require('./models/Collection');

var admin = express();

admin.set('view engine', 'jade');
admin.set('views', __dirname + '/views');
admin.use(bodyParser.urlencoded({ extended: false }));
admin.use('/static', express.static(__dirname + '/static'));    


module.exports = function(options) {

    var options = require('./Options')(options);
    var Models;
    var collectionNames;
    var collections;
    var docs;

    // models default to all models in a Mongoose connection
    if(options.models.length > 0) {
        Models = options.models.map(function(name) {
            return mongoose.models[name];
        });
    } else {
        Models = mongoose.models;
    };
    
    // create map of plural collection names for easy lookup
    // e.g. {'users': 'User', ...}
    collectionNames = _.mapValues(_.mapKeys(Models, function(model) {
        return model.collection.name;
    }), function(model) {
        return model.modelName;
    });

    // extend models with methods for use with Siracha
    collections = _.mapValues(Models, function(model) {
        return Collection(model, options);
    });

    admin.locals._mongooseModels = Models;
    admin.locals.collectionNames = collectionNames;
    admin.locals.collections = collections;
    
    // get mount path for use in routing static
    admin.use(function(req, res, next) {
        var mountpath = admin.mountpath;
        admin.locals.appPath = mountpath;
        next();
    });
    
    admin.get('/', routes.main);
    admin.post('/', routes.loginForm);
    admin.get('/:collection', routes.collection);
    admin.get('/:collection/:doc', routes.doc);
    admin.post('/:collection/:doc', routes.doc);
    
    return admin;
};