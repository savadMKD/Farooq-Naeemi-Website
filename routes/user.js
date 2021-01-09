var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/home');
});

router.get('/ramadan', (req, res) => {
  res.render('user/ramadan');
});

module.exports = router;