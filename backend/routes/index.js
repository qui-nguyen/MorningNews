var express = require("express");
var router = express.Router();
var request = require("sync-request");
var userModel = require("../models/users"); // importation du modèle

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// POST sign-up
router.post("/sign-up", async function (req, res, next) {
  let notExist = false;
  message = 'Email or password is empty';
  if (req.body.email.length !== 0 && req.body.pwd.length !== 0 && req.body.name.length !== 0) {
    let user = await userModel.findOne({
      email: req.body.email,
    });
console.log(user);
    if (user) {
      message = 'Account already exist';
    } else {
      notExist = true;
    }

    if (notExist === true) {
      let newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        pwd: req.body.pwd,
      });
      let newUserSaved = await newUser.save();
      message = '';
    }
  }
  res.json({notExist, message});
});

// POST sign-in
router.post("/sign-in", async function (req, res, next) {
  let isExist = false;
  let message = 'Verify your password or your email';
  if (req.body.email.length !== 0 && req.body.pwd.length !== 0) {
    let user = await userModel.findOne({
      email: req.body.email,
      pwd: req.body.pwd,
    });
    if (user) {
      isExist = true;
      message='';
    } 
  } else {
    message = 'Email or password is empty'
  }
  res.json({isExist, message});
});

module.exports = router;