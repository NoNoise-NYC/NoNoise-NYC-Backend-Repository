const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//connecting database
mongoose.connect('mongodb://127.0.0.1:27017/noNoise');
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
// mongoose.connect('mongodb://localhost:27017/TaskManager', { useNewUrlParser: true}).then(() => {
//     console.log('Connected to MongoDB successfully :)');
// }).catch((err) => {
//     console.log("Error while atttempting to connect to MondoDB");
//     console.log(e);
// });

// To prevent deprecation warnings (from MongoDB native driver)
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
}



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

process.on('SIGINT', () => {
  client.close();
  process.exit();
});