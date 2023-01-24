const mongoose = require('mongoose');
const Post = require('../model/postModel.js');

mongoose.connect('mongodb://localhost:27017/noNoise', { useNewUrlParser: true, useUnifiedTopology: true });

const create = Post.addPostToDB()

async function seed() {
try {
const post = {
post_id: 1,
user_id: 1,
post_title: 'most asked question',
post_description: 'how to answer tell me about yourself',
post_type: 'Behavioral'
};
await create( 1,
   1,
   'most asked question',
  'how to answer tell me about yourself',
  'Behavioral',
)


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


} catch (error) {
  console.error(error);
  }
  mongoose.connection.close();
  }
  seed();