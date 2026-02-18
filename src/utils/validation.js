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

module.exports = { validationSignUpData };
