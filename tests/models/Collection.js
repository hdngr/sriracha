'use strict';
// var options = advancedOptions;
// var mock = require('../../examples/simple/mock');
// var User = require('../../examples/simple/models/User');
// var users = mock.createUsers();
// var user = users[0];
var Collection = require('../../models/Collection');
var options = require('../../Options')();
var should = require('should');

describe('siracha model tests', function() {
    
    var User;
    
    before(function(done) {
        var User = require('../../examples/simple/models/User');
        Collection = new Collection(User, options);
        done();
    });

    after(function(done) {
        // Collection = new Collection(User);
        done();
    });

    it('plural name should be capitalized with an s at the end', function(done) {
        Collection.pluralName.should.equal('Users');
        done();
    });
})