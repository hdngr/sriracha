'use strict';

var _ = require('lodash'),
    Doc = require('../models/Document'),
    paginate = require('../utils/paginate');

module.exports = {
    main: function(req, res, next) {
        // if(!req.user || !req.user.isAdmin()) {
        //     return res.render('login');
        // }
        var user = req.user || {};
        res.render('index', {
            user: user
        });
    },
    loginForm: function(req, res) {
        // if this is called, login was successful.
        if (!req.user.isAdmin()) {
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

        var perPage = 10
        var page = req.query.page > 0 ? req.query.page : 0

        Collection.find({})
            .limit(perPage)
            .skip(perPage * page)
            // .sort() default sorting parameter from options...
            .exec(function(err, docs) {
                Collection.count().exec(function(err, count) {
                    if (err) res.send(500);
                    res.render('collection', {
                        docs: docs,
                        Collection: Collection,
                        page: page,
                        pages: count / perPage,
                        paginate: paginate(req, res)
                    });
                });
            });
    },
    doc: function(req, res) {
        var collections = req.app.locals.collections;
        var collection = req.app.locals.collectionNames[req.params.collection];
        var id = req.params.doc;
        var Collection = collections[collection];

        Collection.findById(id, function(err, doc) {
            doc = Doc(doc);
            switch (req.method) {
                case "GET":
                    res.render('doc', {
                        doc: doc,
                        Collection: Collection,
                        errors: {}
                    });
                    break;
                case "POST":
                    _.assign(doc, req.body);
                    doc.save(function(err) {
                        err = err || {};
                        res.render('doc', {
                            doc: doc,
                            Collection: Collection,
                            errors: err.errors || {}
                        });
                    });
                    break;
                default:
                    debugger;
            }
        });
        // res.render('model');
    },
};