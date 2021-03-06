const mongoose = require("mongoose");
const validator = require("validator");

// Creating User model with validations
const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: [7, "Password should be more than 6 characters"],
    validate(val) {
      if (val.toLowerCase().includes("password")) {
        throw new Error("Password should not be same as password");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(val) {
      if (val < 0) {
        throw new Error("Age must be a positive value");
      }
    },
  },
});

const john = new User({
  name: "       John",
  email: "       John@gmail.com          ",
  password: "pass@fdd",
});

const john2 = new User({
  name: " john2",
  email: "dfdfdf",
  password: "dfsdfdfdf",
});

john
  .save()
  .then((res) => console.log("Added user successfully", res))
  .catch((err) => console.log(err));

john2
  .save()
  .then((res) => console.log("@@@@@@@User created", res))
  .catch((err) => console.log(err));

module.exports = User;
