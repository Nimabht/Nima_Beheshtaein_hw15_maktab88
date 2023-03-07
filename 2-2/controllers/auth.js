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
      const err = { status: 400, message: error.details[0].message };
      return next(err);
    }
    const duplicateUser = users.find(
      (user) => user.username === req.body.username
    );
    if (!!duplicateUser) {
      const err = {
        status: 400,
        message: "User with given Username already exists",
      };
      return next(err);
    }
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      gender: req.body.gender,
      isLoggedIn: false,
    };
    console.log(newUser);
    users.push(newUser);
    try {
      Jud.pushData(
        path.join(__dirname, "../db/users-data.json"),
        newUser
      );
      res.status(201).send("User Created.");
    } catch (err) {
      console.log(err.message);
    }
  },
  loginUser: (req, res, next) => {
    const { username, password } = req.body;
    const user = users.find(
      (user) =>
        user.username === username && user.password === password
    );
    if (!user) {
      const err = {
        status: 401,
        message: "Invalid Username or Password!",
      };
      return next(err);
    }
    try {
      user.isLoggedIn = true;
      Jud.writeData(
        path.join(__dirname, "../db/users-data.json"),
        users
      );
      res.json({ user });
    } catch (err) {}
  },
};
