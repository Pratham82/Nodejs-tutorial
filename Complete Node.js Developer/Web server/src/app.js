const express = require("express");

//* Express library exports a single function
const app = express();

/* 
* get(route, function(req.res))
* 1st argument will be the route that we take in
* 2nd argument is the function: this function has two arguments, 

* Arguments in the function: 
* 1.first is the object containing the info about incoming request to the server (called req)
* 2. second argument is the response, this contains bunch of methods allowing us to customize, what we are going to send back to requestor (called res)
*/

app.get("", (req, res) => {
	res.send("Hello from express 😄");
});

//** Creating different routes

//* We can also serve HTML on the routes
app.get("/weatherInfo", (req, res) =>
	res.send("<h1>Weather ☁️</h1> <p>This is the weather  page</p>")
);

//* We can also serve JSON response on the routes
app.get("/help", (req, res) =>
	res.send([{ name: "Prathamesh", message: "This is help page 💗" }])
);

app.get("/weather", (req, res) =>
	res.send({
		lat: 42.5512,
		lon: 94.5541,
		forecast: "Broken clouds",
	})
);

app.get("/about", (req, res) =>
	res.send("<h1>About</h1> <p>This is about 🙎 page</p>")
);

//* Start the server

//* This task will run continuously, it won't stop unless we stropped it, it will be up and running listening and processing new requests
app.listen(3000, () => console.log("Server is up on the port 3000"));
