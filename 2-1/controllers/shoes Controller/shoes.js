const products = require("../../db/products-data.json");

const getInfoById = (req, res, next) => {
  const productId = req.params.id;
  const product = products.find((product) => product.id == productId);
  console.log(products);
  if (!product) {
    const error = {
      status: 404,
      message: `Product with id ${productId} not found`,
    };
    return next(error);
  }

  res.render("info", { shoe: product });
};

const getShoeById = (req, res, next) => {
  const productId = req.params.id;
  const product = products.find((product) => product.id == productId);

  if (!product) {
    const error = {
      status: 404,
      message: `Product with id ${productId} not found`,
    };
    return next(error);
  }

  res.json(product);
};

module.exports = { getInfoById, getShoeById };
