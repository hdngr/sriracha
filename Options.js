'use strict';

var _ = require('lodash');

module.exports = function(options) {    
    
    var defaults = {
        username: 'admin',
        password: 'admin',
        passport: false,
        adminUsersModel: 'User',
        hideFields: ['_id', '__v'],
        models: []
    };

    return _.merge(defaults, options);

};