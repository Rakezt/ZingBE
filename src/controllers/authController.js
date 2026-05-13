const { signupUser, loginUser } = require('../services/authServices');

const asyncHandler = require('../utils/asyncHandler');

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 3 * 24 * 60 * 60 * 1000,
};

const signUp = asyncHandler(async (req, res) => {
  const result = await signupUser(req.body);

  res.cookie('token', result.token, cookieOptions);

  res.status(201).json({
    success: true,
    message: 'User added in database',
    data: result.user,
  });
});

const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  res.cookie('token', result.token, cookieOptions);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: result.user,
  });
});

const logout = asyncHandler(async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
  });

  res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
});

module.exports = {
  signUp,
  login,
  logout,
};
