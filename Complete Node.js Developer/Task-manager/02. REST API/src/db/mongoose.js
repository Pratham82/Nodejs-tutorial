const mongoose = require("mongoose");

// Connecting to the DB
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

//// Creating a  User Model
//const User = mongoose.model("User", {
//  name: {
//    type: String,
//  },
//  age: {
//    type: Number,
//  },
//});
//
//// Creating instance of the Model
//const drake = new User({
//  name: "Drake",
//  age: "sdfsfsd",
//});
//
//// Saving the instance to our DB
//drake
//  .save()
//  .then((res) =>
//    console.log(`User with name ${drake.name} is created ${drake}`)
//  )
//  .catch((err) =>
//    console.log("There was an error while creating instance of User", err)
//  );

// Creating a task model
const Task = mongoose.model("Task", {
  description: String,
  status: Boolean,
});

const task1 = new Task({
  description: "This is my first task",
  status: false,
});

task1
  .save()
  .then((res) => console.log("Task is added successfully", res))
  .catch((err) =>
    console.log("There was an error wile creating the task", err)
  );
