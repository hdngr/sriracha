'use strict';

var _ = require('lodash');

module.exports = function(MongooseModel, options) {
    
    var Collection = MongooseModel;
    
    Collection.sirachaOptions = options;

    options[Collection.modelName] = options[Collection.modelName] || {} 

    // move options to their own options property to make
    // managing multiple options easier
    var statics = {
        pluralName: Collection.modelName + 's',
        adminPaths: [],
        searchField: options[Collection.modelName].searchField || false
    };
    
    Collection.schema.paths;
    
    for (var path in Collection.schema.paths) {
        options[path] = options[path] || {};
        if((Collection.schema.paths[path].options.admin !== false || options[path].admin !== false) && options.hideFields.indexOf(path) === -1) {
            statics.adminPaths.push(path);
        }
        if(Collection.schema.paths[path].options.adminSearchField) {
            statics.searchField = path;
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
                    case 'ObjectID':
                        if(leaf.options.ref) {
                            return 'ref';
                        } else {
                            return 'text';
                        }
                        break;
                    case 'Array':
                        return 'array';
                        break;
                    case 'Date':
                        return 'date';
                        break;
                    default:
                        return 'text';
                        break;
                }
            };
            return leaf.options.adminFieldType
        }
    };

    _.extend(Collection, statics, methods);

    return Collection

};