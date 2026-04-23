const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');

const {
  viewProfile,
  updateProfile,
  changePassword,
} = require('../controllers/profileController');

profileRouter.get('/profile/view', userAuth, viewProfile);
profileRouter.patch('/profile/edit', userAuth, updateProfile);
profileRouter.patch('/profile/updatePassword', userAuth, changePassword);

module.exports = { profileRouter };
