module.exports = {
  renderUserProfile: (req, res, next) => {
    const username = req.params.username;
    const user = users.find((user) => user.username == username);
    if (!user) {
      const error = { status: 404, message: "User not found!" };
      return next(error);
    }
    res.render("./user/panel", { user });
  },
};
