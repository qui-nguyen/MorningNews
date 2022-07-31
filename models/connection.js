require('dotenv').config();

var mongoose = require('mongoose');

const {DB_LOGIN, DB_PWD, DB_HOSTNAME, DB_NAME} = process.env;
var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   
   mongoose.connect(`mongodb+srv://${DB_LOGIN}:${DB_PWD}@${DB_HOSTNAME}/${DB_NAME}?retryWrites=true&w=majority`,
      options,        
      function(err) {
       console.log(err);
      }
   );
   