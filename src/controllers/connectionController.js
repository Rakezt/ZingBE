const {
  sendRequest,
  reviewRequest,
} = require('../services/connectionServices');
const asyncHandler = require('../utils/asyncHandler');

const sendConnectionRequest = asyncHandler(async (req, res) => {
  const data = await sendRequest(req.user, req.params);
  res
    .status(200)
    .json({ success: true, message: 'Connection successful', data });
});

const reviewConnectionRequest = asyncHandler(async (req, res) => {
  const data = await reviewRequest(req.user, req.params);
  res.status(200).json({
    success: true,
    message: `${req.user.firstName} has ${data.status}`,
    data: data.data,
  });
});

module.exports = {
  sendConnectionRequest,
  reviewConnectionRequest,
};
