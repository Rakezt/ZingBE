const express = require('express');
const connectionRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const connection = require('../models/connection');
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
      const checkConnection = await connection.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (checkConnection) {
        throw new Error('Connection already exist');
      }
      const connectionRequest = new connection({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.send({ message: 'Connection successful', data });
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
      const checkConnection = await connection.findOne({
        _id: connectionId,
        toUserId: loggedUser,
        status: 'interested',
      });
      if (!checkConnection) {
        throw new Error(`Connection request is not found`);
      }
      checkConnection.status = status;
      const data = await checkConnection.save();
      res.send({ message: `Connection has been ${status}`, data });
    } catch (error) {
      res.status(400).send('ERROR :' + error.message);
    }
  },
);

module.exports = { connectionRouter };
