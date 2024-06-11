const Post = require('./../models/Post');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

/** For file storage */
const storageConfigs = multer.diskStorage({
    destination: `${__dirname}/uploads`,
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
})
exports.uploadInstance = multer({ storage: storageConfigs });

exports.getPosts = async (req, res) => {
    const posts = await Post.find()
        .populate('author', 'username')
        .sort({ createdAt: -1 });
    res.status(200).json({
        status: 'success',
        message: 'Posts already returned',
        posts,
    });
}

exports.createPost = async (req, res, next) => {
    const { title, summary, content } = req.body;
    const author = req.user._id;

    if (!title || !summary || !content)
        return next(new AppError('You must provie a title, summary and content', 401))

    const postParams = {
        title,
        summary,
        content,
        author
    };

    if (req.file !== undefined) {
        const { originalname } = req.file;
        postParams.cover = originalname;
    } else {
        postParams.cover = 'default.png';
    }

    const postDoc = await Post.create(postParams);

    res.status(200).json({
        status: 'success',
        message: 'Post created',
        body: {
            postDoc,
        },
    });
}

exports.getPost = async (req, res) => {
    const { id } = req.params; // extract id from parameter
    const response = {};

    const post = await Post.findById(id).populate('author', 'username'); // query the post to the database
    response.status = 'success';
    response.message = 'Entire post page returned';
    response.post = post;
    res.status(200).json(response);
}

// TODO: add data validation and some error handling
exports.updatePost = async (req, res, next) => {
    const { id } = req.params;
    const { title, summary, content } = req.body;
    let update = { title, summary, content };
    console.log(req.body.cover);

    if (req.body.cover) {
        update.cover = req.body.cover;
    }

    await Post.findByIdAndUpdate(id, update);

    res.status(200).json({
        message: `PATCH /posts/${id} found!`,
    });
}
exports.deletePost = async (req, res) => {
    // 1) get post id
    const { id } = req.params;
    // 2) delete it
    await Post.findByIdAndDelete(id);
    res.status(204).send('done');
}