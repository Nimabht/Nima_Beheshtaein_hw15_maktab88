const express = require("express");
const { renderUserProfile } = require("../controllers/myAccount");
const users = require("../db/users-data.json");
const router = express.Router();

router.get("/:username", renderUserProfile);

module.exports = router;
