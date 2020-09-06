const request = require("request");
require("dotenv").config();

const geoCode = (address, callback) => {
	const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=${process.env.ACCESS_TOKEN}`;

	request({ url: geoUrl, json: true }, (err, response) => {
		if (err) {
			callback(
				`Cannot connect to location service provided by ${err.hostname}`,
				undefined
			);
			// console.log(
			// 	`Cannot connect to location service provided by ${err.hostname}`
			// );
		} else if (response.body.features.length == 0) {
			// console.log("Unable to find location");
			callback("Unable to find location", undefined);
		} else {
			callback(undefined, {
				location: response.body.features[0].place_name,
				lat: response.body.features[3].center[0],
				lon: response.body.features[3].center[1],
			});
			// console.log(`Latitude: ${response.body.features[3].center[0]}`);
			// console.log(`Longitude: ${response.body.features[3].center[1]}`);
		}
	});
};

module.exports = geoCode;
