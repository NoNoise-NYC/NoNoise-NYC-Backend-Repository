const mongoose = require('mongoose');
const { Posts } = require('../model/postModel.js');

mongoose.set('strictQuery', true);


const posts = [
  {
    user_id: "1",
    post_title: 'Today there is no noise',
    post_description: 'Because its snowing, they decided to stop construction',
    post_type: 'Venting',
    likes: 0,
    comments: []
  },
  {
    user_id: "2",
    post_title: 'Today there is so much noise in Brooklyn',
    post_description: 'I think there was a fire in Flatbush, there were so many firetrucks',
    post_type: 'Venting',
    likes: 0,
    comments: []
  },
  {
    user_id: "3",
    post_title: 'Why is there always a jackhammer on my street',
    post_description: 'There seems to be a multi-unit construction taking place throughout this week and I really hope it stops soon',
    post_type: 'Venting',
    likes: 0,
    comments: []
  },
  {
    user_id: "4",
    post_title: 'My school is noisy',
    post_description: 'These kids at P.S. 123 are so noisy and inconsiderate',
    post_type: 'Venting',
    likes: 0,
    comments: []
  },
  {
    user_id: "5",
    post_title: 'Today there is no noise',
    post_description: 'Because its snowing, they decided to stop construction',
    post_type: 'Venting',
    likes: 0,
    comments: []
  },
  {
    user_id: "6",
    post_title: 'Heavy construction near the Gowanus Expressway',
    post_description: 'I think there is a new development going up today done by the Jews',
    post_type: 'Venting',
    likes: 0,
    comments: []
  },
  {
    user_id: "7",
    post_title: 'There is excessive horn blowing in Manhattan today',
    post_description: 'The president is in town, that\'s why',
    post_type: 'Venting',
    likes: 0,
    comments: []
  },
  {
    user_id: "8",
    post_title: 'Today there is no noise',
    post_description: 'Because its snowing, they decided to stop construction',
    post_type: 'Venting',
    likes: 0,
    comments: []
  },
  {
    user_id: "9",
    post_title: 'Traffic along the Brooklyn Bridge is so heavy and is making it difficult to get through',
    post_description: 'I think it\'s because it\'s a Monday, Mondays are usually very noisy',
    post_type: 'Venting',
    likes: 0,
    comments: []
  },
  {
    user_id: "10",
    post_title: 'Today there is no noise',
    post_description: 'Because its snowing, they decided to stop construction',
    post_type: 'Venting',
    likes: 0,
    comments: []
  }
];

async function seed() {
  try {
    for (const complaint of posts) {
      
      await Posts.addPostToDB(complaint.user_id, complaint.post_title, complaint.post_description, complaint.post_type, complaint.likes);
    }
    console.log('Noise complaints seeded successfully');
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
}

seed();

process.on('SIGINT', () => {
  mongoose.connection.close();
  process.exit();
}); 