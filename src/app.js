const express = require('express');
const app = express();
const { adminAuth, userAuth } = require('./middlewares/auth');
const { connectDB } = require('./config/database');
const User = require('./models/user');

app.use('/admin', adminAuth);
app.get('/admin/allData', (req, res) => {
  res.send('This is the admin Data');
});
app.get('/user', userAuth, (req, res) => {
  res.send('This is the user Data');
});
app.post('/signup', async (req, res) => {
  const user = new User({
    firstName: 'Rakesh',
    secondName: 'Singh',
    email: 'rakesh@123.com',
  });
  try {
    await user.save();
    res.send('User added in database');
  } catch (error) {
    res.status(400).send('Error saving user');
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
