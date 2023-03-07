const express = require("express");
const path = require("path");
const Jud = require("json-update-data");
const users = require("../db/users-data.json");
const { log } = require("console");
const router = express.Router();

router.get("/panel", (_req, res) => {
  res.sendFile(path.join(__dirname, "../views/panel.html"));
});

router.get("/get-all-users", (_req, res) => {
  res.json(users);
});

router.get("/get-user/:username", (req, res, next) => {
  const username = req.params.username;
  user = users.find((user) => {
    user.username === username;
  });
  if (!user) {
    const error = { status: 404, message: "User not found" };
    next(error);
  }

  res.json(user);
});

router.delete("/remove-user/:username", (req, res) => {
  const username = req.params.username;
  const user = users.find((user) => user.username == username);
  if (!user) {
    const error = { status: 404, message: "User not found" };
    next(error);
  }
  try {
    Jud.deleteData(
      path.join(__dirname, "../db/users-data.json"),
      "username",
      username
    );
  } catch (err) {
    console.log(err.message);
  }
  //FIXME: redirect to panel
  res.json(user);
});

router.get("/:username/info", (req, res) => {
  const username = req.params.username;
  const user = users.find((user) => user.username == username);
  console.log(user);
  res.render("./Admin/info", { user });
});

module.exports = router;
