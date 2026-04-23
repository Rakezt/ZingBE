const User = require('../models/user');

const createUser = async (userData) => {
  const user = new User(userData);
  if (User) {
    console.log('Hello');
  }
  return await user.save();
};

const findUserByEmail = async (emailId) => {
  return await User.findOne({ emailId });
};

const findUserById = async (userId) => {
  return await User.findById(userId);
};

const updateUserById = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });
};
const saveUser = async (userDocument) => {
  return await userDocument.save();
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserById,
  saveUser,
};
