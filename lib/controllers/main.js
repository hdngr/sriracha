'use strict';

var _ = require('lodash'),
    Doc = require('../models/Document'),
    paginate = require('../utils/paginate');

function handleMessage(session, type, message) {
    session.message[type].push(message);
};

module.exports = {
    main: function(req, res, next) {
        res.render('index', {pageId: 'index'});
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
        if (!criteria) {
            res.locals.criteria = criteria = 1
        } else {
            res.locals.criteria = criteria = -criteria
        }

        var sort;
        if (sortField) {
            sort = {};
            sort[sortField] = criteria;
        }

        Collection.find({})
            .limit(perPage)
            .skip(perPage * page)
            .sort(sort) // default sorting parameter from options...
            .exec(function(err, docs) {
                Collection.count().exec(function(err, count) {
                    if(err) handleMessage(req.session, 'error', err.errors)
                    // handleMessage('error', err.errors)
                    res.render('collection', {
                        pageId: 'collection',
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
            doc = Doc(doc, null, collections);
            res.locals.pageId = 'doc';
            switch (req.method) {
                case "GET":
                    if (!doc) {
                        handleMessage(req.session, 'error', "It doesn't look like there is a document with that id.");
                    };
                    res.render('doc', {
                        doc: doc,
                        Collection: Collection,
                        errors: {},
                        id: id
                    });
                    break;
                case "POST":
                    Object.keys(req.body).forEach(function(path) {
                        var type = Collection.getPathType(path);
                        var val = req.body[path];
                        if(type === 'array') {
                            val = val.split(',');
                        }
                        doc.set(path, val);
                    });
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
                            handleMessage(req.session, 'error', "Oops! Looks like there was a problem deleting the document!");
                            return res.render('doc', {
                                doc: doc,
                                Collection: Collection,
                                errors: err.errors || {}
                            });
                        };
                        var message = "Doc " + doc.id + " deleted successfully!";
                        handleMessage(req.session, 'success', message);
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
    },
    suggest: function(req, res) {
        var term = req.body.term;

        var collection = req.params.collection;
        var collections = req.app.locals.collections;
        var collectionNames = req.app.locals.collectionNames;
        var collectionName = collectionNames[collection];
        var Collection = collections[collectionName];

        var query = {};
        query[Collection.searchField] = new RegExp(term, 'i');
        Collection.find(query)
            .select(Collection.searchField + ' id')
            .limit(10)
            .exec(function(err, docs) {
                var results = _.map(docs, function(doc) {
                    return {
                        value: doc[Collection.searchField],
                        id: doc.id
                    }
                });
                res.json(results);
            });
    },
    newDoc: function(req, res) {
        var collections = req.app.locals.collections;
        var collection = req.app.locals.collectionNames[req.params.collection];
        var id = req.params.doc;
        var Collection = collections[collection];
        var appPath = req.app.locals.appPath;
        var doc = new Collection();
        switch (req.method) {
            case "POST":
                Object.keys(req.body).forEach(function(path) {
                    var type = Collection.getPathType(path);
                    var val = req.body[path];
                    if(type === 'array') {
                        val = val.split(',');
                    }
                    doc.set(path, val);
                });
                doc.save(function(err) {
                    if (err) {
                        handleMessage(req.session, 'error', 'There was a problem saving the document!  Try again.');
                        return res.render('doc', {
                            doc: doc,
                            Collection: Collection,
                            errors: err.errors || {}
                        });
                    }
                    handleMessage(req.session, 'success', Collection.modelName + " created successfully!");
                    res.redirect(doc.id);
                });
                break;
            default:
                // e.g. GET and DELETE
                res.render('doc', {
                    pageId: 'new-doc',
                    doc: doc,
                    Collection: Collection,
                    errors: {},
                    id: id
                });
                break;

        };
    }
}