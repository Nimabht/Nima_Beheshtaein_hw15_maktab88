let users = require("../db/users-data.json");
const validateUser = require("../validators/user");
const Jud = require("json-update-data");
const path = require("node:path");
const e = require("express");
const { AppError } = require("../utils/app-error");
module.exports = {
  renderUserProfile: (req, res, next) => {
    const user = users.find((user) => user.isLoggedIn);
    if (!user) {
      const error = new AppError("Unauthorized", 401);
      return next(error);
    }

    res.render("./user/panel", { user });
  },
  renderEditProfile: (req, res, next) => {
    const user = users.find((user) => user.isLoggedIn);
    if (!user) {
      const error = new AppError("Unauthorized", 401);
      return next(error);
    }
    res.render("./user/editPanel", { user });
  },
  putUser: (req, res, next) => {
    const selectedUser = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      gender: req.body.gender,
      isLoggedIn: true,
    };
    const isDuplicated = users.find(
      (user) => user.username === selectedUser.username
    );
    if (!!isDuplicated) {
      const error = new AppError("Username already exists!!", 400);
      return next(error);
    }
    const { error } = validateUser(req.body);
    if (!!error) {
      const err = new AppError(error.details[0].message, 400);
      return next(err);
    }
    let userInDb = users.find((user) => user.isLoggedIn);
    const { username, password, email, gender } = selectedUser;
    // userInDb = { ...userInDb, ...selectedUser };
    userInDb.username = username;
    userInDb.password = password;
    userInDb.email = email;
    userInDb.gender = gender;
    try {
      Jud.writeData(
        path.join(__dirname, "../db/users-data.json"),
        users
      );
      return res.send(selectedUser);
    } catch (err) {
      const error = new AppError(
        "Something Went wrong! try again",
        500
      );
      return next(error);
    }
  },
  // isLoggedIn: (req, res) => {
  //   const username = req.params.username;
  //   const user = users.find((user) => user.username === username);
  //   if (!user) {
  //     const error = { status: 500, message: "Somthing is wrong!!" };
  //     return next(error);
  //   }

  //   res.json({ status: user.isLoggedIn });
  // },
};
