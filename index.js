'use strict';

var express = require('express'),
    routes = require('./routes'),
    mongoose = require('mongoose'),
    _ = require('lodash');

var admin = express();

admin.set('view engine', 'jade');
admin.set('views', __dirname + '/views');
admin.use('/static', express.static(__dirname + '/static'));    

module.exports = function(options) {

    var options = require('./options')(options);
    var models;

    // models default to all models in a Mongoose connection
    if(options.models.length > 0) {
        models = options.models.map(function(name) {
            return mongoose.models[name];
        });
    } else {
        models = _.values(mongoose.models);
    };
    
    // models.forEach(function(model) {
    //     for(var path in model.schema.paths) {
    //         if(model.schema.paths[path].options.admin !== false) {
    //             model.schema.paths[path].options.admin = true;
    //         }
    //     };
    // });


    admin.locals.models = models;
    
    admin.use(function(req, res, next) {
        var mountpath = admin.mountpath;
        admin.locals.appPath = mountpath;
        next();
    });

    var strategy = function(req, res, next) {
        if(options.passport) {
            return options.passport;
        } else if (options.username && options.passport) {
            return simple(req, res, next, options);
        }

    }

    admin.set('views', __dirname + '/views');

    admin.get('/', routes.main);
    admin.post('/', strategy, routes.loginForm);
    admin.get('/:collection', routes.model);
    admin.get('/:collection/:doc', routes.modelDetail);
    
    return admin;
};