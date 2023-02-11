const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/noNoise', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('strictQuery', false);

const {Users}= require('../model/userModel');

const create = Users.createAccountToDB(
  9,
 'wayne ghgjhgyuv',
  'user1@example.com',
'password',
 9)

async function seed() {
try {

await create

} catch (error) {
console.error(error);
}
mongoose.connection.close();
}
seed();
