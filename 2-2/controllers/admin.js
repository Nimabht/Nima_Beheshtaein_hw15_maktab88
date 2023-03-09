const path = require("path");
const Jud = require("json-update-data");
const users = require("../db/users-data.json");
const { AppError } = require("../utils/app-error");
module.exports = {
  getUserByUsername: (req, res, next) => {
    const username = req.params.username;
    user = users.find((user) => {
      user.username === username;
    });
    if (!user) {
      const error = new AppError("User not found", 404);
      return next(error);
    }

    res.json(user);
  },
  removeUserByUsername: (req, res) => {
    const username = req.params.username;
    const user = users.find((user) => user.username == username);
    if (!user) {
      const error = new AppError("User not found", 404);
      return next(error);
    }
    try {
      Jud.deleteData(
        path.join(__dirname, "../db/users-data.json"),
        "username",
        username
      );
    } catch (err) {
      const error = new AppError(
        "Something Went wrong! try again",
        500
      );
      return next(error);
    }
    //FIXME: redirect to panel
    res.json(user);
  },
  renderInfoByUsername: (req, res, next) => {
    const username = req.params.username;
    const user = users.find((user) => user.username == username);
    if (!user) {
      const error = new AppError("User not found", 404);
      return next(error);
    }
    res.render("./admin/info", { user });
  },
  renderAdminPanel: (_req, res) => {
    res.sendFile(path.join(__dirname, "../views/admin/panel.html"));
  },
};
