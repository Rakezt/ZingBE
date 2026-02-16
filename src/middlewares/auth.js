const adminAuth = (req, res, next) => {
  const token = 'xyz';
  const isAuthorized = token === 'xyz';
  if (!isAuthorized) {
    res.status(401).send('User is not admin');
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  const token = 'xyz';
  const isAuthorized = token === 'xyz';
  if (!isAuthorized) {
    res.status(401).send('User is not Authorized');
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
