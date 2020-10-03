const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

// Add connections URL
const url = "mongodb://127.0.0.1:27017";
const dbName = "task-manager";

// Connect to the server

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  err
    ? console.log("Cannot connect to the DB")
    : console.log("Connected to ther DB successfully !!");

  const db = client.db(dbName);

  //Create multiple tasks:
  //db.collection("tasks").insertMany(
  //  [
  //    { task: "Compelete the Node Course", status: "Not completed" },
  //    { task: "Complete HacktoberFest Challenege", status: "completed" },
  //    { task: "take a walk", status: "Not completed" },
  //  ],
  //  (err, res) =>
  //    err
  //      ? console.log("Docuements not added to the collection")
  //      : console.log("Docuements successfully added to the collection")
  //);

  // Udpate a single document
  //db.collection("tasks").updateOne(
  //  { task: "take a walk" },
  //  { $set: { task: "Take a walk at night" } },
  //  (err, res) => {
  //    err
  //      ? console.log("Task not updated")
  //      : console.log("Task updated successfully");
  //  }
  //);

  // Delete one document
  db.collection("tasks").deleteOne(
    { task: "Compelete the Node Course" },
    (err, res) =>
      err
        ? console.log("Document is not deleted")
        : console.log("Document successfully deleted !!")
  );
});
