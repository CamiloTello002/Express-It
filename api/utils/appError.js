class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // this property indicates that the API was used in a non-intended way
    this.isOperational = true;

    // this adds the stack property, the target is the same error
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
