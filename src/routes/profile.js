const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const {
  validateEditProfileData,
  validatePasswordUpdate,
} = require('../utils/validation');
const bcrypt = require('bcrypt');

profileRouter.get('/profile/view', userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.json({ message: 'Profile updated', data: user });
  } catch (error) {
    res.status(400).send('ERROR :' + error);
  }
});
profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error();
    }
    const loggedUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]));
    await loggedUser.save();
    res.json({
      message: `${loggedUser.name} you profile has been updated`,
      data: loggedUser,
    });
  } catch (error) {
    res.status(400).send('ERROR :' + error);
  }
});

profileRouter.patch('/profile/updatePassword', userAuth, async (req, res) => {
  try {
    validatePasswordUpdate(req);
    const { oldPassword, newPassword } = req.body;
    const loggedUser = req.user;
    const isMatch = await loggedUser.validatePassword(oldPassword);
    if (!isMatch) {
      throw new Error('Wrong Old password enter');
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    loggedUser.password = passwordHash;

    await loggedUser.save();
    res.json({ message: 'Password Updated' });
  } catch (error) {
    res.status(400).send('ERROR :' + error);
  }
});

module.exports = { profileRouter };
