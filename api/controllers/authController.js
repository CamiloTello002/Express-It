const User = require('./../models/User');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { promisify } = require('util')

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
        res.status(201).json({
            message: 'Registered successfully!',
        });
    } catch (error) {
        if (error.errorResponse.code === 11000)
            return next(new AppError('This user already exists', 400))

        return next(new AppError('Internal Server Error', 500));
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password)
        return next(new AppError('You need to enter a username or password', 400))
    try {
        const userDoc = await User.findOne({ username }).select('+password');
        if (!userDoc || !(await bcrypt.compare(password, userDoc.password))) {
            return next(new AppError('Username or password incorrect!', 400));
        }
        jwt.sign(
            { username, id: userDoc._id },
            process.env.JWT_SECRET,
            {},
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token, {
                    secure: true,
                    sameSite: 'none',
                }).json({
                    message: 'successfully logged in!'
                });
            }
        );
    } catch (error) { }
}

exports.logout = async (req, res) => {
    // An empty cookie will act as if there wasn't a cookie
    res.cookie('token', '').json('ok');
}

exports.protect = async (req, res, next) => {
    let token;
    console.log('hit route.');
    if (req.cookies.token) {
        token = req.cookies.token;
    } else {
        return next(new AppError('You\'re not logged in', 401))
    }

    try {
        // 1. Verify the token
        const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // 2. Verify that the username exists
        const currentUser = await User.findById(decodedToken.id).select('-password');
        if (!currentUser) return next(new AppError('User not found! Please log in again.', 401))

        // 3. save the user in the req object
        req.user = currentUser;

        next();
        // res.send("you're indeed logged in!");

    } catch (error) {
        return next(new AppError(error, 400));
    }

}