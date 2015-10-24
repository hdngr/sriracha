// var options = advancedOptions;
debugger;
var mock = require('../examples/simple/mock');
var users = mock.createUsers();
var user = users[0];
var AdminModel = require('../AdminModel');
var should = require('should');

describe('admin model tests', function() {
    
    var User;
    
    before(function(done) {
        adminUser = new AdminModel(user);
        done();
    });

    it('plural name should be capitalized with an s at the end', function() {
        console.log(adminUser);
        adminUser.pluralName.should.equal('Users');
    });
})