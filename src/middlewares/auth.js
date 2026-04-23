const jwt = require('jsonwebtoken');
const { findUserById } = require('../repositories/userRepository');

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send(' Token is not valid');
    }
    const decodeMessage = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodeMessage;
    const user = await findUserById(_id);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send('ERROR : ' + error.message);
  }
};

module.exports = { userAuth };
