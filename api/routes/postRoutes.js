const express = require('express');
const router = express.Router();

router.post('/create-post', createPost);
router.get('/posts', getPosts);
router.route('/post/:id').get(getPost).patch(updatePost).delete(deletePost);


module.exports = router;