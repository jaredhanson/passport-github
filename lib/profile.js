/**
 * Parse profile.
 *
 * @param {Object|String} json
 * @return {Object}
 * @api private
 */
exports.parse = function(json) {
  if ('string' == typeof json) {
    json = JSON.parse(json);
  }
  
  var profile = {};
  profile.id = String(json.id);
  profile.displayName = json.name;
  profile.username = json.login;
  profile.profileUrl = json.html_url;
  profile.photos = [{value: json.avatar_url}];
  if (json.email && json.email.length > 0) {
    profile.emails = [];
    for(var i in json.email) {
      profile.emails.push({ value: json.email[i].email });
    }
  }
  
  return profile;
};
