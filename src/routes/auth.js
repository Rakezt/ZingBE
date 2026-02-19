const express = require('express');
const authRouter = express.Router();
const { validationSignUpData } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');

authRouter.post('/signup', async (req, res) => {
  try {
    console.log('I am here');
    validationSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send('User added in database');
  } catch (error) {
    console.log(error);
    res.status(400).send('Error saving user :' + error.message);
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error('Invalid Credentials');
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid Credentials');
    }
    const token = await user.getJWT();
    // console.log(token);
    res.cookie('token', token);
    res.send('Login succesful');
  } catch (error) {
    res.status(400).send('Login failed ' + error);
  }
});

module.exports = authRouter;
