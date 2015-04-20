/* global describe, it, expect, before */
/* jshint expr: true */

var fs = require('fs')
  , parse = require('../lib/profile').parse;


describe('profile.parse', function() {

  describe('example profile', function() {
    var profile;

    before(function(done) {
      fs.readFile('test/data/example.json', 'utf8', function(err, data) {
        if (err) { return done(err); }
        profile = parse(data);
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.id).to.equal('1');
      expect(profile.username).to.equal('octocat');
      expect(profile.displayName).to.equal('monalisa octocat');
      expect(profile.profileUrl).to.equal('https://github.com/octocat');
      expect(profile.emails).to.have.length(1);
      expect(profile.emails[0].value).to.equal('octocat@github.com');
      expect(profile.photos).to.have.length(1);
      expect(profile.photos[0].value).to.equal('https://github.com/images/error/octocat_happy.gif');
    });
  });

  describe('example profile with null email', function() {
    var profile;

    before(function(done) {
      fs.readFile('test/data/example-null-email.json', 'utf8', function(err, data) {
        if (err) { return done(err); }
        profile = parse(data);
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.id).to.equal('1');
      expect(profile.username).to.equal('octocat');
      expect(profile.displayName).to.equal('monalisa octocat');
      expect(profile.profileUrl).to.equal('https://github.com/octocat');
      expect(profile.emails).to.be.undefined;
    });
  });

  describe('example profile with null avatar', function() {
    var profile;

    before(function(done) {
      fs.readFile('test/data/example-null-avatar.json', 'utf8', function(err, data) {
        if (err) { return done(err); }
        profile = parse(data);
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.id).to.equal('1');
      expect(profile.username).to.equal('octocat');
      expect(profile.displayName).to.equal('monalisa octocat');
      expect(profile.profileUrl).to.equal('https://github.com/octocat');
      expect(profile.photos).to.be.undefined;
    });
  });

});
