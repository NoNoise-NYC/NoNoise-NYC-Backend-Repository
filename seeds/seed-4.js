const mongoose = require('mongoose');
const {Complaints} = require('../model/complaintsModel.js');
mongoose.set('strictQuery', true);

// mongoose.connect('mongodb://127.0.0.1:27017/noNoise', { useNewUrlParser: true, useUnifiedTopology: true });

const create = Complaints.createComplaintToDB
(1,
  "5443534",
  "5545353",
  'most asked question'
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
