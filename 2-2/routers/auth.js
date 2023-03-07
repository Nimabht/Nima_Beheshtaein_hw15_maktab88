const express = require("express");
const path = require("path");
const Jud = require("json-update-data");
const users = require("../db/users-data.json");
const {
  signupUser,
  renderLoginPage,
  renderSignupPage,
  loginUser,
} = require("../controllers/auth");
const validateUser = require("../validators/user");
const router = express.Router();

router.get("/signup", renderSignupPage);
router.get("/login", renderLoginPage);
router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;
