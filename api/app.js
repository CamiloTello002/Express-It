const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const globalErrorHandler = require('./controllers/errorController');

/** Importing routes from ./routes/ */
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');


const app = express();

const corsOptions = {
  origin: [
    'http://localhost:5000',
    'http://127.0.0.1',
    'https://blog-he4s.onrender.com',
  ],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('uploads'));

/** Route definitions */
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/users', userRouter)

/** Middleware for global error handling */
app.use(globalErrorHandler);

module.exports = app;