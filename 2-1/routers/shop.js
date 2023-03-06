const express = require("express");
const homeController = require("../controllers/homeController");
const aboutUsController = require("../controllers/aboutUsController");
const contactController = require("../controllers/contactController");
const searchController = require("../controllers/searchController");
const router = express.Router();

router.get("/home", homeController);
router.get("/about-us", aboutUsController);
router.get("/contact", contactController);
router.get("/search", searchController);
module.exports = router;
