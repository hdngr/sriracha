'use strict';

var Document = require('../../lib/models/Document');
var should = require('should');

describe('Document', function() {

    // var Post;
    // var User;
    var doc;
    // var doc;
    // var collections = {};

    before(function(done) {
        var Post = require('../../examples/advanced/models/Post');
        var User = require('../../examples/advanced/models/User');
        var collections = {'User': User };
        var user = new User();
        var post = new Post({ title: 'Some Post', author: user.id});
        doc = Document(post, null, collections);
        done();
    });

    describe('.<path>._collectionName', function() {
        it('should be created for any <path> that is a ref', function() {
            doc.author._collectionName.should.equal('users');
        })
    })

});