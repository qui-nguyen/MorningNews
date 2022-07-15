
var mongoose = require('mongoose');   
var userSchema = mongoose.Schema({
    name: String,
    email: String,
    pwd : String,
    token: String,
 });
 
 var UserModel = mongoose.model('users', userSchema);
 // Exportation ce module (ce ficier pour l’utilisation dans l’autre fichier)
 module.exports = UserModel;
 