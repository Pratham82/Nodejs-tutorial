const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dbOperations = require("./operations.js");

const url = "mongodb://localhost:27017/";
const dbName = "conFusion";

//*  Accessing server
MongoClient.connect(url, (err, client) => {
	assert.equal(err, null);

	console.log("Connected successfully to the Server");

	//* Connect to the database
	const db = client.db(dbName);

	//* Connecting to the dishes collection
	const collection = db.collection("dishes");

	//*  Adding one document in our collection
	//* 1st parameter: document, 2nd parameter: callback function
	// collection.insertOne(
	// 	{
	// 		name: "JumboBurger",
	// 		description: "Biggest burger",
	// 	},
	// 	(err, res) => {
	// 		assert.equal(err, null);

	// 		console.log("After Insert:\n");
	// 		console.log(res.ops);

	// 		collection.find({}).toArray((err, docs) => {
	// 			assert.equal(err, null);

	// 			console.log("Found:\n");
	// 			console.log(docs);

	// 			db.dropCollection("dishes", (err, res) => {
	// 				assert.equal(err, null);
	// 				client.close();
	// 			});
	// 		});
	// 	}
	// );

	//* Using dbOperations
	dbOperations.insertDocument(
		db,
		{ name: "JumboBurger", description: "Humongous burger" },
		"dishes",
		(res) => {
			console.log("Inserted doc\n", res.ops);

			//* Finding all docs
			dbOperations.findDocuments(db, "dishes", (docs) => {
				console.log("Found docs:", docs);

				//* Updating the doc
				dbOperations.updateDocument(
					db,
					{ name: "JumboBurger" },
					{ description: "Big burger updated" },
					"dishes",
					(res) => {
						console.log("Updated docs\n", res.result);

						//* Again find all docs
						dbOperations.findDocuments(db, "dishes", (docs) => {
							console.log("Found docs:", docs);

							//* Remove all docs from the collection
							db.dropCollection("dishes", (res) => {
								console.log("All dishes removed");
								client.close();
							});
						});
					}
				);
			});
		}
	);
});
