const {
  getReceivedRequest,
  getConnections,
  getFeed,
} = require('../services/userServices');
const asyncHandler = require('../utils/asyncHandler');

const receiveRequest = asyncHandler(async (req, res) => {
  const data = await getReceivedRequest(req.user);
  res.status(200).json({
    success: true,
    message: `Request for ${req.user.firstName}`,
    data,
  });
});

const userConnection = asyncHandler(async (req, res) => {
  const data = await getConnections(req.user);
  res.status(200).json({
    success: true,
    message: `${req.user.firstName} all connections`,
    data,
  });
});

const userFeed = asyncHandler(async (req, res) => {
  const data = await getFeed(req.user, req.query);
  res.status(200).json({
    success: true,
    message: `${req.user.firstName} all feed`,
    data,
  });
});
module.exports = {
  receiveRequest,
  userConnection,
  userFeed,
};
