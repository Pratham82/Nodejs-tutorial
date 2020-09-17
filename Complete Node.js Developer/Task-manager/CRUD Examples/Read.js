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

		//* Reading documents from the DB

		//* Find one document using findOne method

		//* Finding user by objectID
		// _id: ObjectID("5f61f1090807ee4640c2f043")

		// db.collection("users").findOne(
		// 	{ firstName: "Prathamesh" },
		// 	(err, res) => (err ? console.log(err) : console.log(res))
		// );

		//* Finding multiple data by filtering
		db.collection("tasks")
			.find({ completed: true })
			.toArray((err, res) =>
				err ? console.log(err) : console.log("Completed sites:", res)
			);

		//* Counting the filtered data
		db.collection("tasks")
			.find({ completed: false })
			.count((err, res) =>
				err
					? console.log(err)
					: console.log(`Remaining Tasks count:`, res)
			);

		db.collection("tasks")
			.find({ completed: false })
			.toArray((err, res) =>
				err ? console.log(err) : console.log(`Remaining tasks:`, res)
			);

		db.collection("tasks").findOne(
			{
				_id: new ObjectID("5f61f6b9f0fa6c4ab0f4111a"),
			},
			(err, res) =>
				err ? console.log(err) : console.log("Last task:", res)
		);
	}
);
