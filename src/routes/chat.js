const express = require('express');
const { userAuth } = require('../middlewares/auth');
const chatRouter = express.Router();
const Chat = require('../models/chat');

chatRouter.get('/chat/:targetUserId', userAuth, async (req, res) => {
  const { targetUserId } = req.params;
  const userId = req.user._id;
  try {
    let chat = await Chat.findOne({
      participants: {
        $all: [userId, targetUserId],
      },
    }).populate({
      path: 'messages.senderId',
      select: 'firstName lastName',
    });
    if (!chat) {
      chat = await Chat({ participants: [userId, targetUserId], messages: [] });
    }
    await chat.save();
    res.json({ message: 'Message retrived successfullt', data: chat });
  } catch (error) {
    res.status(400).json('Error :', error);
  }
});
module.exports = { chatRouter };
