const express = require("express");
const path = require("path");
const notFoundHandler = require("./middlewares/notFoundHandler");
const authRouter = require("./routers/auth");
const adminRouter = require("./routers/admin");
const userRouter = require("./routers/myAccount");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/myAccount", userRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

app.use(globalErrorHandler);
app.use(notFoundHandler);

//FIXME: port is hard coded bc of url redirecting
const port = 1010;
app.listen(port, () => {
  console.log(`App is listening on ${port}...`);
});
