const { response } = require('express');
var express = require('express');
const authcontroller = require('../controller/authcontroller');
const speechcontroller = require('../controller/speechcontroller');
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

router.get('/add_ramadan', verify_login, (req, res) => {
  res.render('admin/add_ramadan');
});

router.post('/add_ramadan', (req, res) => {
  speechcontroller.add_ramadan_speech(req.body).then((speech_id) => {
    let image = req.files.Image
    image.mv("./public/ramadan_speeches/" + speech_id + ".jpg", (err) => {
      if(!err) res.redirect('/admin/add_ramadan');
      else console.log(err);
    });
  });
});

module.exports = router;
