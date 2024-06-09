const User = require('./../models/User');

const bcrypt = require('bcryptjs')
const AppError = require('./../utils/appError')

exports.register = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password)
        return next(new AppError('username or password missing!', 404));
    try {
        const saltGenerated = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(req.body.password, saltGenerated);
        const savedDocument = await User.create({
            username: req.body.username,
            password: hashedPassword,
        });
        res.status(200).json({
            message: 'Register successful!',
        });
    } catch (error) {
        if (error.errorResponse.code === 11000)
            return next(new AppError('This user already exists', 400))
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(404).json({
            status: 'failed',
            message: 'You need to enter a username or password',
        });
    }
    try {
        const userDoc = await User.findOne({ username }).select('+password');

        if (!userDoc || !(await bcrypt.compare(password, userDoc.password))) {
            return res.status(400).json({
                status: 'failed',
                message: 'username or password incorrect!',
            });
        }
        jwt.sign(
            { username, id: userDoc._id },
            process.env.JWT_SECRET,
            {},
            (err, token) => {
                if (err) throw err;
                res
                    .cookie('token', token, {
                        secure: true,
                        sameSite: 'none',
                    })
                    .json({
                        id: userDoc._id,
                        username,
                    });
            }
        );
    } catch (error) { }
}