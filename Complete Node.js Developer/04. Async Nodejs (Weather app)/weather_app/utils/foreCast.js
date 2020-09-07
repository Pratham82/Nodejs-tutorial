const request = require("request");
require("dotenv").config();

const foreCast = (lat, lon, callback) => {
	const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${encodeURIComponent(
		lat
	)}&lon=${encodeURIComponent(lon)}&units=metric&appid=${
		process.env.API_KEY
	}`;

	request({ url: forecastUrl }, (err, res) => {
		if (err) {
			callback(
				`Cannot connect to weather  service provided by ${err.hostname}`,
				undefined
			);
		} else if (res.statusCode === 400) {
			callback(`Unable to find location`, undefined);
		} else {
			const parsedData = JSON.parse(res.body);
			callback(
				undefined,
				`Its ${parsedData.current.temp} °C, feels like ${parsedData.current.feels_like} \nToday's forecast: ${parsedData.current.weather[0].main}`
			);
		}
	});
};

module.exports = foreCast;
