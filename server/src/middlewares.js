const notFound = (req, res, next) => {
  const error = new Error(`Error not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    error: error.message,
    stack: process.env.NODE_STATUS === 'production' ? '🛸' : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
