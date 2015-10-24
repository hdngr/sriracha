'use strict';

var _ = require('lodash');

module.exports = {
    main: function(req, res, next) {
        // if(!req.user || !req.user.isAdmin()) {
        //     return res.render('login');
        // }
        var user = req.user || {};
        res.render('index', {user: user});
    },
    loginForm: function(req, res) {
        // if this is called, login was successful.
        if(!req.user.isAdmin()) {
            return res.send(401)
        }
    },
    profile: function(req, res) {
        res.send("This is the profile page!");
    },
    collection: function(req, res) {
        var collection = req.params.collection;
        var collections = req.app.locals.collections;
        var collectionNames = req.app.locals.collectionNames;
        var collectionName = collectionNames[collection];
        var Collection = collections[collectionName];
        Collection.find({}, function(err, docs) {
            if(err) res.send(500);
            res.render('collection', {docs: docs, Collection: Collection});
        });
    },
    modelDetail: function(req, res) {
        var collection = req.params.collection;
        var models = req.app.locals.AdminModels;
        var docId = req.params.doc;

        var Model = models.filter(function(model) {
            return collection === model.collection.name;
        })[0];
        
        Model.findById(id, function(err, doc) {
            res.render('model', {doc: doc, Model: Model});
        });
        res.render('model');
    }
};