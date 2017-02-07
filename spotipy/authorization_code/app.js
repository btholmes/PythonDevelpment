/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '96b5706aae2a49989ed8c0c8ae57004e'; // Your client id
var client_secret = '6d2af12564b34d76b8602fdabf27da89'; // Your secret
// This is where the client will be sent after a successful login
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

// This says to display index.html from public directory
// __dirname is a node.js variable containing the directory where this script resides i.e. authoriziation_code
app.use(express.static(__dirname + '/public'))
    // cookieparser parses cookies and populates the req.cookies variable
   .use(cookieParser());

app.get('/login', function(req, res) {

  console.log("login function app.get()");

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  // Link with all scope options for more info https://developer.spotify.com/web-api/using-scopes/
  var scope = 'user-read-private user-read-email';

  // res.redirect("https://accounts.spotify.com/en/authorize?response_type=code&client_id=96b5706aae2a49989ed8c0c8ae57004e&scope=user-read-private%20user-read-email&redirect_uri=http:%2F%2Flocalhost:8888%2Fcallback&state=02EWrJOX9mZjm7CD");
  // The one above and below are the same thing
  res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
    );
});

// This is what we set as our redirect_uri, we get sent here after login is successfful
app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter
  console.log("app.get callback ");

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  // alert("app.get");
  console.log("refresh token in app.js");
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});


//          This is how the shell command would look
//          curl -X GET "https://api.spotify.com/v1/me/tracks" -H "Authorization: Bearer {your access token}"
app.get('/get_music', function(req, res) {

  var access_token = req.query.access_token;

  var authOptions = {
    url: 'https://api.spotify.com/v1/me/tracks',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    // console.log("in post : " + JSON.stringify(body));
    if (!error) {
      res.send({
        'data' : body
      });
    }else {export SPOTIPY_CLIENT_ID='ID'
      console.log("error in post ");
    }
  });

});

console.log('Listening on 8888');
// This starts the server on port 8888, as far as I can tell. Comment out the code below and server won't start
app.listen(8888);
