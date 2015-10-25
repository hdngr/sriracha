# WARNING: This has not been released.  Come back soon!
[![Build Status](https://travis-ci.org/hdngr/siracha.svg?branch=master)](https://travis-ci.org/hdngr/siracha)
# Siracha
An admin Express app for Mongoose models.

Siracha is an Express app that can be mounted to any url in your app.  The admin site's routes and editing interface is generated dynamically based on your Mongoose Models.  Options are available to control the look and feel of the site.

## Quick Start
...
## Options
Options can be set globally through the options object passed to admin, or on individual Mongoose Schemas.

Globally:

```
app.use('/admin', admin(models, {...}));
``` 

Schema:

```
var UserSchema = new Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: '',
    unique: true
  },
  hashed_password: {
    type: String,
    default: '',
    admin: false
    }
});
```

### Global options

**username** *default - 'admin'*    
User name used to access admin backend. 


```
    var defaults = {
        
        username: 'admin', // default login username
        password: 'admin', // default login password
        passport: false,   // passport not used 
        hideFields: ['_id', '__v']
    };

```

## Examples
...

## Contributing
Contributing is anything from filing bugs, to requesting new features and identifying what layer to expose to other users for customization, to building features and their tests.  Here's how to use this repo:

```
# fork this repo
git clone <your-awesome-fork>
cd <your-awesome-fork>
git checkout -b <your-awesome-feature>
git branch -d master

# You can serve the "simple" app in development by running
# gulp simple
# in all likelihood, you should add your feature and associated options
# to the advanced app
# serve the "advanced" app in development
gulp advanced 
# add your awesome feature
# write some tests
# run those tests
gulp test

# submit a pull request!
