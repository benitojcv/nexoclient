var express = require('express');
var request = require('request');
var moment = require('moment');
var entities = require('../services/entities');
var router = express.Router();

router.get('/entities/:user', function(req, res, next) {
  console.log('OK GET ' + req.params.user);
  res.send({'OK2 ' : req.params.user});
});

router.put('/entities/:user/attrs/:attribute', function(req, res, next) {
  var ts = moment().format();

  entities.updateUserAttribute(req.params.user, req.params.attribute).then(function(req1) {
    console.log('OK PUT ' + req.params.user + ' - ' + req.params.attribute + ' - '+ ts);
    res.status(req1.statusCode).send();
  }).catch(function(error) {
    // Si no se puede actualizar el atributo porque el usuario no existe,
    // se crea el usuario y se repite la operacion de actualizacion
    entities.createUser(req.params.user).then(function(req2) {
      entities.updateUserAttribute(req.params.user, req.params.attribute).then(function(req3) {
        console.log('OK PUT ' + req.params.user + ' - ' + req.params.attribute + ' - '+ ts);
        res.status(req3.statusCode).send();
      }).catch(function(error) {
        res.status(500).send("ERROR: Could not update entity " + req.params.user);
      });
    }).catch(function(error) {
      res.status(500).send("ERROR: Could not create entity " + req.params.user);
    });
  });
});

module.exports = router;
