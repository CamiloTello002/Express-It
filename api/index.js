const express = require('express');
const multer = require('multer');
const cors = require('cors');
const globalErrorHandler = require('./controllers/errorController');

/** Importing routes from ./routes/ */
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

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
 * ROUTE DEFINITIONS
 */
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/users', userRouter)

// RUD para un solo post
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

/** Middleware for global error handling */
app.use(globalErrorHandler);

/** Server goes up */
app.listen(port, () => {
  console.log(`App listening for requests on port ${port}`);
});