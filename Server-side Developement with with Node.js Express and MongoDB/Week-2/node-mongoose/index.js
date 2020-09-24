const mongoose = require("mongoose");

//* Importing dishes model
const Dishes = require("./models/dishes");

//* Connection url with db name
const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

connect.then((db) => {
	console.log("Successfully connected to the server");

	//* Older method for creating a document
	//* Creating new document
	// var newDish = Dishes({
	// 	name: "Uthapizza",
	// 	description: "Test desc",
	// });
	//* Saving the newly created document
	// newDish
	// 	.save()
	// 	.then((dish) => {
	// 		console.log(dish);

	//* New method for creating and saving a  document
	Dishes.create({
		name: "Uthapizza",
		description: "Test desc",
	})
		.then((dish) => {
			console.log("Created new dish: ", dish);

			//* Find all the dishes and exec(which will make sure the operation is executed)
			return Dishes.findByIdAndUpdate(
				dish._id,
				{
					$set: { description: "updated test" },
				},
				{ new: true }
			).exec();
		})
		.then((dish) => {
			console.log("Updated a dish: ", dish);

			//* Adding comments to the updated dish
			dish.comments.push({
				rating: 4,
				comment: "Good taste",
				author: "Hachi",
			});

			return dish.save();
		})
		.then((dish) => {
			console.log(dish);

			//*  Removing all the dishes
			return Dishes.remove({});
		})
		.then(() => mongoose.connection.close())
		.catch((err) => console.log(err));
});
