module.exports = (err, _req, res, _next) => {
  if (err instanceof NotFoundError) {
    res
      .status(404)
      .render("userNotFound")
      .json({ error: "Not found" });
  } else if (err instanceof BadRequest) {
    res.status(400).json({ error: "Bad Request" });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
};
