const products = require("../../db/products-data.json");
const { AppError } = require("../../utils/app-error");
const getInfoById = (req, res, next) => {
  const productId = req.params.id;
  const product = products.find((product) => product.id == productId);
  if (!product) {
    const error = new AppError(
      `Product with id ${productId} not found`,
      404
    );
    return next(error);
  }
  res.render("info", { shoe: product });
};

const getShoeById = (req, res, next) => {
  const productId = req.params.id;
  const product = products.find((product) => product.id == productId);

  if (!product) {
    const error = new AppError(
      `Product with id ${productId} not found`,
      404
    );
    return next(error);
  }

  res.json(product);
};

module.exports = { getInfoById, getShoeById };
