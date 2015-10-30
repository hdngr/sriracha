'use strict';

var _ = require('lodash');

module.exports = function(MongooseModel, options) {
    
    var Collection = MongooseModel;
    
    Collection.sirachaOptions = options;

    options[Collection.modelName] = options[Collection.modelName] || {} 

    var statics = {
        pluralName: Collection.modelName + 's',
        adminFields: [],
        searchField: options[Collection.modelName].searchField || false
    };
    
    var paths = Collection.schema.paths;
    
    for (var path in paths) {
        if(paths[path].options.admin !== false && options.hideFields.indexOf(path) === -1) {
            statics.adminFields.push(path);
        }
    }

    var methods = {
        getFieldType: function(field) {
            var path = Collection.schema.path(field);
            if(!path.options.adminFieldType) {
                switch (path.instance) {
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

    _.extend(Collection, statics, methods);

    return Collection

};