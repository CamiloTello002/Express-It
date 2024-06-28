const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController')
const authController = require('./../controllers/authController')

router.get('/', controller.getPosts);
router.get('/:id', controller.getPost);

/** Routes only for logged in users */
router.use(authController.protect);
router.post('/create-post', controller.createPost);
router.route('/:id').patch(controller.uploadInstance.single('file'), controller.updatePost).delete(controller.deletePost);

module.exports = router;