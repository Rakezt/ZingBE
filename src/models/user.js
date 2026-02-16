const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: { type: String },
  secondName: { type: String },
  //   profilePic: { type: String },
  email: { type: String },
  password: { type: String },
  age: { type: Number },
  gender: { type: String },
});

module.exports = mongoose.model('zingUsers', userSchema);
