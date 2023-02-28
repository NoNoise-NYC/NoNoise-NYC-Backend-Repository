const mongoose = require('mongoose');
const {Complaints} = require('../model/complaintsModel.js');
mongoose.set('strictQuery', true);

// mongoose.connect('mongodb://127.0.0.1:27017/noNoise', { useNewUrlParser: true, useUnifiedTopology: true });

const create = Complaints.createComplaintToDB
(1,
  "Construction Noise",
  "There is alot of noise pollution from a tractor in this location",
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

seed2()