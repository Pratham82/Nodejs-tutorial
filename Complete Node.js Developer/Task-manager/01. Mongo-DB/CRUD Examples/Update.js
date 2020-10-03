//* CRUD Operations

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

		//* Update Documents

		//* Update one document
		db.collection("users")
			.updateOne({ firstName: "Jesse" }, { $inc: { age: 15 } })
			.then((res) => console.log(res.modifiedCount))
			.catch((err) => console.log(err));

		//* Update many
		db.collection("tasks")
			.updateMany(
				{ completed: false },
				{ $set: { completed: true } },
				{ multi: true }
			)
			.then((res) => console.log(`Modified count`, res.modifiedCount))
			.catch((err) => console.log(err));
	}
);
