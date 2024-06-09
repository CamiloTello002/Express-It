module.exports = (err, req, res, next) => {
    return res.json({
        message: 'an error occurred',
        error: err
    })
}