const express = require("express");
const {
  getShoeById,
  getInfoById,
} = require("../controllers/shoes Controller/shoes");
const products = require("../db/products-data.json");
const router = express.Router();

//read all products
router.get("/", (_req, res) => {
  return res.json(products);
});
//read a product by id
router.get("/:id", getShoeById);
//render info page
router.get("/info/:id", getInfoById);
module.exports = router;
