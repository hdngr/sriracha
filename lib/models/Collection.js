'use strict';

var _ = require('lodash');

module.exports = function(MongooseModel, options) {
    
    var Collection = MongooseModel;
    
    Collection.sirachaOptions = options;

    options[Collection.modelName] = options[Collection.modelName] || {} 

    var statics = {
        pluralName: Collection.modelName + 's',
        adminPaths: [],
        searchField: options[Collection.modelName].searchField || false
    };
    
    Collection.schema.paths;
    
    for (var path in Collection.schema.paths) {
        
        if(Collection.schema.paths[path].options.admin !== false && options.hideFields.indexOf(path) === -1) {
            statics.adminPaths.push(path);
        }
    }

    var methods = {
        getPathType: function(path) {
            // var branch = path.split('.');
            // if(branch.length > 1) {
            //     return 'object'
            // };
            var leaf = Collection.schema.path(path);

            if(!leaf.options.adminFieldType) {
                switch (leaf.instance) {
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