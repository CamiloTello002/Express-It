const mongoose = require('mongoose')
const request = require('supertest')
require('dotenv').config();

const app = require('./../app')

/** Connect to database before each test */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
});

/** Close database connection after each test */
afterEach(async () => {
    await mongoose.connection.close();
})

/** Testing a single endpoint */
describe("POST /api/v1/posts", () => {
    it("should create a post", async () => {
        const res = await request(app).post("/api/v1/posts").send({
            title: "Sample title",
            summary: "This is the sample summary",
            content: "Here we add some contents to the database",
            author: 123456
        });

        // Assert status code
        expect(res.statusCode).toBe(201);
    })
})