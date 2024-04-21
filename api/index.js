const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
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
  const userDoc = await User.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.status(200).json({
    requestData: { username, password },
  });
});

app.listen(port, () => {
  console.log(`App listening for requests on port ${port}`);
});
