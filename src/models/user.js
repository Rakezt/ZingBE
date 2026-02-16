const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true, minLength: 4 },
  secondName: { type: String },
  emailId: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  photoUrl: { type: String },
  about: { type: String, default: 'This is about me' },
  interest: { type: [String] },
});

module.exports = mongoose.model('zingUsers', userSchema);
