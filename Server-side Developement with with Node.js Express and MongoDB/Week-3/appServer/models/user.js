var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

//* Creating user Schema
var User = new Schema({
	firstname: {
		type: String,
		default: "",
	},
	lastname: {
		type: String,
		default: "",
	},
	admin: {
		type: Boolean,
		default: false,
	},
});

//* Adding password-local-mongoose to User schema
//* passwordLocalMongoose will create username and password field where password will be hashed
User.plugin(passportLocalMongoose);

//* Exporting a model
module.exports = mongoose.model("User", User);
