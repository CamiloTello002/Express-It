const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const globalErrorHandler = require('./controllers/errorController');

/** Importing routes from ./routes/ */
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

/**For database connection */
const mongoose = require('mongoose');

/** For environment variables */
require('dotenv').config({ path: './.env' });

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

/** Database connection */
const DB = process.env.MONGODB_URI.replace(
  '<password>',
  process.env.MONGODB_PASSWORD
);
mongoose
  .connect(DB)
  .then(() => console.log('Connected to database!'))
  .catch(() => console.log('Failed to connect to database'));

/** Route definitions */
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/users', userRouter)

/** Middleware for global error handling */
app.use(globalErrorHandler);

/** Server goes up */
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App listening for requests on port ${port}`);
});