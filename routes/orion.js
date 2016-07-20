var express = require('express');
var router = express.Router();

router.get('/entities/:user', function(req, res, next) {
  console.log('OK GET ' + req.params.user);
  res.send({'OK2 ' : req.params.user});
});

router.put('/entities/:user/attrs/:attribute', function(req, res, next) {
  console.log('OK PUT ' + req.params.user);
  res.send({'OK ' : req.params.user + ' - ' + req.params.attribute});
});

module.exports = router;
