var express = require('express');
var router = express.Router();
var request = require('sync-request');
var userModel = require('../models/users'); // importation model

// Import libairie bcrypt and module uid2
var bcrypt = require('bcrypt');
var uid2 = require('uid2');

// Nb of tours to encrypt password
const cost = 10;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// POST sign-up
router.post('/sign-up', async function (req, res, next) {
  let notExist = false;
  let message = 'Email or password is empty';
  let token = '';
  if (
    req.body.email.length !== 0 &&
    req.body.pwd.length !== 0 &&
    req.body.name.length !== 0
  ) {
    let user = await userModel.findOne({
      email: req.body.email,
    });
    if (user) {
      message = 'Account already exist';
    } else {
      notExist = true;
    }

    if (notExist === true) {
      const hashPwd = bcrypt.hashSync(req.body.pwd, cost);
      let newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        pwd: hashPwd,
        token: uid2(32),
      });

      let newUserSaved = await newUser.save();
      
      message = '';
      token = newUser.token
    }
  }
  res.json({ notExist, message, token });
});

// POST sign-in
router.post('/sign-in', async function (req, res, next) {
  let isExist = false;
  let message = 'Email or password is empty';
  let token = '';
  if (req.body.email.length !== 0 && req.body.pwd.length !== 0) {
    let user = await userModel.findOne({
      email: req.body.email,
    });

    if (bcrypt.compareSync(req.body.pwd, user.pwd)) {
      isExist = true;
      message = '';
      token = user.token

    } else {
      message = 'Verify your password or your email';
    }
  }
  res.json({ isExist, message, token });
});

module.exports = router;
