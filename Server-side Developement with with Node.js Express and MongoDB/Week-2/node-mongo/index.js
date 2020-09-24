const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

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
	collection.insertOne(
		{
			name: "JumboBurger",
			description: "Biggest burger",
		},
		(err, res) => {
			assert.equal(err, null);

			console.log("After Insert:\n");
			console.log(res.ops);

			collection.find({}).toArray((err, docs) => {
				assert.equal(err, null);

				console.log("Found:\n");
				console.log(docs);

				db.dropCollection("dishes", (err, res) => {
					assert.equal(err, null);
					client.close();
				});
			});
		}
	);
});
