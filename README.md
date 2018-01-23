<<<<<<< HEAD
# Passport-GitHub2

The author of Passport-Github has not maintained the original module for a long time. Features in his module don't work since Github upgraded their API to version 3.0.  We forked it and re-published it to NPM with a new name `passport-github2`.
=======
# passport-github

[![Build](https://img.shields.io/travis/jaredhanson/passport-github.svg)](https://travis-ci.org/jaredhanson/passport-github)
[![Coverage](https://img.shields.io/coveralls/jaredhanson/passport-github.svg)](https://coveralls.io/r/jaredhanson/passport-github)
[![Quality](https://img.shields.io/codeclimate/github/jaredhanson/passport-github.svg?label=quality)](https://codeclimate.com/github/jaredhanson/passport-github)
[![Dependencies](https://img.shields.io/david/jaredhanson/passport-github.svg)](https://david-dm.org/jaredhanson/passport-github)

>>>>>>> 4db6a1b1a1c8e416b830afb1a0b852020d234a90

[Passport](http://passportjs.org/) strategy for authenticating with [GitHub](https://github.com/)
using the OAuth 2.0 API.

This module lets you authenticate using GitHub in your Node.js applications.
By plugging into Passport, GitHub authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Installation

<<<<<<< HEAD
```shell
$ npm install passport-github2
=======
```bash
$ npm install passport-github
>>>>>>> 4db6a1b1a1c8e416b830afb1a0b852020d234a90
```

## Usage

#### Create an Application

Before using `passport-github`, you must register an application with GitHub.
If you have not already done so, a new application can be created at
[developer applications](https://github.com/settings/applications/new) within
GitHub's settings panel.  Your application will be issued a client ID and client
secret, which need to be provided to the strategy.  You will also need to
configure a callback URL which matches the route in your application.

#### Configure Strategy

The GitHub authentication strategy authenticates users using a GitHub account
<<<<<<< HEAD
and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which accepts
these credentials and calls `done` providing a user, as well as `options`
specifying a client ID, client secret, and callback URL.

```javascript
=======
and OAuth 2.0 tokens.  The client ID and secret obtained when creating an
application are supplied as options when creating the strategy.  The strategy
also requires a `verify` callback, which receives the access token and optional
refresh token, as well as `profile` which contains the authenticated user's
GitHub profile.  The `verify` callback must call `cb` providing a user to
complete authentication.

```js
var GitHubStrategy = require('passport-github').Strategy;

>>>>>>> 4db6a1b1a1c8e416b830afb1a0b852020d234a90
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
<<<<<<< HEAD
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
=======
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
>>>>>>> 4db6a1b1a1c8e416b830afb1a0b852020d234a90
    });
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'github'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

<<<<<<< HEAD
```javascript
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));
=======
```js
app.get('/auth/github',
  passport.authenticate('github'));
>>>>>>> 4db6a1b1a1c8e416b830afb1a0b852020d234a90

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

## Examples

<<<<<<< HEAD
For a complete, working example, refer to the [login example](https://github.com/cfsghost/passport-github/tree/master/examples/login).
=======
Developers using the popular [Express](http://expressjs.com/) web framework can
refer to an [example](https://github.com/passport/express-4.x-facebook-example)
as a starting point for their own web applications.  The example shows how to
authenticate users using Facebook.  However, because both Facebook and GitHub
use OAuth 2.0, the code is similar.  Simply replace references to Facebook with
corresponding references to GitHub.

## Contributing

#### Tests

The test suite is located in the `test/` directory.  All new features are
expected to have corresponding test cases.  Ensure that the complete test suite
passes by executing:

```bash
$ make test
```

#### Coverage

The test suite covers 100% of the code base.  All new feature development is
expected to maintain that level.  Coverage reports can be viewed by executing:
>>>>>>> 4db6a1b1a1c8e416b830afb1a0b852020d234a90

```bash
$ make test-cov
$ make view-cov
```

<<<<<<< HEAD
```shell
$ npm install --dev
$ make test
```

[![Build Status](https://secure.travis-ci.org/cfsghost/passport-github.png)](http://travis-ci.org/cfsghost/passport-github)
=======
## Support

#### Funding
>>>>>>> 4db6a1b1a1c8e416b830afb1a0b852020d234a90

This software is provided to you as open source, free of charge.  The time and
effort to develop and maintain this project is dedicated by [@jaredhanson](https://github.com/jaredhanson).
If you (or your employer) benefit from this project, please consider a financial
contribution.  Your contribution helps continue the efforts that produce this
and other open source software.

<<<<<<< HEAD
  - [Jared Hanson](http://github.com/jaredhanson)
  - [Fred Chien](http://github.com/cfsghost)
=======
Funds are accepted via [PayPal](https://paypal.me/jaredhanson), [Venmo](https://venmo.com/jaredhanson),
and [other](http://jaredhanson.net/pay) methods.  Any amount is appreciated.
>>>>>>> 4db6a1b1a1c8e416b830afb1a0b852020d234a90

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2016 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/vK9dyjRnnWsMzzJTQ57fRJpH/jaredhanson/passport-github'>  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/vK9dyjRnnWsMzzJTQ57fRJpH/jaredhanson/passport-github.svg' /></a>
