const User = require('./../models/User')

exports.getUserProfile = (req, res) => {
    res.status(200).json({
        id: req.user._id,
        username: req.user.username
    })
}

exports.deleteUserProfile = async (req, res) => {
    await User.findByIdAndDelete(req.user._id);
    res.status(204).json({
        message: 'user deleted.'
    })

}