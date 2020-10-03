//* CRUD Operations

// const mongodb = require("mongodb");
// const mongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

//* Destructuring the properties from mongoDB

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const dbName = "task-manager";

//* Creating new ObjectID
const ID = new ObjectID();
// This will be unique and generated every time we called id
console.log(`new ObjectID: ${ID}`);
console.log(`Buffer on ObjectID: ${ID.id.length}`); //  12
console.log(`Buffer on ObjectID: ${ID.toHexString().length}`); //  24
console.log(`Timestamp: ${ID.getTimestamp()}`);

MongoClient.connect(
	connectionURL,
	{ useNewUrlParser: true },
	(error, client) => {
		if (error) {
			return console.log("Unable to connect to DB 🤕");
		}
		console.log("Connected to DB 😄");

		const db = client.db(dbName);

		// //* Example for insertOne()
		db.collection("users").insertOne(
			{ _id: ID, firstName: "Jesse ", lastName: "Pinkman" },
			(err, res) =>
				err
					? console.log(`unable to insert user`)
					: console.log(`inserted user successfully`, res.ops)
		);

		//* Example of insertMany()
		db.collection("users").insertMany(
			[
				{
					firstName: "John",
					lastName: "Snow",
				},
				{
					firstName: "Ned",
					lastName: "Stark",
				},
				{
					firstName: "Rob",
					lastName: "Stark",
				},
			],
			(err, res) =>
				err
					? console.log(`unable to add docs`)
					: console.log(
							`docs added successfully`,
							res.ops,
							`\nCount: ${res.insertedCount}`
					  )
		);

		//* Inserting multiple tasks in tasks collection
		db.collection("tasks").insertMany(
			[
				{
					task: "Host the site",
					completed: true,
				},
				{
					task: "Write new article",
					completed: false,
				},
				{
					task: "Push the new changes to repo",
					completed: true,
				},
			],
			(err, res) =>
				err
					? console.log(`Unable to add tasks into DB`)
					: console.log(
							"Added tasks to DB",
							`\nTasks: `,
							res.ops,
							`\nTask count: ${res.insertedCount}`
					  )
		);
	}
);
