exports.getUserProfile = (req, res) => {
    res.status(200).json({
        id: req.user._id,
        username: req.user.username
    })
}