const https = require("https");

//* Inbuilt node functions for http requests

const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/
	mumbai.json?access_token=pk.eyJ1IjoicHJhdGhhbTgyIiwiYSI6ImNrZW56d20yNTE2NXAyem1xenp3azE0NWgifQ.bv4WTdAQQzFcc0GDyvuxxg`;

const request = https.request(url, (res) => {
	let data = "";
	res.on("data", (chunk) => {
		data = data + chunk.toString();
	});
	res.on("end", () => {
		console.log(JSON.parse(data));
	});
});

request.on("error", (error) => {
	console.log("And error: ", error);
});

request.end();
