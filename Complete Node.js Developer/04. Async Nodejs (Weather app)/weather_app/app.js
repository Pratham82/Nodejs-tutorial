const request = require("request");
const fetch = require("node-fetch");
const geoCode = require("./utils/geoCode");
const foreCast = require("./utils/foreCast");
// const foreCast = require("./utils");

require("dotenv").config();

geoCode("Mumbai", (error, response) => {
	console.log({
		Response: response,
		Error: error,
	});
	return {
		Response: response,
		Error: error,
	};
});

foreCast(18.937456, 72.826337, (error, data) => {
	console.log("Error: ", error);
	console.log("Data:", data);
});
