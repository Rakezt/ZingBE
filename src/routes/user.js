const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const Connection = require('../models/connection');
const User = require('../models/user');

const SAFE_PUBLIC_DATA =
  'firstName lastName photoUrl about gender age interest';
userRouter.get('/user/request/received', userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    const checkConnection = await Connection.find({
      toUserId: loggedUser._id,
      status: 'interested',
    }).populate('fromUserId', SAFE_PUBLIC_DATA);
    res.json({
      message: `Request for ${loggedUser.firstName}`,
      data: checkConnection,
    });
  } catch (error) {
    res.status(400).send('Error : ' + error.message);
  }
});
userRouter.get('/user/connections', userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    const checkConnection = await Connection.find({
      $or: [
        { toUserId: loggedUser._id, status: 'accepted' },
        { fromUserId: loggedUser._id, status: 'accepted' },
      ],
    })
      .populate('fromUserId', SAFE_PUBLIC_DATA)
      .populate('toUserId', SAFE_PUBLIC_DATA);

    const data = checkConnection.map((user) => {
      if (user.fromUserId._id.toString() === loggedUser._id.toString()) {
        return user.toUserId;
      } else {
        return user.fromUserId;
      }
    });

    res.json({ message: `${loggedUser.firstName} all Connection`, data });
  } catch (error) {
    res.status(400).send('Error : ' + error.message);
  }
});

userRouter.get('/user/feed', userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 10 ? 10 : limit;
    const skip = (page - 1) * limit;

    const checkConnection = await Connection.find({
      $or: [{ fromUserId: loggedUser._id }, { toUserId: loggedUser._id }],
    }).select('toUserId fromUserId');

    const hideUser = new Set();
    checkConnection.forEach((data) => {
      (hideUser.add(data.fromUserId.toString()),
        hideUser.add(data.toUserId.toString()));
    });

    const data = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUser) } },
        { _id: { $ne: loggedUser._id } },
      ],
    })
      .select(SAFE_PUBLIC_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ message: `This is ${loggedUser.firstName} feed`, data });
  } catch (error) {
    res.status(400).send('ERROR : ' + error.message);
  }
});

module.exports = { userRouter };
