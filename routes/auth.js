var express = require('express');
var OAuth2 = require('../oauth2').OAuth2;
var config = require('../config');

var router = express.Router();

// Config data from config.js file
var client_id = config.client_id;
var client_secret = config.client_secret;
var idmURL = config.idmURL;
var response_type = config.response_type;
var callbackURL = config.callbackURL;


console.log(client_id + "-" + client_secret + "-" + idmURL + "-" + response_type + "-" + callbackURL);

// Creates oauth library object with the config data
var oa = new OAuth2(client_id,
                    client_secret,
                    idmURL,
                    '/oauth2/authorize',
                    '/oauth2/token',
                    callbackURL);

// Redirection to IDM authentication portal
router.get('/', function(req, res) {
  console.log("Request auth!");
  var path = oa.getAuthorizeUrl(response_type);
  res.redirect(path);
});

// Handles requests from IDM with the access code
router.get('/provider/callback', function(req, res){

  // Using the access code goes again to the IDM to obtain the access_token
  oa.getOAuthAccessToken(req.query.code, function (e, results){
    // Stores the access_token in a session cookie
    req.session.access_token = results.access_token;

    res.redirect('/video');
  });
});

module.exports = router;
