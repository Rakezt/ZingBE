const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 4 },
    lastName: { type: String, required: true, minLength: 4 },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        // console.log(value);
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email address ' + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
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
        'https://res.cloudinary.com/detngmiyp/image/upload/v1772364280/avatar_oxaewt.webp',
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
    isPremium: { type: Boolean, default: false },
    memberShipType: { type: String },
  },
  { timestamps: true },
);
UserSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, 'manchester@1992', {
    expiresIn: '7d',
  });
  return token;
};
UserSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isValidPassword = await bcrypt.compare(
    passwordInputByUser,
    passwordHash,
  );

  return isValidPassword;
};

module.exports = mongoose.model('zingUsers', UserSchema);
