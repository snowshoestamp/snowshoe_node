function client (appKey, appSecret){
  var OAuth = require('oauth'),
      Q = require('q');

  this.oauth = new OAuth.OAuth(
    'http://beta.snowshoestamp.com/oauth/request_token',
    'http://beta.snowshoestamp.com/oauth/access_token',
    appKey,
    appSecret,
    '1.0',
    null,
    'HMAC-SHA1'
  ),

  this.post = function(points, callback){
    var deferred = Q.defer();
    this._postWithOAuth(points, function(error, data, oauthResponse){
      if (error) {
        deferred.reject(error);
        if (callback) { return deferred.promise.nodeify(callback(error, null, oauthResponse)) };
      }
      var data = JSON.parse(data);
      deferred.resolve(data);
      if (callback) { return deferred.promise.nodeify(callback(null, data, oauthResponse)) };
    })
    return deferred.promise;
  }

  this._postWithOAuth = function(points, callback){
    this.oauth.post(
      'http://beta.snowshoestamp.com/api/v2/stamp',
      '',
      '',
      points,
      callback
    )
  }
}

exports.client = client;
