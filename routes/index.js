var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.sendFile('/index2.html');
// });

router.get('/video', function(req, res, next) {
  res.redirect('/video.html');
});

module.exports = router;
