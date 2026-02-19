const validator = require('validator');

const validationSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error('Name is required');
  } else if (!validator.isEmail(emailId)) {
    throw new Error('Email format is invalid');
  } else if (!validator.isStrongPassword(password)) {
    throw new Error('Password is weak');
  }
};

const validateEditProfileData = (req) => {
  const allowedEdits = [
    'firstName',
    'lastName',
    'photoUrl',
    'gender',
    'about',
    'interest',
  ];
  const dataToBeEdit = Object.keys(req.body);
  const isAllowedEdits = dataToBeEdit.every((field) =>
    allowedEdits.includes(field),
  );
  if (!isAllowedEdits) {
    throw new Error('Invalid update-field');
  }
  const { firstName, lastName, photoUrl, gender, about, interest } = req.body;

  if (firstName && !validator.isLength(firstName, { min: 2 })) {
    throw new Error('First Name is too short');
  }
  if (lastName && !validator.isLength(lastName, { min: 2 })) {
    throw new Error('Last Name is too short');
  }
  if (photoUrl && !validator.isURL(photoUrl)) {
    throw new Error('Images URL is invalid');
  }
  if (about && !validator.isLength(about, { max: 200 })) {
    throw new Error("About me can't exceed 200 words");
  }

  return isAllowedEdits;
};

const validatePasswordUpdate = (req) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new Error('Old and New Password are required');
  }
  if (!validator.isStrongPassword(newPassword)) {
    throw new Error('Password is too weak');
  }
  if (oldPassword === newPassword) {
    throw new Error('Both password cannot be same');
  }
};
module.exports = {
  validationSignUpData,
  validateEditProfileData,
  validatePasswordUpdate,
};
