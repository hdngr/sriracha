'use strict';

var _ = require('lodash');

module.exports = function(doc, options, Collections) {
    if(doc === null) return doc;
    options = options || {};
    var methods = {};
    var Document = doc;
    var paths = Document.schema.paths; 
    
    for(var path in paths) {
        // add ability to control population in options
        var ref = paths[path].options.ref
        if(ref) {
            Document[path]._collectionName = Collections[ref].collection.name; 
        }
    };

    _.extend(doc, methods);

    return doc
};