const Post = require('./../models/Post');

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

exports.createPost = async (req, res) => {
    const { title, summary, content } = req.body;
    const { token } = req.cookies;
    let author;
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) throw err;
        author = decodedToken.id;
    });
    const postParams = {
        title,
        summary,
        content,
        author,
    };
    // User may not upload a photo
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
    const { token } = req.cookies;
    const { id } = req.params; // extract id from parameter
    const response = {};
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) throw err;
            response.author = decodedToken.id;
        });
    }
    const post = await Post.findById(id).populate('author', 'username'); // query the post to the database
    response.status = 'success';
    response.message = 'Entire post page returned';
    response.post = post;
    res.status(200).json(response);
}
exports.updatePost = (req, res) => {
    console.log('getPosts controller up');
    res.send('getPosts endpoint up');
}
exports.deletePost = (req, res) => {
    console.log('getPosts controller up');
    res.send('getPosts endpoint up');
}