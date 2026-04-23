const { saveUser } = require('../repositories/userRepository');
const {
  validateEditProfileData,
  validatePasswordUpdate,
} = require('../utils/validation');
const bcrypt = require('bcrypt');

const getProfile = async (loggedUser) => {
  return loggedUser;
};

const editProfile = async (loggedUser, reqBody) => {
  validateEditProfileData({ body: reqBody });
  Object.keys(reqBody).forEach((key) => (loggedUser[key] = reqBody[key]));
  const updatedUser = await saveUser(loggedUser);
  return updatedUser;
};

const updatePassword = async (loggedUser, reqBody) => {
  validatePasswordUpdate({ body: reqBody });
  const { oldPassword, newPassword } = reqBody;
  const isMatch = await loggedUser.validatePassword(oldPassword);
  if (!isMatch) {
    throw new Error('Wrong Old password enter');
  }
  const passwordHash = await bcrypt.hash(newPassword, 10);
  loggedUser.password = passwordHash;
  await saveUser(loggedUser);
  return true;
};
module.exports = {
  getProfile,
  editProfile,
  updatePassword,
};
