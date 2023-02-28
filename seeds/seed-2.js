const mongoose = require('mongoose');
const {Posts} = require('../model/postModel.js');
mongoose.set('strictQuery', true);

// mongoose.connect('mongodb://127.0.0.1:27017/noNoise', { useNewUrlParser: true, useUnifiedTopology: true });

const create = Posts.addPostToDB(
  8,
  'placeholder',
 'placeholder',
 'Bpalceholder')
const post = {
  post_id: 1,
  user_id: 1,
  post_title: 'most asked question',
  post_description: 'how to answer tell me about yourself',
  post_type: 'Behavioral'
  };
async function seed() {
try {

await create
}

catch (error) {
  console.error(error);
  }
}
seed();

process.on('SIGINT', () => {
  mongoose.connection.close();
  process.exit();
}); 