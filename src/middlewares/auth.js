const jwt = require('jsonwebtoken');
const User = require('../models/user');

// const adminAuth = (req, res, next) => {
//   const token = 'xyz';
//   const isAuthorized = token === 'xyz';
//   if (!isAuthorized) {
//     res.status(401).send('User is not admin');
//   } else {
//     next();
//   }
// };

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error('Token is not valid');
    }
    const decodeMessage = await jwt.verify(token, 'manchester@1992');
    const { _id } = decodeMessage;
    const user = await User.findById(_id);
    res.user = user;
    next();
  } catch (error) {
    res.status(400).send('ERROR : ' + error.message);
  }
};

module.exports = { userAuth };
