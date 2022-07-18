var express = require("express");
var router = express.Router();
var request = require("sync-request");
var userModel = require("../models/users"); // importation model

// Import libairie bcrypt and module uid2
var bcrypt = require("bcrypt");
var uid2 = require("uid2");
const UserModel = require("../models/users");
const { response } = require("express");

// Nb of tours to encrypt password
const cost = 10;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/loadNews", async (req, res, next) => {
  let requete = request(
    "GET",
    `https://newsapi.org/v2/top-headlines/sources?country=${req.query.language}&apiKey=4b0ae722e5b742f89237f9b79b53467c`
  );
  // transformer le résultat en JSON vers object
  let resultWS = JSON.parse(requete.body);
  res.json(resultWS);
});

// POST sign-up
router.post("/sign-up", async function (req, res, next) {
  let notExist = false;
  let message = "Email or password is empty";
  let token = "";
  if (
    req.body.email.length !== 0 &&
    req.body.pwd.length !== 0 &&
    req.body.name.length !== 0
  ) {
    let user = await userModel.findOne({
      email: req.body.email,
    });
    if (user) {
      message = "Account already exist";
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

      message = "";
      token = newUser.token;
    }
  }
  res.json({ notExist, message, token });
});

// POST sign-in
router.post("/sign-in", async function (req, res, next) {
  let isExist = false;
  let message = "Email or password is empty";
  let token = "";
  if (req.body.email.length !== 0 && req.body.pwd.length !== 0) {
    let user = await userModel.findOne({
      email: req.body.email,
    });

    if (!user) {
      message = "Verify your password or your email";
      return res.json({ isExist, message, token });
    } else if (bcrypt.compareSync(req.body.pwd, user.pwd)) {
      isExist = true;
      message = "";
      token = user.token;
    } else {
      message = "Verify your password or your email";
    }
  }
  res.json({ isExist, message, token });
});

// POST wishlist
router.post("/wishlist", async function (req, res, next) {
  let isOk = true;
  let userArticleSaved = {};
  let newArticle;
  let user = await userModel.findOne({ token: req.body.token });

  if (user) {
    let articleExist =
      user.wishList.filter((article) => article.title === req.body.title)
        .length !== 0
        ? true
        : false;
    if (articleExist) {
      isOk = false;
    } else {
      user.wishList.push({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        img: req.body.img,
        url: req.body.url,
      });
      userArticleSaved = await user.save();
    }
  }
  let pos = userArticleSaved.wishList.length - 1;
  //console.log(userArticleSaved.wishList[pos]);

  newArticle = userArticleSaved.wishList[pos];

  res.json({ isOk, newArticle });
});

router.post("/getMyWishlist", async (req, res, next) => {
  let user = await userModel.findOne({ token: req.body.token });

  let myArticlesDB = [];
  if (user) {
    myArticlesDB = user.wishList;
  }
  res.json(myArticlesDB);
});

router.delete("/deleteArticleWishlist", async (req, res, next) => {
  let isDeleteOk = false;
  let countSubDoc = 0;
  console.log(req.body.id);
  let user = await userModel.findOne({ token: req.body.token });

  if (user) {
    countSubDoc = user.wishList.length;
    // let articleIdToDelete = user.wishList.find(a => a.title === req.body.title).id;

    user.wishList.id(req.body.id).remove();
    let newUserState = await user.save();

    if (newUserState.length !== countSubDoc) {
      isDeleteOk = true;
    }
  }
  res.json({ isDeleteOk });
});

module.exports = router;
