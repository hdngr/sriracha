'use strict';

var express = require('express'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    routes = require('./lib/controllers/main'),
    _ = require('lodash'),
    Collection = require('./lib/models/Collection'),
    Strategy = require('./lib/strategy'),
    Options = require('./lib/options');

var admin = express();

// this session store is only used if parent app
// DOES NOT already have a session store.
admin.use(session({ 
    secret: 'Siracha!',
    saveUninitialized: true
})); 

admin.set('view engine', 'jade');
admin.set('views', __dirname + '/lib/views');
admin.use(bodyParser.urlencoded({ extended: false }));
// allow delete method
admin.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

admin.use('/static', express.static(__dirname + '/lib/static'));
admin.use('/components', express.static(__dirname + '/components'));    


module.exports = function(userDefined) {
    var userDefined = userDefined || {};

    var options = Options(userDefined);
    
    var Models;
    var collectionNames;
    var collections;
    var docs;
    var strategy;

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
    
    admin.use(function (req, res, next) {
        req.session.message = req.session.message || { error: [], success: [], info: [] };
        admin.locals.message  = req.session.message;
        next();
    });

    strategy = new Strategy(options);
    
    admin.use(strategy.middleware.bind(strategy));

    admin.get('/', routes.main);

    admin.post('/login', strategy.login.bind(strategy));
    admin.post('/logout', strategy.logout);

    admin.get('/:collection', routes.collection);
    admin.post('/:collection/suggest', routes.suggest);
    admin.all('/:collection/new', routes.newDoc);
    admin.all('/:collection/:doc', routes.doc);
    
    return admin;
};