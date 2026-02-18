const express = require('express');
const app = express();
const { adminAuth, userAuth } = require('./middlewares/auth');
const { connectDB } = require('./config/database');
const User = require('./models/user');
const user = require('./models/user');

app.use(express.json());
app.use('/admin', adminAuth);
app.get('/admin/allData', (req, res) => {
  res.send('This is the admin Data');
});
app.post('/signup', async (req, res) => {
  const data = req.body;
  const user = new User(data);
  try {
    await user.save();
    res.send('User added in database');
  } catch (error) {
    console.log(error);
    res.status(400).send('Error saving user');
  }
});
app.get('/user', userAuth, async (req, res) => {
  const emailId = req.body.emailId;
  try {
    const users = await user.find({ emailId });
    res.send(users);
  } catch (error) {
    res.status(404).send('User not found');
  }
});
app.get('/feed', userAuth, async (req, res) => {
  const users = await user.find({});
  try {
    res.send(users);
  } catch (error) {
    res.status(404).send('Users not found');
  }
});
app.delete('/user', userAuth, async (req, res) => {
  const emailId = req.body.emailId;
  try {
    await user.findOneAndDelete({ emailId });
    res.send('User deleted succesfully');
  } catch (error) {
    res.status(400).send('User delete failed');
  }
});
app.patch('/user', userAuth, async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const users = await user.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: 'after',
      runValidators: true,
    });
    res.send(users);
  } catch (error) {
    res.status(400).send('User not updated');
  }
});

connectDB()
  .then(() => {
    app.listen(7777, () => {
      console.log('Server running on port 7777');
    });
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Database is not connected');
    console.error(err);
  });
