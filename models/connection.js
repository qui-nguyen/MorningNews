var mongoose = require('mongoose');
var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   
   mongoose.connect('mongodb+srv://ThanhQui:zayyo8XP4c2NE2Ro@miam.crg9gau.mongodb.net/morningnews?retryWrites=true&w=majority',
      options,        
      function(err) {
       console.log(err);
      }
   );
   