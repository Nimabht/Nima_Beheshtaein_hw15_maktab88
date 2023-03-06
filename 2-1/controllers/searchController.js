const searchObjects = require("../tools/searchObjects");
const products = require("../db/products-data.json");
module.exports = (req, res) => {
  const searchTerm = req.query.value;
  const result = searchObjects(searchTerm, products);
  if (result.length !== 0) {
    res.send(result);
  } else {
    res.send(products);
  }
};
