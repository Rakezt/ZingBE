const express = require('express');
const connectionRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const Connection = require('../models/connection');
const User = require('../models/user');

connectionRouter.post(
  '/request/send/:status/:userId',
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      const allowedStatus = ['interested', 'ignored'];
      if (!allowedStatus.includes(status)) {
        throw new Error('Invalid Status Selected');
      }
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error('User you have selected is not found');
      }
      const checkConnection = await Connection.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (checkConnection) {
        throw new Error('Connection already exist');
      }
      const connectionRequest = new Connection({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({ message: 'Connection successful', data });
    } catch (error) {
      res.status(400).send('ERROR :' + error.message);
    }
  },
);
connectionRouter.post(
  '/request/review/:status/:connectionId',
  userAuth,
  async (req, res) => {
    try {
      const loggedUser = req.user._id;
      const connectionId = req.params.connectionId;
      const status = req.params.status;

      const allowedStatus = ['accepted', 'rejected'];
      if (!allowedStatus.includes(status)) {
        throw new Error('Invalid Status Selected');
      }
      const checkConnection = await Connection.findOne({
        _id: connectionId,
        toUserId: loggedUser,
        status: 'interested',
      });
      if (!checkConnection) {
        throw new Error(`Connection request is not found`);
      }
      checkConnection.status = status;
      const data = await checkConnection.save();
      res.json({ message: `${loggedUser.firstName} has ${status} `, data });
    } catch (error) {
      res.status(400).send('ERROR :' + error.message);
    }
  },
);

module.exports = { connectionRouter };
