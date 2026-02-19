const express = require('express');
const app = express();
const { connectDB } = require('./config/database');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const { profileRouter } = require('./routes/profile');

app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', profileRouter);

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

// app.get('/user', userAuth, async (req, res) => {
//   const emailId = req.body.emailId;
//   try {
//     const users = await User.find({ emailId });
//     res.send(users);
//   } catch (error) {
//     res.status(404).send('User not found');
//   }
// });
// app.get('/feed', userAuth, async (req, res) => {
//   const users = await User.find({});
//   try {
//     res.send(users);
//   } catch (error) {
//     res.status(404).send('Users not found');
//   }
// });
// app.delete('/user', userAuth, async (req, res) => {
//   const emailId = req.body.emailId;
//   try {
//     await User.findOneAndDelete({ emailId });
//     res.send('User deleted succesfully');
//   } catch (error) {
//     res.status(400).send('User delete failed');
//   }
// });
// app.patch('/user/:userId', userAuth, async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;
//   try {
//     const allowedUpdate = ['age', 'photoUrl', 'about', 'interest'];
//     const isAllowedUpdate = Object.keys(data).every((k) =>
//       allowedUpdate.includes(k),
//     );
//     if (!isAllowedUpdate) {
//       throw new Error('Selected field cannot be update');
//     }
//     if (data?.interest?.length > 0) {
//       throw new Error("Interest can't exceed more than 10");
//     }
//     const users = await User.findByIdAndUpdate({ _id: userId }, data, {
//       returnDocument: 'after',
//       runValidators: true,
//     });
//     res.send(users);
//   } catch (error) {
//     res.status(400).send('User not updated ' + error.message);
//   }
// });
