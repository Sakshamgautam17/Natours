const AppError = require('./../utils/appError');
const handleJWTError = (err) => new AppError('The token here is invalid', 401);
const handleJWTExpiredError = (err) =>
  new AppError('The token is expired', 401);
// Handling duplicate field error
const handleDuplicateFieldDB = (err) => {
  // Check if errmsg exists before attempting to match
  const value = err.errmsg ? err.errmsg.match(/(["'])(\\?.)*?\1/)[0] : null;

  // If no match was found, handle it gracefully
  if (!value) {
    return new AppError(
      'Duplicate field value: x. Please use another value!',
      400,
    );
  }

  console.log(value);
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// Handling invalid ObjectId error
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data . ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
     return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  // Operational, trusted error: send message to client
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // Programming or unknown error: don't leak error details
    console.error('ERROR', err);
    // Send a generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  } else {
    if (err.isOperational) {
      return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: err.message,
      });
    }
    // Programming or unknown error: don't leak error details
    console.error('ERROR', err);
    // Send a generic message
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: 'Server error ',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    // Explicitly copy all enumerable and non-enumerable properties
    let error = { ...err, name: err.name, message: err.message };

    // Handle specific errors
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError(error);
    sendErrorProd(error, req, res);
  }
};
