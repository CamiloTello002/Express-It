const app = require('./app')
const mongoose = require('mongoose')
/** For API documentation */
const { swaggerDocs } = require('./routes/swagger');

// require('dotenv').config({ path: './.env' });
const port = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(port, console.log(`Server started on port ${port}`))
        swaggerDocs(app, port);
    })
    .catch((error) => console.log(error));
