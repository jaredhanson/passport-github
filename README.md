# Passport-GitHub2

The author of Passport-Github has not maintained the original module for a long time. Features in his module don't work since Github upgraded their API to version 3.0.  We forked it and re-published it to NPM with a new name `passport-github2`.

[Passport](http://passportjs.org/) strategy for authenticating with [GitHub](https://github.com/)
using the OAuth 2.0 API.

This module lets you authenticate using GitHub in your Node.js applications.
By plugging into Passport, GitHub authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Installation

```shell
$ npm install passport-github2
```

## Usage

#### Configure Strategy

The GitHub authentication strategy authenticates users using a GitHub account
and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which accepts
these credentials and calls `done` providing a user, as well as `options`
specifying a client ID, client secret, and callback URL.

```javascript
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'github'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```javascript
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

## Examples

For a complete, working example, refer to the [login example](https://github.com/cfsghost/passport-github/tree/master/examples/login).

## Tests

```shell
$ npm install --dev
$ make test
```

[![Build Status](https://secure.travis-ci.org/cfsghost/passport-github.png)](http://travis-ci.org/cfsghost/passport-github)

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)
  - [Fred Chien](http://github.com/cfsghost)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>

