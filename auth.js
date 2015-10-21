'use strict';

module.exports = function(req, res, next, options) {
    if(req.body.username !== options.username || req.body.password !== options.password) {
        return res.send(401);
    };
    next()
};