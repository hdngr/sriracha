'use strict';

var express = require('express'),
    controller = require('./controller');
    // User = require('../models/User');

var admin = express();

admin.set('view engine', 'jade');
admin.set('views', __dirname + '/views');
admin.use('/static', express.static(__dirname + '/static'));    

module.exports = function(models, options) {
    // todo, allow customized field interfaces and other
    // options throw mongo schema
    
    if(!models.constructor === Array) {
        models = [models];
    };
    
    // if(strategy)
    
    models.forEach(function(model) {
        for(var path in model.schema.paths) {
            if(model.schema.paths[path].options.admin !== false) {
                console.log(model.schema.paths[path].options.admin);
                model.schema.paths[path].options.admin = true;
            }
        };
        // console.dir(model.schema.paths);
    });


    admin.locals.models = models;
    
    admin.use(function(req, res, next) {
        var mountpath = admin.mountpath;
        admin.locals.appPath = mountpath;
        next();
    });

    var strategy = function(req, res, next) {
        if(options.passport) {
            return options.passport;
        } else if (options.username && options.passport) {
            return simple(req, res, next, options);
        }

    }

    // // serve static based on mount path
    // admin.get('/static/:file', function(req, res){
    //     // path to file + mount path of this app
    //     debugger;
    //     var path = req.params.path;
    //     res.sendfile(path, {root: __dirname});
    // });

    admin.set('views', __dirname + '/views');

    admin.get('/', controller.main);
    admin.post('/', strategy, controller.loginForm);

    // admin.get('/profile', controller.profile);
    admin.get('/:collection', controller.model);
    admin.get('/:collection/:doc', controller.modelDetail);
    
    return admin;
};