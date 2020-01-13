function client (apiKey){

  const https = require('https');
  const qs = require('querystring');

  this.post = function(points, callback){
    
    const options = {
      hostname: 'ss-dev-api-stamp.azurewebsites.net',
      path: '/v3/stamp',
      method: 'POST',
      headers: {
        'SnowShoe-Api-Key': apiKey,
        'Accept-Encoding': 'identity',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      //For local testing
      // ,
      // port: '5001',
      // agent: new https.Agent({
      //   rejectUnauthorized: false,
      // })
    };
    console.log(options);

    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);
      var stampData = "";
      
      res.on('data', (d) => {
        stampData += d;
      });

      res.on('end', () => {
        return callback(null, JSON.parse(stampData));
      })

    });

    req.on('error', (error) => {
      console.error(error);
      return callback(JSON.parse(error), null);
    });
    
    req.write(qs.stringify(points));
    req.end();
  };

}

exports.client = client;