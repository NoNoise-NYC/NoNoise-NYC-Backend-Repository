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

// const post2 = {
//   post_id: 2,
//   user_id: 2,
//   post_title: 'Dont know where to start',
//   post_description: 'what to study for a tech interview',
//   post_type: 'Technical',
//   likes: 3,
//   numberComments: 3
// };
// await create(post)

// const post3 = {
//   post_id: 3,
//   user_id: 3,
//   post_title: 'tech view',
//   post_description: 'How to solve stock question',
//   post_type: 'LeetCode 75',
//   likes: 0,
//   numberComments: 5
// };
// await create(post)


 
process.on('SIGINT', () => {
  mongoose.connection.close();
  process.exit();
}); 