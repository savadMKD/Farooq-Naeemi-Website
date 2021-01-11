const { response } = require('express');
var express = require('express');
const { admin_login } = require('../controller/authcontroller');
const authcontroller = require('../controller/authcontroller');
var router = express.Router();

// -------- Checking admin is logged in
const verify_login = (req, res, next) => {
  if(req.session.logged_in){
    next();
  }
  else {
    res.redirect('/admin/login');
  }
}

/* GET users listing. */
router.get('/', verify_login, function(req, res, next) {
  res.render('user/home');
});

router.get('/login', (req, res) => {
  let admin_login_error = req.session.login_error;
  if(req.session.logged_in){
    res.redirect('/admin');
  }
  else {
    res.render('auth/login', { admin_login_error });
    req.session.logged_in = false;
  }
});

router.post('/login', (req, res) => {
  authcontroller.admin_login(req.body).then((response) => {
    if(response.status){
      req.session.logged_in = true;
      res.redirect('/admin');
    }
  }).catch((response) => {
    req.session.login_error = "Username or Password is incorrect";
    res.redirect('/admin/login');
  });
});

module.exports = router;
