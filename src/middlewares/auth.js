const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).send(' Token is not valid');
    }
    const decodeMessage = await jwt.verify(token, 'manchester@1992');
    const { _id } = decodeMessage;
    const user = await User.findById(_id);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send('ERROR : ' + error.message);
  }
};

module.exports = { userAuth };
