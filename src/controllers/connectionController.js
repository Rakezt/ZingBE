const {
  sendRequest,
  reviewRequest,
} = require('../services/connectionServices');

const sendConnectionRequest = async (req, res) => {
  try {
    const data = await sendRequest(req.user, req.params);
    res
      .status(200)
      .json({ success: true, message: 'Connection successful', data });
  } catch (error) {
    res.status(400).send('Error : ' + error.message);
  }
};

const reviewConnectionRequest = async (req, res) => {
  try {
    const data = await reviewRequest(req.user, req.params);
    res.status(200).json({
      success: true,
      message: `${req.user.firstName} has ${data.status}`,
      data: data.data,
    });
  } catch (error) {
    res.status(400).send('Error : ' + error.message);
  }
};

module.exports = {
  sendConnectionRequest,
  reviewConnectionRequest,
};
