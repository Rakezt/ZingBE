const {
  createUser,
  findUserByEmail,
} = require('../repositories/userRepository');
const { validationSignUpData } = require('../utils/validation');
const bcrypt = require('bcrypt');

const signupUser = async (reqbody) => {
  validationSignUpData({ body: reqbody });
  const { firstName, lastName, emailId, password } = reqbody;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await createUser({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });

  const token = await user.getJWT();

  const userResponse = user.toObject();
  delete userResponse.password;

  return { token, user: userResponse };
};

const loginUser = async (reqbody) => {
  const { emailId, password } = reqbody;
  const user = await findUserByEmail(emailId);
  if (!user) {
    throw new Error('Invalid Credentials');
  }
  const isPasswordValid = await user.validatePassword(password);
  if (!isPasswordValid) {
    throw new Error('Invalid Credentials');
  }
  const token = await user.getJWT();

  const userResponse = user.toObject();
  delete userResponse.password;
  return {
    token,
    user: userResponse,
  };
};
module.exports = {
  signupUser,
  loginUser,
};
