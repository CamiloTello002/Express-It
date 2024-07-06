const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController')
const authController = require('./../controllers/authController')

/**
 * @openapi
 * /api/v1/posts:
 *   get:
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: the posts were successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string 
 *                   example: Posts already returned
 *                 posts:
 *                    type: array
 */
router.get('/', controller.getPosts);
/**
 * @openapi
 * /api/v1/posts/{id}:
 *   get:
 *     summary: Get a single post by ID
 *     description: Retrieve a post along with its author's username.
 *     tags:
 *       - Posts
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the post to retrieve
 *     responses:
 *       200:
 *          description: Successful response with the post data
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status: 
 *                              type: string
 *                              example: success
 *                          message: 
 *                              type: string
 *                              example: Entire post page returned
 *                          post:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: 60b725f10c9d4b0014e49c74
 *                                  title:
 *                                      type: string
 *                                      example: Post Title
 *                                  content:
 *                                      type: string
 *                                      example: Post content goes here...
 *                                  author:
 *                                      type: object
 *                                      properties:
 *                                          username:
 *                                              type: string
 *                                              example: authorUsername
 *       404:
 *          description: Post not found
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                              example: error
 *                          message:
 *                              type: string
 *                              example: Post not found
 */
router.get('/:id', controller.getPost);

/** Routes only for logged in users */
router.use(authController.protect);
router.post('/create-post', controller.createPost);
router.route('/:id').patch(controller.uploadInstance.single('file'), controller.updatePost).delete(controller.deletePost);

module.exports = router;