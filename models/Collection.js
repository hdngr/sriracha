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

    _.extend(Collection, statics);

    return Collection

};