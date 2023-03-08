let users = require("../db/users-data.json");
const validateUser = require("../validators/user");
const Jud = require("json-update-data");
const path = require("node:path");
const e = require("express");
module.exports = {
  renderUserProfile: (req, res, next) => {
    const user = users.find((user) => user.isLoggedIn);
    if (!user) {
      const error = { status: 500, message: "Somthing is wrong!!" };
      return next(error);
    }
    res.render("./user/panel", { user });
  },
  renderEditProfile: (req, res, next) => {
    const user = users.find((user) => user.isLoggedIn);
    if (!user) {
      const error = { status: 500, message: "Somthing is wrong!!" };
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
      const error = {
        status: 400,
        message: "Username already exists!!",
      };
      return next(error);
    }
    const { error } = validateUser(req.body);
    if (!!error) {
      const err = { status: 400, message: error.details[0].message };
      return next(err);
    }
    let userInDb = users.find((user) => user.isLoggedIn);
    const { username, password, email, gender } = selectedUser;
    // userInDb = { ...userInDb, ...selectedUser };
    userInDb.username = username;
    userInDb.password = password;
    userInDb.email = email;
    userInDb.gender = gender;

    console.log(users);
    try {
      console.log("aha");
      Jud.writeData(
        path.join(__dirname, "../db/users-data.json"),
        users
      );
      return res.send(selectedUser);
    } catch (err) {
      console.log(err.message);
      const error = { status: 500, message: "Something is wrong!!" };
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
