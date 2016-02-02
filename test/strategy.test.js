/* global describe, it, expect */
/* jshint expr: true */

var GitHubStrategy = require('../lib/strategy');


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
  
});
