const express = require('express');
const cors = require('cors');

/** Importing routes from ./routes/ */
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const globalErrorHandler = require('./controllers/errorController');

/**For database connection */
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './.env' });

const app = express();

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

/**
 * ROUTE DEFINITIONS
 */
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/users', userRouter)

/** Middleware for global error handling */
app.use(globalErrorHandler);

/** Server goes up */
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App listening for requests on port ${port}`);
});