const mongoose = require('mongoose');
const {Complaints} = require('../model/complaintsModel.js');
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/noNoise', { useNewUrlParser: true, useUnifiedTopology: true });

const create = Complaints.createComplaintToDB
(1,
  "Construction Noise",
  "Multifamily construction in gowanus area today between 9am to 5pm",
  '11210'
  ,5
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

const create3 = Complaints.createComplaintToDB
(1,
  "Party in Flatbush",
  "Early morning party really disturbing our neighborhood today. And to make it worse, its a sunday.",
  '11210'
  ,5
)

async function seed3() {
try {
await create3
}
catch (error) {
  console.error(error);
  }
}
seed3();


const create2 = Complaints.createComplaintToDB
(1,
  "Jack Hammer Noise",
  "There is alot of noise pollution from a jackhammer in this location",
  '11232'
  ,5
)

async function seed2() {
try {
await create2
}
catch (error) {
  console.error(error);
  }
}

