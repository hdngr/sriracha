'use strict';

class Strategy {
    constructor(options) {
        this.passport = options.passport;
        this.username = options.username;
        this.password = options.password;
    }

    middleware(req, res, next) {
        if (!this.passport) {
            if(req.session.isLoggedIn || (req.method === 'POST' && req.path === '/')) {
                return next();
            }
            res.locals.redirect = req.app.locals.appPath + req.path;
            return res.render('login');
        } else {
            return this.passport;
        }
    }

    login(req, res, next) {
        // safeguard: don't use this 
        // if passport is defined!
        var redirect = req.query.redirect;
        if(!this.passport) {
            if (req.body.username !== this.username || req.body.password !== this.password) {
                var message = "Looks like you've got the wrong username or password!"
                req.session.message.error.push(message);
                // loops back through middleware
                return res.redirect(redirect)
            } else {
                req.session.isLoggedIn = true;
                return res.redirect(redirect);
            }
        }
        res.send(500);
    }
};

module.exports = Strategy;