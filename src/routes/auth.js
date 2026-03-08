const express = require('express');
const authRouter = express.Router();
const { validationSignUpData } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');

authRouter.post('/signup', async (req, res) => {
  try {
    validationSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    const userSaveData = await user.save();
    const token = await userSaveData.getJWT();
    res.cookie('token', token);
    const userResponse = userSaveData.toObject();
    delete userResponse.password;

    res.json({ message: 'User added in database', data: userResponse });
  } catch (error) {
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

    res.cookie('token', token);
    const userResponse = user.toObject();
    delete userResponse.password;
    res.json({ message: 'Login succesful', data: userResponse });
  } catch (error) {
    res.status(400).send('Login failed ' + error);
  }
});
authRouter.post('/logout', async (req, res) => {
  res.cookie('token', null, { expires: new Date(Date.now()) });
  res.send('Log out Successful');
});

module.exports = { authRouter };
