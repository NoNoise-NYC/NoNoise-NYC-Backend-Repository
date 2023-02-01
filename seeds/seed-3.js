const mongoose = require('mongoose');
const Comments = require('../comment/commentsModel.js');

mongoose.connect('mongodb://localhost:27017/noNoise', { useNewUrlParser: true, useUnifiedTopology: true });

const create = Comments.addPostToDB(1,
  1,
  'most asked question',
 'how to answer tell me about yourself',
 'Behavioral'
)

async function seed() {
try {
await create
}
catch (error) {
  console.error(error);
  }
}
seed();



 
  