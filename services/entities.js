var request = require('request');
var moment = require('moment');
var config = require('../config');

var ORION_URL = config.orion_url;

module.exports = {
  updateUserAttribute: function(user, attr) {
    return new Promise(function(resolve, reject) {
      request({
        url: ORION_URL + '/entities/' + user + '/attrs/' + attr,
        method: 'PUT',
        json: {'value':0,'type':'Float','metadata':{'modifiedAt':{'value':moment().format(),'type':'DateTime'}}}
      }, function(error, request, body){
        if (request.statusCode != 204) {
          reject(error);
        }
        resolve(request);
      });
    });
  },
  createUser: function(user) {
    return new Promise(function(resolve, reject) {
      //FIXME: No usar geolocalizacion fija para el usuario
      request({
        url: ORION_URL + '/entities',
        method: 'POST',
        json: {
                "id": user,
                "type": "User",
                "status": {
                  "value": "none",
                  "type": "String"
                },
                "location": {
                  "value": "28.4774247,-16.2463847",
                  "type": "geo:point"
                },
                "temperature": {
                  "value": "0",
                  "type": "Float"
                },
                "event_pause": {
                  "value": 0,
                  "type": "Float",
                  "metadata": {
                    "modifiedAt": {
                      "value": "2016-07-21T12:56:56.00Z",
                      "type": "DateTime"
                    }
                  }
                },
                "event_play": {
                  "value": 0,
                  "type": "Float",
                  "metadata": {
                    "modifiedAt": {
                      "value": "2016-07-21T12:56:56.00Z",
                      "type": "DateTime"
                    }
                  }
                }
              }
      }, function(error, request, body){
        if (error) {
          console.log(user + " creation failed!!!");
          reject(error);
        }
        console.log(user + " created!!!");
        resolve(request);
      });
    });
  }
};
