require('dotenv').config();
const express = require('express');
const app = express();
const { connectDB } = require('./config/database');
const cookieParser = require('cookie-parser');
const { authRouter } = require('./routes/auth');
const { profileRouter } = require('./routes/profile');
const { connectionRouter } = require('./routes/connection');
const { userRouter } = require('./routes/user');
const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', connectionRouter);
app.use('/', userRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT} `);
    });
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Database is not connected');
    console.error(err);
  });
