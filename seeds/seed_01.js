const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/noNoise', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('strictQuery', true);

const {Users}= require('../model/userModel');

const create = Users.createAccountToDB(
  9,
 'wayne ghgjhgyuv',
  'user1@example.com',
'password',
 9)

 const create3 = Users.createAccountToDB(
  1,
 'wayne ghgjhgyuv',
  'user1@example.com',
'password',
 1)

 const create2 = Users.createAccountToDB(
  2,
 'whosa',
  'user1@example.com',
'password',
 3)

 const create4 = Users.createAccountToDB(
  4,
 'manu',
  'user1@example.com',
'password',
 4)

 const create5 = Users.createAccountToDB(
  5,
 'baku',
  'user1@example.com',
'password',
 5)

 const create6 = Users.createAccountToDB(
  6,
 'cavel',
  'user1@example.com',
'password',
 6)

 const create7 = Users.createAccountToDB(
  7,
 'wayne shawn',
  'user1@example.com',
'password',
 7)

 const create8 = Users.createAccountToDB(
  8,
 'marcus',
  'user1@example.com',
'password',
 8)
 const create9 = Users.createAccountToDB(
  11,
 'jane',
  'user1@example.com',
'password',
11)





async function seed() {
try {


await create2
await create3
await create4
await create5
await create6
await create7
await create8
await create9


} catch (error) {
console.error(error);
}
mongoose.connection.close();
}
seed();
process.on('SIGINT', () => {
  mongoose.connection.close();
  process.exit();
}); 