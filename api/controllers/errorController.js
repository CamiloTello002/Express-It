module.exports = (err, req, res, next) => {
    return res.status(err.statusCode).json({
        message: err.message,
    })
}