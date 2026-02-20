const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const connection = require('../models/connection');

const SAFE_PUBLIC_DATA =
  'firstName lastName photoUrl about gender age interest';
userRouter.post('/user/request/received', userAuth, async (req, res) => {
  try {
    const loggedUser = req.user._id;

    const checkConnection = await connection
      .find({
        toUserId: loggedUser,
        status: 'interested',
      })
      .populate('fromUserId', SAFE_PUBLIC_DATA);
    res.json({ message: 'Data fetch successfullt', data: checkConnection });
  } catch (error) {
    res.status(400).send('Error : ' + error.message);
  }
});
userRouter.post('/user/connections', userAuth, async (req, res) => {
  try {
    const loggedUser = req.user._id;

    const checkConnection = await connection
      .find({
        $or: [
          { toUserId: loggedUser, status: 'accepted' },
          { fromUserId: loggedUser, status: 'accepted' },
        ],
      })
      .populate('fromUserId', SAFE_PUBLIC_DATA)
      .populate('toUserId', SAFE_PUBLIC_DATA);

    const data = checkConnection.map((user) => {
      if (user.fromUserId._id.toString() === loggedUser.toString()) {
        return user.toUserId;
      } else {
        return user.fromUserId;
      }
    });

    res.json({ message: 'Data fetch successfullt', data });
  } catch (error) {
    res.status(400).send('Error : ' + error.message);
  }
});

module.exports = { userRouter };
