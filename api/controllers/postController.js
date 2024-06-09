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