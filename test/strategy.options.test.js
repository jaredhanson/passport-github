/* global describe, it, expect, before */
/* jshint expr: true */

var GitHubStrategy = require('../lib/strategy');


describe('Strategy#userProfile', function() {
    
  describe('loading profile using custom URL', function() {
    var strategy =  new GitHubStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret',
        userProfileURL: 'https://github.corpDomain/api/v3/user'
      },
      function() {});
  
    // mock
    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://github.corpDomain/api/v3/user') { return callback(new Error('wrong url argument')); }
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
  });
  
});
