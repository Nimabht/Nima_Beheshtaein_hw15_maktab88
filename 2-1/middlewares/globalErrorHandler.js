module.exports = (Error, req, res, next) => {
  res.status(Error.statusCode || 500);
  res.send({
    error: true,
    message: Error.statusCode.toString().startsWith("4")
      ? Error.message
      : "Internal Server Error",
  });
};
