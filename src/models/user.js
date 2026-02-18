const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 4 },
    lastName: { type: String, required: true, minLength: 4 },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        console.log(value);
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email address ' + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        console.log(value);
        if (!validator.isStrongPassword(value)) {
          throw new Error('Your password is weak ' + value);
        }
      },
    },
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
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error('Images URL is invalid ' + value);
        }
      },
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
