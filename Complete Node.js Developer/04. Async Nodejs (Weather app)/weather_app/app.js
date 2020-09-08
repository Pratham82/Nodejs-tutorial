const request = require("request");
const fetch = require("node-fetch");
const geoCode = require("./utils/geoCode");
const foreCast = require("./utils/foreCast");
// const foreCast = require("./utils");

require("dotenv").config();

//*  Taking the location from command line arg
const address = process.argv[2];
console.log(address);

geoCode(address, (error, { location, lat, lon }) => {
	if (address) {
		//* Callback chaining
		//* Passing responses from the geoCode APi to the foreCast API
		if (error) {
			return console.log("Error:", error);
		}
		foreCast(lat, lon, location, (error, data) => {
			if (error) {
				console.log(error);
			} else {
				console.log("Location: ", location);
				console.log("Data:", data);
			}
		});
	} else {
		console.log("Please provide a location");
	}
});
