const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const {Users}= require('../model/userModel');



 const create2 = Users.createAccountToDB(
  
 
  'wayne@example.com',
'password',
 1)



async function seed() {
try {
await create2



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