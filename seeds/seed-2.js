const mongoose = require('mongoose');
const {Posts} = require('../model/postModel.js');
mongoose.set('strictQuery', true);

// mongoose.connect('mongodb://127.0.0.1:27017/noNoise', { useNewUrlParser: true, useUnifiedTopology: true });

const create = Posts.addPostToDB(
  8,
  'Today there is no noise',

 'Because its snowing, they decided to stop construction',
 'Venting')

async function seed() {
try {

await create
}

catch (error) {
  console.error(error);
  }
}
seed();

const create4 = Posts.addPostToDB(
  8,
  'Today there is so much noise in brooklyn ',

 'I think there was a fire in flatbush, there were so many firetrucks',
 'Venting')

async function seed4() {
try {

await create4
}

catch (error) {
  console.error(error);
  }
}
seed4();
const create5 = Posts.addPostToDB(
  8,
  'Why is there always a jackhammer on my street',

 'There seems to be a multi unit construction taking place throughout this week and i really hope it stops soon',
 'Venting')

async function seed5() {
try {

await create5
}

catch (error) {
  console.error(error);
  }
}
seed5();
const create6 = Posts.addPostToDB(
  8,
  'My school is noisy',

 'These kids at P.s 123 are so noisy and inconsiderate',
 'Venting')

async function seed6() {
try {

await create6
}

catch (error) {
  console.error(error);
  }
}
seed6();
const create7 = Posts.addPostToDB(
  8,
  'Today there is no noise',

 'Because its snowing, they decided to stop construction',
 'Venting')

async function seed7() {
try {

await create7
}

catch (error) {
  console.error(error);
  }
}
seed7();
const create11 = Posts.addPostToDB(
  8,
  'Today there is no noise',

 'Because its snowing, they decided to stop construction',
 'Venting')

async function seed11() {
try {

await create11
}

catch (error) {
  console.error(error);
  }
}
seed11();
const create12 = Posts.addPostToDB(
  8,
  'Today there is no noise',

 'Because its snowing, they decided to stop construction',
 'Venting')

async function seed12() {
try {

await create12
}

catch (error) {
  console.error(error);
  }
}
seed12();
const create13 = Posts.addPostToDB(
  8,
  'Today there is no noise',

 'Because its snowing, they decided to stop construction',
 'Venting')

async function seed13() {
try {

await create13
}

catch (error) {
  console.error(error);
  }
}
seed13();
const create15 = Posts.addPostToDB(
  8,
  'There is excessive horn blowing in manhattan today',

 'The president is in town , thats why',
 'Venting')

async function seed15() {
try {

await create15
}

catch (error) {
  console.error(error);
  }
}
seed15();

const create3 = Posts.addPostToDB(
  10,
  'Traffic along the brooklyn bridge is so heavy and is making it difficult to get through',


 'I think its because its a monday, mondays are usually very noisy',
 'Venting')

async function seed3() {
try {

await create3
}

catch (error) {
  console.error(error);
  }
}
seed3();
const create2 = Posts.addPostToDB(
  9,
  'Heavy construction near the gowanus expressway',

 'I think there is a new development going up today done by the jews',
 'Venting')

async function seed2() {
try {

await create2
}

catch (error) {
  console.error(error);
  }
}
seed2();


process.on('SIGINT', () => {
  mongoose.connection.close();
  process.exit();
}); 