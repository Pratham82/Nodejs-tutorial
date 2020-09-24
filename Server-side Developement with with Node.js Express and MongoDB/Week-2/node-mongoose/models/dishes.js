const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//* Creating comments schema
const commentSchema = mongoose.Schema(
	{
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

//* Creating dishes Schema
const dishSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		//* adding sub-document
		comments: [commentSchema],
	},
	{
		timestamps: true,
	}
);

//* Creating dishes model
const Dishes = mongoose.model("Dish", dishSchema);

//* Exporting the model
module.exports = Dishes;
