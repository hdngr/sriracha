'use strict';

var main = require('../../lib/controllers/main'),
    advanced = require('../utils').advanced;


describe('main', function() {

    // before(function(done) {
    //     var result = advanced.start();
    //     agent = result[0];
    //     server = result[1];
    //     agent.post('/crazy-mount-path/login')
    //         .type('form')
    //         .send({
    //             username: 'admin',
    //             password: 'admin'
    //         })
    //         .end(done);
    // });

    // after(function(done) {
    //     advanced.stop(server, done);
    // });

    describe('.main', function() {
        it('should render the "index" view', function() {
            var req = {};
            var res = {
                viewName: undefined,
                render: function(view) {
                    this.viewName = view;
                }
            };
            main.main(req, res);
            res.viewName.should.equal('index');
        })
    })

    
});