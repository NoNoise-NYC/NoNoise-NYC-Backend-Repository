const mongoose = require('mongoose');
const {Comments} = require('../model/commentsModel.js');
mongoose.set('strictQuery', true);

// mongoose.connect('mongodb://127.0.0.1:27017/noNoise', { useNewUrlParser: true, useUnifiedTopology: true });

const create = Comments.createCommentToDB
(1,
  1,
  1,
  'most asked question'
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



process.on('SIGINT', () => {
  mongoose.connection.close();
  process.exit();
}); 
  