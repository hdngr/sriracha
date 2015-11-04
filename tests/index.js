'use strict';

process.env.NODE_ENV = 'test';

describe('end to end tests', function() {
    require('./simple-e2e');
    require('./advanced-e2e');
});

describe('models', function() {
    require('./models/Collection');
    require('./models/Document');
});

describe('controllers', function() {
    require('./controllers/main');
});
