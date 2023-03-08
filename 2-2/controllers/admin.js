const path = require("path");
const Jud = require("json-update-data");
module.exports = {
  getUserByUsername: (req, res, next) => {
    const username = req.params.username;
    user = users.find((user) => {
      user.username === username;
    });
    if (!user) {
      const error = { status: 404, message: "User not found" };
      next(error);
    }

    res.json(user);
  },
  removeUserByUsername: (req, res) => {
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
  },
  renderInfoByUsername: (req, res) => {
    const username = req.params.username;
    const user = users.find((user) => user.username == username);

    res.render("./admin/info", { user });
  },
  renderAdminPanel: (_req, res) => {
    res.sendFile(path.join(__dirname, "../views/admin/panel.html"));
  },
};
