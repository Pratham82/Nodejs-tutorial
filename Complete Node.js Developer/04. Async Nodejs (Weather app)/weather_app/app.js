const request = require("request");
const fetch = require("node-fetch");
const geoCode = require("./utils");

require("dotenv").config();

// const url = `https://api.openweathermap.org/data/2.5/weather?q=new%20york&units=metric&APPID=${process.env.API_KEY}`;

// request({ url, json: true }, (err, response) => {
// 	if (err) {
// 		console.log(
// 			`Unable to connect to the weather service provided by ${err.hostname}`
// 		);
// 	} else if (response.body.err) {
// 		console.log(`Unable to find location`);
// 	} else {
// 		console.log(
// 			`Today's forecast: ${response.body.weather[0].description}`
// 		);
// 		console.log(`It's currently ${response.body.main.temp}°C `);
// 	}
// });

//* Geocoding service
const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/new%20york.json?access_token=${process.env.ACCESS_TOKEN}`;

// request({ url: geoUrl, json: true }, (err, response) => {
// 	if (err) {
// 		console.log(
// 			`Cannot connect to location service provided by ${err.hostname}`
// 		);
// 	} else if (response.body.features.length == 0) {
// 		console.log("Unable to find location");
// 	} else {
// 		console.log(`Latitude: ${response.body.features[3].center[0]}`);
// 		console.log(`Longitude: ${response.body.features[3].center[1]}`);
// 	}
// });

//* One call API
// const fs = require("fs");
const openAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=19.140512&lon=72.842155&units=metric&appid=${process.env.API_KEY}`;

// fetch(openAPI)
// 	.then((res) => res.json())
// 	.then((data) =>
// 		console.log(
// 			`Its ${data.current.temp} °C, feels like ${data.current.feels_like} in \nToday's forecast: ${data.current.weather[0].main}`
// 		)
// 	)
// 	.catch((err) => console.log(err));

// `Its ${data.current.temp} °C, feels like  ${data.current.feels_like} in \nToday's forecast: ${data.current.weather[0].main}`;

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
