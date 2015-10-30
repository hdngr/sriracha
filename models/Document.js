'use strict';

var _ = require('lodash');

module.exports = function(doc, options, Collections) {
    options = options || {};
    var methods = {};
    var Document = doc;
    var paths = Document.schema.paths;
    
    // so dirty... 
    for(var path in paths) {
        // add ability to control population in options
        // if(path.options.ref && !options[Document.constructor.modelName][path])
        var ref = paths[path].options.ref
        if(ref) {
            Document[path]._collectionName = Collections[ref].collection.name; 
        }
    }

    _.extend(doc, methods);

    return doc
};