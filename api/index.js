const express = require('express');
const multer = require('multer');
const cors = require('cors');

// cosas que deben ir en los controladores
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './.env' });

// para almacenamiento de archivos
const storage = multer.diskStorage({
  destination: `${__dirname}/uploads`,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const app = express();
// console.log(`Current environment is ${process.env.NODE_ENV}`);

// CORS
const corsOptions = {
  origin: [
    'http://localhost:5000',
    'http://127.0.0.1',
    'https://blog-he4s.onrender.com',
  ],
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
// We need to make the uploads folder available to the frontend for profile photos
app.use(express.static('uploads'));

// para la base de datos
const DB = process.env.MONGODB_URI.replace(
  '<password>',
  process.env.MONGODB_PASSWORD
);
mongoose
  .connect(DB)
  .then(() => console.log('Connected to database!'))
  .catch(() => console.log('Failed to connect to database'));

const port = process.env.PORT || 4000;


/**
 * Route definition. Routes are defined according to what we have in the database
 */
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/users', postRouter)

// autorizacion
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const saltGenerated = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(req.body.password, saltGenerated);
    const savedDocument = await User.create({
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
        res
          .cookie('token', token, {
            secure: true,
            sameSite: 'none',
          })
          .json({
            id: userDoc._id,
            username,
          });
      }
    );
  } catch (error) { }
});
app.post('/logout', (req, res) => {
  // An empty cookie will act as if there wasn't a cookie
  res.cookie('token', '').json('ok');
});

app.use('/')
// esto es más bien para el usuario
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    // there's no token, so we can't decode the token
    return res.status(200).json({});
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) throw err;
      return res.json(decodedToken);
    });
  }
});


// crear un solo post
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
// todos los posts
app.get('/posts', async (req, res) => {
  const posts = await Post.find()
    .populate('author', 'username')
    .sort({ createdAt: -1 });
  // .limit(5);
  res.json({
    status: 'success',
    message: 'Posts already returned',
    posts,
  });
});
// RUD para un solo post
app.get('/post/:id', async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params; // extract id from parameter
  const response = {};
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) throw err;
      response.author = decodedToken.id;
    });
  }
  const post = await Post.findById(id).populate('author', 'username'); // query the post to the database
  response.status = 'success';
  response.message = 'Entire post page returned';
  response.post = post;
  res.status(200).json(response);
});
app.patch('/post/:id', upload.single('file'), async (req, res) => {
  const { id } = req.params;
  const { title, summary, content } = req.body;
  let update = { title, summary, content };
  console.log(req.body.cover);
  if (req.body.cover) {
    update.cover = req.body.cover;
  }
  // console.log(req.body);
  // 1) find the document and update it
  console.log('before updating, the update object looks like:');
  console.log(update);
  await Post.findByIdAndUpdate(id, update);
  res.status(200).json({
    message: `PATCH /posts/${id} found!`,
  });
});
app.delete('/post/:id', async (req, res) => {
  // 1) get post id
  const { id } = req.params;
  // 2) delete it
  await Post.findByIdAndDelete(id);
  console.log('route hit');
  res.status(204).send('done');
});

app.listen(port, () => {
  console.log(`App listening for requests on port ${port}`);
});