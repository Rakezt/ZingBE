const { signupUser, loginUser } = require('../services/authServices');

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 3 * 24 * 60 * 60 * 1000,
};

const singUp = async (req, res) => {
  try {
    const result = await signupUser(req.body);
    res.cookie('token', result.token, cookieOptions);
    res.status(200).json({
      success: true,
      message: 'User added in database',
      data: result.user,
    });
  } catch (error) {
    res.status(400).send('Error saving user : ' + error.message);
  }
};

const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.cookie('token', result.token, cookieOptions);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result.user,
    });
  } catch (error) {
    res.status(400).send('Error failed : ' + error.message);
  }
};

const logout = async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
  });
  res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
};

module.exports = {
  singUp,
  login,
  logout,
};
