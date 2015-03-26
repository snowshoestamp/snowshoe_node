Snowshoe API Node.js Client
============

The Snowshoe node client submits point data to the Snowshoe API for authentication. The client will return a JSON object, containing either the serial of the matched stamp (a success!) or an error.

## Dependencies
- oauth

## Installation
```javascript
npm install snowshoe
```
```javascript
var Snowshoe = require('showshoe')
```

## Usage: Setting up the client and making a POST

On instantiation of the Snowshoe client, pass in your SNOWSHOE_APP_KEY & SNOWSHOE_APP_SECRET, respectively.

Currently, all posts are made to v2 of the API at http://beta.snowshoestamp.com/v2/stamp.

The data object is constructed from the point data sent by your front-end stamp screen.

The client will return a JSON object, containing either the serial of the matched stamp (a success!) or an error.

```javascript
var client = new Snowshoe.client(SNOWSHOE_APP_KEY, SNOWSHOE_APP_SECRET);
var data = {data: request.body.data};

// in order for the callback to behave correctly inside OAuth
// you must include the route's response object as the second argument
client.post(data, response, function(error, data, response){
  if (error) {
    // handle errors
  };
  // handle success
})
```

Below are examples of success and error JSON responses from the API.

```javascript
// Success
{
  "stamp": {
    "serial": "DEV-STAMP"
  },
  "receipt": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "secure": false,
  "created": "2015-03-24 11:27:33.014149"
}

// Error
{
  "error": {
    "message": "Stamp not found",
    "code": 32
    },
    "receipt": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "secure": false,
    "created": "2015-03-24 11:27:48.235046"
  }
```

## Tests
(Coming soon)


## Contribute
Join us in improving this client by making a pull request.

## License
MIT (see LICENSE file)
