const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//connecting database

//on connection
mongoose.connection.on('connected', () =>{
    console.log('Connected to database mongodb @27017');
});

mongoose.connection.on('error', (err) => {
    if(err)
    {
        console.log('Error in Database connection:'+err);
    }
});





process.on('SIGINT', () => {
  client.close();
  process.exit();
});