const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

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
			default: "",
		},
		price: {
			type: Currency,
			required: true,
			min: 0,
		},
		featured: {
			type: Boolean,
			default: false,
		},
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
