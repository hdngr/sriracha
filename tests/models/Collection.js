'use strict';

var Collection = require('../../lib/models/Collection');
var options = require('../../lib/options')();
var should = require('should');

describe('Collection', function() {

    var User;
    var Post;
    var UserCol;
    var PostCol;

    before(function(done) {
        User = require('../../examples/advanced/models/User');
        Post = require('../../examples/advanced/models/Post');
        UserCol = Collection(User, options);
        PostCol = Collection(Post, options);
        done();
    });
    
    describe('.find .findOne .remove', function() {
        it('should contain mongoose Model methods', function() {
            UserCol.find.should.be.a.Function
            UserCol.findOne.should.be.a.Function
            UserCol.remove.should.be.a.Function
        })
    });

    describe('.pluralName', function() {
        it('should be capitalized with an s at the end', function() {
            UserCol.pluralName.should.equal('Users');
            PostCol.pluralName.should.equal('Posts');
        })
    });

    describe('.getPathType', function() {
        it('should return "text" for a String schema type', function() {
            UserCol.getPathType('firstName').should.equal('text');
        });

        it('should return "checkbox" for a Boolean schema type', function() {
            UserCol.getPathType('onboarding.hasLoggedIn').should.equal('checkbox');
        });

        it('should return "ref" for an ObjectId schema type', function() {
            PostCol.getPathType('author').should.equal('ref');
        });
    });

})