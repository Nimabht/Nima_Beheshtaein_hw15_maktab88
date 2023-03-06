const express = require("express");
const getShoeByIdController = require("../controllers/shoes Controller/getShoeByIdController");
const products = require("../db/products-data.json");
const router = express.Router();

//read all products
router.get("/", (_req, res) => {
  return res.json(products);
});
//read a product by id
router.get("/:id", getShoeByIdController);
//render info page
router.get("/info/:id", (req, res) => {
  const productId = req.params.id;
  const product = products.find((product) => product.id == productId);

  if (!product) {
    const error = new NotFoundError(
      `Product with id ${productId} not found`
    );
    return next(error);
  }

  res.render("info", { shoe: product });
});
module.exports = router;
