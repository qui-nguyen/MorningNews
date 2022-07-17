var mongoose = require("mongoose");

var wishListSchema = mongoose.Schema({
  title: String,
  description: String,
  content: String,
  img: String,
  url: String
});

var userSchema = mongoose.Schema({
  wishList: [wishListSchema],
  name: String,
  email: String,
  pwd: String,
  token: String,
});

var UserModel = mongoose.model("users", userSchema);
// Exportation ce module (ce ficier pour l’utilisation dans l’autre fichier)
module.exports = UserModel;
