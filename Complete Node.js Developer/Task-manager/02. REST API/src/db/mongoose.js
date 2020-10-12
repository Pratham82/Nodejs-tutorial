const mongoose = require("mongoose");
const Task = require("./Tasks");
const User = require("./Users");

// Connecting to the DB
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});
