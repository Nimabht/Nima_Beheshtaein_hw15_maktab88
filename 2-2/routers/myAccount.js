const express = require("express");
const Jud = require("json-update-data");
const {
  renderUserProfile,
  isLoggedIn,
  renderEditProfile,
  putUser,
} = require("../controllers/myAccount");
const users = require("../db/users-data.json");
const router = express.Router();

router.get("/", renderUserProfile);
router.get("/edit", renderEditProfile);
router.put("/", putUser);
// router.get("/:username", isLoggedIn);

module.exports = router;
