const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './.env' });

const app = express();

app.use(cors());
app.use(express.json());

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
  const { username, password } = req.body;
  try {
    const saltGenerated = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(req.body.password, saltGenerated);
    await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
    res.status(200).json({
      requestData: { username, password },
    });
  } catch (error) {
    res.status(400).json(error.errorResponse.errmsg);
  }
});

app.post('/login', async (req, res) => {
  // 1) get username and password from body
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    res.status(200).json(userDoc);
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`App listening for requests on port ${port}`);
});
