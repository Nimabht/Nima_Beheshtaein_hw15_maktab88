module.exports = (Error, req, res, next) => {
  console.log(Error);
  res.status(Error.statusCode || 500);
  res.send({
    error: true,
    message: Error.message || "Internal Server Error",
  });
};
