const fs = require("fs");

//* Challenge: work with JSON Data
//* Load and parse JSON data, modify it and overwrite it to the same json file

//* reading data, converting buffer to string and parsing the JSON object
const data = JSON.parse(fs.readFileSync("challenge.json").toString());

//* Modifying the data
data.name = "James Cameron";
data.planet = "Mars";
data.age = "45";

//* Writing modified Data to the same JSON file
fs.writeFileSync("challenge.json", JSON.stringify(data));
