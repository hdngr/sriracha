'use strict';

process.env.NODE_ENV = 'test';

describe('Siracha test suite.', function() {
    require('./simple-e2e');
    require('./advanced-e2e');
    require('./models/Collection');
});