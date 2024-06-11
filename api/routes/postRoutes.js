const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController')

router.get('/', controller.getPosts);
router.post('/create-post', controller.createPost);
router.route('/post/:id').get(controller.getPost).patch(controller.uploadInstance, controller.updatePost).delete(controller.deletePost);


module.exports = router;