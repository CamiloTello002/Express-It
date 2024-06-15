const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config({ path: './.env' });
const port = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(port, console.log(`Server started on port ${port}`))
    })
    .catch(() => console.log('Failed to connect to database'));
