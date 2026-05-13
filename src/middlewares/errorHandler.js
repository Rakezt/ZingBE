const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res
    .status(statusCode)
    .json({ seccess: false, message: err.message || 'internal Server error' });
};
module.exports = errorHandler;
