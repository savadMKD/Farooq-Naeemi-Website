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
  res.render('admin/home');
});

// rendering login page
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

// Rendering admins Page
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

// rendering ramadan page 
router.get('/ramadan', verify_login, (req, res) => {
  speechcontroller.getAllRamadanSpeeches().then((Speeches) => {
    res.render('admin/ramadan', { Speeches });
  });
})

// Delete Ramadan speeches
router.get('/delete_ramadan/:id', (req, res) => {
  let speech_id = req.params.id;
  speechcontroller.deleteRamadanSpeeches(speech_id).then((response) => {
    res.redirect('/admin/ramadan');
  });
});

// Edit Ramadan Speech
router.get('/edit_ramadan/:id', verify_login, async (req, res) => {
  let speeches = await speechcontroller.getRamadanSpeechDeatils(req.params.id);
  res.render('admin/edit_ramadan', { speeches });
});

router.post('/edit_ramadan/:id', (req, res) => {
  let speech_id = req.params.id;
  speechcontroller.updateRamadanSpeech(speech_id, req.body).then(() => {
    res.redirect('/admin/ramadan');
    if(req.files.Image){
      let image = req.files.Image;
      image.mv("./public/ramadan_speeches/" + speech_id + ".jpg");
    }
  });
});

module.exports = router;