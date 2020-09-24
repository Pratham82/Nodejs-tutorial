const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

//* Creating comments schema
const commentSchema = new Schema(
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
		image: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: false,
			default: "",
		},
		price: {
			type: Currency,
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
