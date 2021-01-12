var express = require('express');
const speechcontroller = require('../controller/speechcontroller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/home');
});

router.get('/ramadan', (req, res) => {
  speechcontroller.getAllRamadanSpeeches().then((Speeches) => {
    res.render('user/ramadan', { Speeches });
  });
});

module.exports = router;