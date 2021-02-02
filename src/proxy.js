// Listen on a specific host via the HOST environment variable
const host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
const port = process.env.PROXY_PORT || 8085;

const querystring = require('querystring');

const cors_proxy = require('cors-anywhere').createServer({
  originWhitelist: [], // Allow all origins
  //requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2'],
});

const GEONAMES_APIKEY = 'raitis';

const fs = require('fs');
require('http')
  .createServer((req, res) => {
    if (req.url.indexOf('semex.io') > -1) {
      req.url = req.url + '&api_key=1f591220df2b71088c96b1434f4d06d641737994';
    }
    if (req.url.indexOf('/searchJSON') > -1) {
      const params = querystring.decode(req.url.split('?')[1]);
      if (
        typeof params.provider == 'undefined' ||
        params.provider == 'geonames'
      ) {
        req.url = `/http://api.geonames.org/searchJSON?name_startsWith=${encodeURIComponent(
          params.name_startsWith
        )}&username=${GEONAMES_APIKEY}`;
      }
    }
    if (req.url.indexOf('http:/') > -1 && req.url.indexOf('http://') == -1) {
      req.url = req.url.replace('http:/', 'http://');
    }
    if (req.url.indexOf('https:/') > -1 && req.url.indexOf('https://') == -1) {
      req.url = req.url.replace('https:/', 'https://');
    }
    cors_proxy.emit('request', req, res);
  })
  .listen(port, host, () => {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
  }); // Listen on port 8080.
