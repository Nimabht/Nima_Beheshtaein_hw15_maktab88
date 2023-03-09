const path = require("path");
const Jud = require("json-update-data");
const users = require("../db/users-data.json");
const validateUser = require("../validators/user");
const { AppError } = require("../utils/app-error");
module.exports = {
  renderLoginPage: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
  },
  renderSignupPage: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/signup.html"));
  },
  signupUser: (req, res, next) => {
    const { error } = validateUser(req.body);
    if (!!error) {
      const err = new AppError(error.details[0].message, 400);
      return next(err);
    }
    const duplicateUser = users.find(
      (user) => user.username === req.body.username
    );
    if (!!duplicateUser) {
      const error = new AppError(
        "User with given Username already exists",
        400
      );
      return next(error);
    }
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      gender: req.body.gender,
      isLoggedIn: false,
    };
    users.push(newUser);
    try {
      Jud.pushData(
        path.join(__dirname, "../db/users-data.json"),
        newUser
      );
      res.status(201).send("User Created.");
    } catch (err) {
      const error = new AppError(
        "Something Went wrong! try again",
        500
      );
      return next(error);
    }
  },
  loginUser: (req, res, next) => {
    const { username, password } = req.body;
    const user = users.find(
      (user) =>
        user.username === username && user.password === password
    );
    if (!user) {
      const error = new AppError(
        "Invalid Username or Password!",
        401
      );
      return next(error);
    }
    try {
      for (const user of users) {
        user.isLoggedIn = false;
      }
      user.isLoggedIn = true;
      Jud.writeData(
        path.join(__dirname, "../db/users-data.json"),
        users
      );
      res.send(user);
    } catch (err) {
      const error = new AppError(
        "Something Went wrong! try again",
        500
      );
      return next(error);
    }
  },
  logoutUser: (req, res, next) => {
    try {
      for (const user of users) {
        user.isLoggedIn = false;
      }
      Jud.writeData(
        path.join(__dirname, "../db/users-data.json"),
        users
      );
      res.send({ status: 200, message: "OK" });
    } catch (err) {
      const error = new AppError(
        "Something Went wrong! try again",
        500
      );
      return next(error);
    }
  },
};
