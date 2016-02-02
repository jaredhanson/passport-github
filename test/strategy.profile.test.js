/* global describe, it, before, expect */
/* jshint expr: true */

var GitHubStrategy = require('../lib/strategy');


describe('Strategy#userProfile', function() {
    
  describe('fetched from default endpoint', function() {
    var strategy =  new GitHubStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, function() {});
  
    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://api.github.com/user') { return callback(new Error('wrong url argument')); }
      if (accessToken != 'token') { return callback(new Error('wrong token argument')); }
    
      var body = '{ "login": "octocat", "id": 1, "name": "monalisa octocat", "email": "octocat@github.com", "html_url": "https://github.com/octocat" }';
      callback(null, body, undefined);
    };
    
    
    var profile;
    
    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.provider).to.equal('github');
      
      expect(profile.id).to.equal('1');
      expect(profile.username).to.equal('octocat');
      expect(profile.displayName).to.equal('monalisa octocat');
      expect(profile.profileUrl).to.equal('https://github.com/octocat');
      expect(profile.emails).to.have.length(1);
      expect(profile.emails[0].value).to.equal('octocat@github.com');
    });
    
    it('should set raw property', function() {
      expect(profile._raw).to.be.a('string');
    });
    
    it('should set json property', function() {
      expect(profile._json).to.be.an('object');
    });
  }); // fetched from default endpoint
  
  describe('internal error', function() {
    var strategy =  new GitHubStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, function() {});
  
    strategy._oauth2.get = function(url, accessToken, callback) {
      return callback(new Error('something went wrong'));
    }
    
    
    var err, profile;
    
    before(function(done) {
      strategy.userProfile('wrong-token', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });
    
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal('InternalOAuthError');
      expect(err.message).to.equal('Failed to fetch user profile');
      expect(err.oauthError).to.be.an.instanceOf(Error);
      expect(err.oauthError.message).to.equal('something went wrong');
    });
    
    it('should not load profile', function() {
      expect(profile).to.be.undefined;
    });
  }); // internal error
  
});
