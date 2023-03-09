module.exports = (Error, req, res, next) => {
  console.log(Error);
  res.status(Error.statusCode || 500);
  res.send({
    error: true,
    message: String(Error.status).startsWith("4")
      ? Error.message
      : "Internal Server Error",
  });
};
