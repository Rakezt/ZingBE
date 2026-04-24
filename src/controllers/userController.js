const {
  getReceivedRequest,
  getConnections,
  getFeed,
} = require('../services/userServices');

const receiveRequest = async (req, res) => {
  try {
    const data = await getReceivedRequest(req.user);
    res.status(200).json({
      success: true,
      message: `Request for ${req.user.firstName}`,
      data,
    });
  } catch (error) {
    res.status(400).send('Error : ' + error.message);
  }
};

const userConnection = async (req, res) => {
  try {
    const data = await getConnections(req.user);
    res.status(200).json({
      success: true,
      message: `${req.user.firstName} all connections`,
      data,
    });
  } catch (error) {
    res.status(400).send('Error : ' + error.message);
  }
};

const userFeed = async (req, res) => {
  try {
    const data = await getFeed(req.user, req.query);
    res.status(200).json({
      success: true,
      message: `${req.user.firstName} all feed`,
      data,
    });
  } catch (error) {
    res.status(400).send('Error : ' + error.message);
  }
};
module.exports = {
  receiveRequest,
  userConnection,
  userFeed,
};
