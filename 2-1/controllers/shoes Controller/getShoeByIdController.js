module.exports = (req, res, next) => {
  const productId = req.params.id;
  const product = products.find((product) => product.id == productId);

  if (!product) {
    const error = new NotFoundError(
      `Product with id ${productId} not found`
    );
    return next(error);
  }

  res.json(product);
};
