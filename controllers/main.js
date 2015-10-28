'use strict';

var _ = require('lodash'),
    Doc = require('../models/Document'),
    paginate = require('../utils/paginate');

module.exports = {
    main: function(req, res, next) {
        var user = req.user || {};
        res.render('index');
    },
    loginForm: function(req, res) {
        // if this is called, login was successful.
        if (!req.user.isAdmin()) {
            return res.send(401)
        }
    },
    collection: function(req, res) {
        var collection = req.params.collection;
        var collections = req.app.locals.collections;
        var collectionNames = req.app.locals.collectionNames;
        var collectionName = collectionNames[collection];
        var Collection = collections[collectionName];

        var perPage = 10
        var page = req.query.page > 0 ? req.query.page : 0

        var sortField = req.query.sortField;
        var criteria = req.query.criteria;
        if(!criteria) {
            res.locals.criteria = criteria =  1
        } else {
            res.locals.criteria = criteria = -criteria
        }

        var sort;
        if(sortField) {
            sort = {};
            sort[sortField] = criteria;
        }

        Collection.find({})
            .limit(perPage)
            .skip(perPage * page)
            .sort(sort) // default sorting parameter from options...
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
        var appPath = req.app.locals.appPath;

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
                case "DELETE":
                    doc.remove(function(err) {
                        if (err) {
                            err = err || {};
                            var message = "Oops! Looks like there was an error!"
                            req.session.message.error.push(message);
                            return res.render('doc', {
                                doc: doc,
                                Collection: Collection,
                                errors: err.errors || {}
                            });
                        }
                        var message = "Doc " + doc.id + " deleted successfully!";
                        req.session.message.success.push(message);
                        res.redirect(appPath + '/' + doc.collection.name);
                    })
                    break;
                default:
                    res.render('doc', {
                        doc: doc,
                        Collection: Collection,
                        errors: {}
                    });
            }
        });
        // res.render('model');
    },
};