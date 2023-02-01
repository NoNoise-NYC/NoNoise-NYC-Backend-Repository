const mongoose = require('mongoose');
const Complaints = require('../model/complaintsModel.js');

mongoose.connect('mongodb://localhost:27017/noNoise', { useNewUrlParser: true, useUnifiedTopology: true });

const create = Complaints.createComplaintToDB
(1,
  "2",
  "55",
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