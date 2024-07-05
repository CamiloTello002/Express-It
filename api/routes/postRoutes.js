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
router.get('/:id', controller.getPost);

/** Routes only for logged in users */
router.use(authController.protect);
router.post('/create-post', controller.createPost);
router.route('/:id').patch(controller.uploadInstance.single('file'), controller.updatePost).delete(controller.deletePost);

module.exports = router;