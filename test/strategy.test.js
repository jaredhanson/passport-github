/* global describe, it, expect */
/* jshint expr: true */

var $require = require('proxyquire')
  , chai = require('chai')
  , util = require('util')
  , path =require('path')
  , fs = require('fs')
  , existsSync = fs.existsSync || path.existsSync // node <=0.6
  , GitHubStrategy = require('../lib/strategy');


describe('Strategy', function() {
  
  describe('constructed', function() {
    var strategy = new GitHubStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, function() {});
    
    it('should be named github', function() {
      expect(strategy.name).to.equal('github');
    });

    it('should have default user agent', function() {
      expect(strategy._oauth2._customHeaders['User-Agent']).to.equal('passport-github');
    });
  })
  
  describe('constructed with undefined options', function() {
    it('should throw', function() {
      expect(function() {
        var strategy = new GitHubStrategy(undefined, function(){});
      }).to.throw(Error);
    });
  })
  
  describe('constructed with customHeaders option, including User-Agent field', function() {
    var strategy = new GitHubStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      customHeaders: { 'User-Agent': 'example.test' }
    }, function() {});
  
    it('should set user agent as custom header in underlying OAuth 2.0 implementation', function() {
      expect(strategy._oauth2._customHeaders['User-Agent']).to.equal('example.test');
    });
  });
  
  describe('constructed with userAgent option', function() {
    var strategy = new GitHubStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      userAgent: 'example.test'
    }, function() {});
  
    it('should set user agent as custom header in underlying OAuth 2.0 implementation', function() {
      expect(strategy._oauth2._customHeaders['User-Agent']).to.equal('example.test');
    });
  });
  
  describe('constructed with both customHeaders option, including User-Agent field, and userAgent option', function() {
    var strategy = new GitHubStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      customHeaders: { 'User-Agent': 'example.org' },
      userAgent: 'example.net'
    }, function() {});
  
    it('should set user agent as custom header in underlying OAuth 2.0 implementation', function() {
      expect(strategy._oauth2._customHeaders['User-Agent']).to.equal('example.org');
    });
  });
  
  describe('error caused by invalid code sent to token endpoint, with response erroneously indicating success', function() {
    var OAuth2Strategy = require('passport-oauth2').Strategy;
    var OAuth2;
    if (existsSync('node_modules/oauth')) { // npm 3.x
      OAuth2 = require('oauth').OAuth2;
    } else {
      OAuth2 = require('passport-oauth2/node_modules/oauth').OAuth2;
    }
    
    var MockOAuth2Strategy = function(options, verify) {
      OAuth2Strategy.call(this, options, verify);
      
      this._oauth2 = new OAuth2(options.clientID,  options.clientSecret,
        '', options.authorizationURL, options.tokenURL, options.customHeaders);
      this._oauth2.getOAuthAccessToken = function(code, options, callback) {
        return callback(null, undefined, undefined, {
          error: 'bad_verification_code',
          error_description: 'The code passed is incorrect or expired.',
          error_uri: 'https://developer.github.com/v3/oauth/#bad-verification-code' });
      };
    }
    util.inherits(MockOAuth2Strategy, OAuth2Strategy);
    
    var GitHubStrategy = $require('../lib/strategy', {
      'passport-oauth2': MockOAuth2Strategy
    })
    
    var strategy = new GitHubStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, function() {});
    
    
    var err;

    before(function(done) {
      chai.passport.use(strategy)
        .error(function(e) {
          err = e;
          done();
        })
        .req(function(req) {
          req.query = {};
          req.query.code = 'SplxlOBeZQQYbYS6WxSbIA+ALT1';
        })
        .authenticate();
    });

    it('should error', function() {
      expect(err.constructor.name).to.equal('TokenError');
      expect(err.message).to.equal('The code passed is incorrect or expired.');
      expect(err.code).to.equal('bad_verification_code');
    });
  }); // error caused by invalid code sent to token endpoint, with response erroneously indicating success
  
  describe('error caused by invalid code sent to token endpoint, with response correctly indicating success', function() {
    var OAuth2Strategy = require('passport-oauth2').Strategy;
    var OAuth2;
    if (existsSync('node_modules/oauth')) { // npm 3.x
      OAuth2 = require('oauth').OAuth2;
    } else {
      OAuth2 = require('passport-oauth2/node_modules/oauth').OAuth2;
    }
    
    var MockOAuth2Strategy = function(options, verify) {
      OAuth2Strategy.call(this, options, verify);
      
      this._oauth2 = new OAuth2(options.clientID,  options.clientSecret,
        '', options.authorizationURL, options.tokenURL, options.customHeaders);
      this._oauth2.getOAuthAccessToken = function(code, options, callback) {
        return callback({
          statusCode: 401,
          data: '{"error":"bad_verification_code","error_description":"The code passed is incorrect or expired.","error_uri":"https://developer.github.com/v3/oauth/#bad-verification-code"}' });
      };
    }
    util.inherits(MockOAuth2Strategy, OAuth2Strategy);
    
    var GitHubStrategy = $require('../lib/strategy', {
      'passport-oauth2': MockOAuth2Strategy
    })
    
    var strategy = new GitHubStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, function() {});
    
    
    var err;

    before(function(done) {
      chai.passport.use(strategy)
        .error(function(e) {
          err = e;
          done();
        })
        .req(function(req) {
          req.query = {};
          req.query.code = 'SplxlOBeZQQYbYS6WxSbIA+ALT1';
        })
        .authenticate();
    });

    it('should error', function() {
      expect(err.constructor.name).to.equal('TokenError');
      expect(err.message).to.equal('The code passed is incorrect or expired.');
      expect(err.code).to.equal('bad_verification_code');
    });
  }); // error caused by invalid code sent to token endpoint, with response correctly indicating success
  
});
