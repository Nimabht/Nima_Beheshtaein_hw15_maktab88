const express = require("express");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const shopRouter = require("./routers/shop");
const shoesRouter = require("./routers/shoes");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
app.use(express.static("public"));

app.use("/", shopRouter);
app.use("/shoes", shoesRouter);
// app.use(globalErrorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening of port ${port}...`);
});
