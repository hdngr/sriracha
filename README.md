[![Build Status](https://travis-ci.org/hdngr/siracha.svg?branch=master)](https://travis-ci.org/hdngr/siracha)
# Siracha
An admin Express app for Mongoose models.

Siracha is an Express app that can be mounted to any url in your app.  The admin site's routes and editing interface is generated dynamically based on your Mongoose Models.  Options are available to control the look and feel of the site.

## Quick Start
...
## Options
Options can be set globally through the options object passed to siracha, or on individual Mongoose Schemas.  The cleanest way to define options related to an individual model is directly on the Schema itself.  However setting options via the options object, is offered as a convenience method.

### Setting Options Globally:

```
app.use('/admin', admin({...}));
``` 

#### Options:

**username** *default - 'admin'*    
User name used to access admin backend. 

#### Setting Options on a Schema:

```
var SomeSchema = new Schema({
  firstName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: '',
    unique: true
  },
  comments: {
    type: String,
    adminFieldType: 'textarea'
  },
  hashed_password: {
    type: String,
    default: '',
    admin: false
  },
  ...
});
```

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
Contributing is anything from filing bugs, to requesting new features, to building features and their tests.  Here's how to use this repo:

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
# debug those tests
mocha --debug-brk tests
# in another tab
node-inspector

# tests pass
# submit a pull request!
```
Read more about tests in [[tests/tests.md]].


## Acknowledgments
Thanks [Iron Summit Media Strategies](http://www.ironsummitmedia.com/) for the awesome [Start Bootstrap Themes](http://startbootstrap.com/).

Siracha started with [SB Admin](http://startbootstrap.com/template-overviews/sb-admin/) and I used [Jade Converter](http://html2jade.org/) to turn it into Jade.
