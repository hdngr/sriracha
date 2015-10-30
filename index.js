'use strict';

var express = require('express'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    routes = require('./controllers/main'),
    _ = require('lodash'),
    Collection = require('./models/Collection'),
    Strategy = require('./strategy');

var admin = express();

// this session store is only used if parent app
// DOES NOT already have a session store.
admin.use(session({ 
    secret: 'Siracha!',
    saveUninitialized: true
})); 

admin.set('view engine', 'jade');
admin.set('views', __dirname + '/views');
admin.use(bodyParser.urlencoded({ extended: false }));
admin.use(methodOverride('_method'));
admin.use('/static', express.static(__dirname + '/static'));    


module.exports = function(userDefined) {
    var userDefined = userDefined || {};

    var options = require('./options')(userDefined);
    
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

    // need something more robust down the road...
    if(process.env.NODE_ENV === 'test') {
        admin.use(function (req, res, next) {
            req.session.isLoggedIn = true;
            next();
        });
    }

    strategy = new Strategy(options);
    
    admin.use(strategy.middleware.bind(strategy));
    admin.post('/', strategy.login.bind(strategy));

    admin.get('/', routes.main);
    admin.post('/:collection/suggest', routes.suggest);
    admin.get('/:collection', routes.collection);
    admin.get('/:collection/:doc', routes.doc);
    admin.post('/:collection/:doc', routes.doc);
    admin.delete('/:collection/:doc', routes.doc);
    
    return admin;
};