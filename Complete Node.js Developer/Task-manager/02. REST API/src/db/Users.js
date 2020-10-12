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
});

john
  .save()
  .then((res) => console.log("Added user successfully", res))
  .catch((err) => console.log(err));

module.exports = User;
