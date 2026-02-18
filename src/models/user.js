const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 4 },
    secondName: { type: String },
    emailId: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      validate(value) {
        if (!['male', 'female', 'other'].includes(value)) {
          throw new Error('Gender validation failed');
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    about: {
      type: String,
      default: 'this is all about me',
    },
    interest: { type: [String] },
  },
  { timestamp: true },
);

module.exports = mongoose.model('zingUsers', userSchema);
