'use strict';

var _ = require('lodash');

module.exports = function(options) {    
    
    var defaults = {
        username: 'admin',
        password: 'admin',
        passport: undefined, // not implemented
        adminUsersModel: 'User', // not implemented
        hideFields: ['_id', '__v'], 
        models: [] // not implemented
        //collection: {
        //  searchField: undefined
        //}
    };

    return _.merge(defaults, options);

};