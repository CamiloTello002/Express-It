const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './.env' });

const app = express();

const corsOptions = {
  origin: 'http://localhost:5000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const DB = process.env.MONGODB_URI.replace(
  '<password>',
  process.env.MONGODB_PASSWORD
);

const port = process.env.PORT || 4000;

mongoose
  .connect(DB)
  .then(() => console.log('Connected to database!'))
  .catch(() => console.log('Failed to connect to database'));

app.post('/register', async (req, res) => {
  // gets username and password
  const { username, password } = req.body;
  console.log(username, password);
  try {
    // Generate a salt
    const saltGenerated = await bcrypt.genSalt(11);
    // add the salt and hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, saltGenerated);
    // make a request to the database for saving the new user
    // document is hydrated with id and __v
    const savedDocument = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
    console.log(savedDocument);
    res.status(200).json({
      requestData: { username, password },
    });
  } catch (error) {
    res.status(400).json(error.errorResponse.errmsg);
  }
});

app.post('/login', async (req, res, next) => {
  // 1) get username and password from body
  const { username, password } = req.body;
  // if there's not username nor password, throw an error
  if (!username || !password) {
    return res.status(404).json({
      status: 'failed',
      message: 'You need to enter a username or password',
    });
  }
  try {
    // get the document (please, AWAIT it)
    const userDoc = await User.findOne({ username }).select('+password');

    // in case there's no user or password is incorrect, return 400 status code
    if (!userDoc || !(await bcrypt.compare(password, userDoc.password))) {
      return res.status(400).json({
        status: 'failed',
        message: 'username or password incorrect!',
      });
    }
    jwt.sign(
      { username, id: userDoc._id },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie('jwt', token).json('ok');
      }
    );
    // return res.status(200).json({});
  } catch (error) {}
});

app.get('profile', (req, res) => {
  res.json(req.cookies);
});

app.listen(port, () => {
  console.log(`App listening for requests on port ${port}`);
});
