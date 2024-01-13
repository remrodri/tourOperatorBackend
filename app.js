var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const { connectDB, closeDB } = require('./src/services/db');

var indexRouter = require("./src/routes/index");
var usersRouter = require("./src/routes/users");
var clientsRouter = require('./src/routes/clients');

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB database
connectDB().then(() => {
  console.log("MongoDB Connected")
  app.use("/", indexRouter);
  app.use('/users', usersRouter);
  app.use('/clients', clientsRouter);
}).catch((err) => console.error(err));

  
//app.use("/", indexRouter);
//app.use("/users", usersRouter);

process.on('SIGINT', () => {
  closeDB();
  process.exit();
})

module.exports = app;
