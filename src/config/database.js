const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI =
  'mongodb://polladmin:polladmin@ac-cejgush-shard-00-00.5xgtyz5.mongodb.net:27017,ac-cejgush-shard-00-01.5xgtyz5.mongodb.net:27017,ac-cejgush-shard-00-02.5xgtyz5.mongodb.net:27017/?ssl=true&replicaSet=atlas-785s4b-shard-0&authSource=admin&retryWrites=true&w=majority';

const connectDB = async () => {
  //   console.log(process.env.MONGO_URI);
  await mongoose.connect(MONGO_URI);
};

module.exports = { connectDB };
