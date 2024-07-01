const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// Metadata info about our API
const options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'Express It API', version: '1.0.0', description: "This API is for managing database information about blog posts and their users." },
        servers: [
            {
                url: 'https://express-it.onrender.com',
                description: 'Production server'
            }
        ]
    },
    apis: ['./routes/*Routes.js']
}

// Docs in JSON format
const openapiSpecification = swaggerJSDoc(options);

// This function setps up our docs
const swaggerDocs = (app, port) => {
    // This route handler allows us to visit our docs.
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
    // Here we make our docs available in the json format
    app.get("/api/v1/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(openapiSpecification);
    });
}

module.exports = { swaggerDocs }