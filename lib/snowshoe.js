function client (appKey, appSecret){
  var OAuth = require('OAuth');

  this.oauth = new OAuth.OAuth(
    'http://beta.snowshoestamp.com/oauth/request_token',
    'http://beta.snowshoestamp.com/oauth/access_token',
    appKey,
    appSecret,
    '1.0',
    null,
    'HMAC-SHA1'
  ),

  this.post = function(points, response, callback){
    this.oauth.post(
      'http://beta.snowshoestamp.com/api/v2/stamp',
      '',
      '',
      points,
      function (error, data, oauth_response){
        if (error) {
          return callback(error, null, response);
        };
        data = JSON.parse(data);
        callback(null, data, response);
      }
    )
  }
}

exports.client = client;
