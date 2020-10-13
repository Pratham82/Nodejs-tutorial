const mongoose = require("mongoose");

// Creating a task model
const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
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

const task2 = Task({
  description: "This is my 2nd task",
  status: false,
});

task2
  .save()
  .then((res) => console.log("Task 2 added successfully", res))
  .catch((err) => console.log(err));

const task3 = Task({
  description: "This is my 3rd task",
  status: false,
});

task3
  .save()
  .then((res) => console.log("Task 2 added successfully", res))
  .catch((err) => console.log(err));

module.exports = Task;
