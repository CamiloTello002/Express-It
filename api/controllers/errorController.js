module.exports = (err, req, res, next) => {
    const status = err.statusCode || 500;
    return res.status(err.statusCode).json({
        message: err.message,
    })
}