const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './.env' });

const storage = multer.diskStorage({
  destination: `${__dirname}/uploads`,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const app = express();
const upload = multer({ storage: storage });

const corsOptions = {
  origin: ['http://localhost:5000', 'http://127.0.0.1'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());
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
  const { username, password } = req.body;
  try {
    const saltGenerated = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(req.body.password, saltGenerated);
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
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(404).json({
      status: 'failed',
      message: 'You need to enter a username or password',
    });
  }
  try {
    const userDoc = await User.findOne({ username }).select('+password');

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
        res.cookie('token', token).json({
          id: userDoc._id,
          username,
        });
      }
    );
  } catch (error) {}
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    // there's no token, so we can't decode the token
    return res.status(200).json({});
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) throw err;
      console.log('decodedToken is:');
      console.log(decodedToken);
      return res.json(decodedToken);
    });
  }
});

app.post('/logout', (req, res) => {
  // An empty cookie will act as if there wasn't a cookie
  res.cookie('token', '').json('ok');
});

app.post('/create-post', upload.single('file'), async (req, res) => {
  const { title, summary, content } = req.body;
  const { token } = req.cookies;
  let author;
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) throw err;
    author = decodedToken.id;
  });
  const postParams = {
    title,
    summary,
    content,
    author,
  };
  // User may not upload a photo
  if (req.file !== undefined) {
    const { originalname } = req.file;
    postParams.cover = originalname;
  } else {
    postParams.cover = 'default.png';
  }
  const postDoc = await Post.create(postParams);
  res.status(200).json({
    status: 'success',
    message: 'Post created',
    body: {
      postDoc,
    },
  });
});

app.get('/posts', async (req, res) => {
  // TODO: find a way to add the user as a string
  const posts = await Post.find()
    .populate('author', 'username')
    .sort({ createdAt: -1 });
  res.json({
    status: 'success',
    message: 'Posts already returned',
    posts,
  });
});

app.listen(port, () => {
  console.log(`App listening for requests on port ${port}`);
});
