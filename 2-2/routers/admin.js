const express = require("express");
const users = require("../db/users-data.json");
const router = express.Router();
const {
  getUserByUsername,
  removeUserByUsername,
  renderInfoByUsername,
  renderAdminPanel,
} = require("../controllers/admin");

router.get("/get-all-users", (_req, res) => {
  res.json(users);
});

router.get("/get-user/:username", getUserByUsername);
router.delete("/remove-user/:username", removeUserByUsername);
router.get("/:username/info", renderInfoByUsername);
router.get("/panel", renderAdminPanel);

module.exports = router;
