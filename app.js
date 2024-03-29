var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var layout = require("express-ejs-layouts");
var fileUpload = require("express-fileupload");
var {connectToMongo}=require("./config/connection");
var session = require('express-session')

var userRouter = require("./routes/user");
var adminRouter = require("./routes/admin");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(layout);
app.set("layout", path.join(__dirname, "./views/layouts/layout.ejs"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());
app.use(session({
  secret: "cartkey", // Replace with your secret
  resave: false, // False, if you don't want to save session if unmodified
  saveUninitialized: false, // False, if you don't want to initialize a session until something is stored
  cookie: { maxAge: 600000 } // Set your cookie options
}));


//Database connection 
connectToMongo()
app.use("/", userRouter);
app.use("/admin", adminRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
