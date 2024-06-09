const express = require('express');
const router = express.Router();

router.get('/', getPosts);
router.post('/create-post', createPost);
router.route('/post/:id').get(getPost).patch(updatePost).delete(deletePost);


module.exports = router;