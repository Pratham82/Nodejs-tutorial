const request = require("request");
const fetch = require("node-fetch");
const url =
	"https://api.openweathermap.org/data/2.5/weather?q=new%20york&units=metric&APPID=b0395dee1e7a64a9f7ef16800ef19dab";

request({ url, json: true }, (error, response) => {
	const data = response.body;
	// console.log(data);s
	console.log(`Today's forecast: ${data.weather[0].description}`);
	console.log(`It's currently ${24.11}°C `);
});
