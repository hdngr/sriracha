'use strict';

var _ = require('lodash');

module.exports = function(doc, options) {
    var Document = doc;
    options = options || {};
    // var statics = {
    //     pluralName: Collection.modelName + 's',
    //     adminFields: []
    // }
    
    // var paths = Collection.schema.paths;
    // for (var path in paths) {
    //     if(paths[path].options.admin !== false && options.hideFields.indexOf(path) === -1) {
    //         statics.adminFields.push(path);
    //     }
    // }

    var methods = {
        getFieldType: function(field) {
            var path = doc.schema.path(field);
            if(!path.options.adminFieldType) {
                switch (doc.schema.path(field).instance) {
                    case 'String':
                        return 'text';
                        break;
                    case 'Boolean':
                        return 'checkbox';
                        break;
                    case 'ObjectID': // need better logic for multiple docs
                        return 'ref'; // vs single documents
                        break;
                    default:
                        return 'text';
                        break;
                }
            };
            return path.options.adminFieldType
        }
    };

    _.assign(doc, methods);

    return doc
};