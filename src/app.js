const express = require('express');
const app = express();
const { adminAuth, userAuth } = require('./middlewares/auth');
const { connectDB } = require('./config/database');
const User = require('./models/user');
const { validationSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use('/admin', adminAuth);
app.get('/admin/allData', (req, res) => {
  res.send('This is the admin Data');
});

app.post('/signup', async (req, res) => {
  try {
    validationSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send('User added in database');
  } catch (error) {
    console.log(error);
    res.status(400).send('Error saving user :' + error.message);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error('Invalid Credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid Credentials');
    }
    res.send('Login succesful');
  } catch (error) {
    res.status(400).send('Login failed ' + error);
  }
});

app.get('/user', userAuth, async (req, res) => {
  const emailId = req.body.emailId;
  try {
    const users = await User.find({ emailId });
    res.send(users);
  } catch (error) {
    res.status(404).send('User not found');
  }
});
app.get('/feed', userAuth, async (req, res) => {
  const users = await User.find({});
  try {
    res.send(users);
  } catch (error) {
    res.status(404).send('Users not found');
  }
});
app.delete('/user', userAuth, async (req, res) => {
  const emailId = req.body.emailId;
  try {
    await User.findOneAndDelete({ emailId });
    res.send('User deleted succesfully');
  } catch (error) {
    res.status(400).send('User delete failed');
  }
});
app.patch('/user/:userId', userAuth, async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const allowedUpdate = ['age', 'photoUrl', 'about', 'interest'];
    const isAllowedUpdate = Object.keys(data).every((k) =>
      allowedUpdate.includes(k),
    );
    if (!isAllowedUpdate) {
      throw new Error('Selected field cannot be update');
    }
    if (data?.interest?.length > 0) {
      throw new Error("Interest can't exceed more than 10");
    }
    const users = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: 'after',
      runValidators: true,
    });
    res.send(users);
  } catch (error) {
    res.status(400).send('User not updated ' + error.message);
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
