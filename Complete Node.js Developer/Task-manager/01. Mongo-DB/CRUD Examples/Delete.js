//* CRUD Operations

// const mongodb = require("mongodb");
// const mongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

//* Destructuring the properties from mongoDB
const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const dbName = "task-manager";

MongoClient.connect(
	connectionURL,
	{ useNewUrlParser: true },
	(error, client) => {
		if (error) {
			return console.log("Unable to connect to DB 🤕");
		}
		console.log("Connected to DB 😄");

		const db = client.db(dbName);

		//* Delete Documents

		//* Delete one document
		db.collection("users")
			.deleteOne({ firstName: "Jesse" })
			.then((res) => console.log(res))
			.catch((err) => console.log(err));

		//* Delete multiple docs:
		db.collection("users")
			.deleteMany({ age: 39 })
			.then((res) => console.log(res))
			.catch((err) => console.log(err));

		//* Delete single task from the task collection
		db.collection("tasks")
			.deleteOne({ task: "New task copy" })
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}
);
