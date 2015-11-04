#Contributing
TODO - Clean Up
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
Read more about tests in [tests/tests.md](./tests/tests.md).