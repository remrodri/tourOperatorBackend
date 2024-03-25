var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require('cors');

const { connectDB, closeDB } = require('./src/services/db');

var indexRouter = require("./src/routes/index");
var usersRouter = require("./src/routes/users");
var clientsRouter = require('./src/routes/clients');
var tourPackagesRouter = require('./src/routes/tourPackages');
var tourPackageSalesRouter = require('./src/routes/tourPackageSales');
var roleRouter = require('./src/routes/roles');

var app = express();
const corsOptions = {
  // origin: 'https://fz58rgn7-5173.brs.devtunnels.ms/',
  origin: "http://localhost:5173",
  optionSuccesStatus: 200,
};

app.use(cors());

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
  app.use('/tourPackages', tourPackagesRouter);
  app.use('/tourPackageSales', tourPackageSalesRouter);
  app.use('/roles', roleRouter);
}).catch((err) => console.error(err));

  
//app.use("/", indexRouter);
//app.use("/users", usersRouter);

process.on('SIGINT', () => {
  closeDB();
  process.exit();
})

module.exports = app;
