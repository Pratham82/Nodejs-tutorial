const path = require("path");
const express = require("express");
const hbs = require("hbs");

//* Express library exports a single function
const app = express();

console.log(__dirname);
// D:\Tutorials\Nodejs-tutorial\Complete Node.js Developer\Web server\src

console.log(__filename);
// D:\Tutorials\Nodejs-tutorial\Complete Node.js Developer\Web server\src\app.js
console.log(path.join(__dirname, "../public"));

//**** Creating paths for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//*** Setup handlebars engine and views location ***
//* Dynamic pages with template engine
//* We will setup a template engine, set allows to set a value for given express setting, in here we are setting name and a value. it should be exact 'view engine' or else express won't know we are setting up view engine. 2nd parameter is the "hbs" i.e handlebars extension
app.set("view engine", "hbs");
app.set("views", viewsPath);

//* Registering partials path
hbs.registerPartials(partialsPath);

//*** Setup static directory to serve ***
//* Passing the static dir path to the express method
//* this will show on root path on
app.use(express.static(publicPath));

//*** Rendering dynamic pages ***
//* Passing data to the template
app.get("", (req, res) =>
	res.render("index", {
		title: "Weather app dynamic",
		name: "Prathamesh Mali",
	})
);

app.get("/about", (req, res) =>
	res.render("about", {
		title: "About page dynamic",
		about: "We help you to find weather info",
		name: "Prathamesh Mali",
	})
);

app.get("/help", (req, res) =>
	res.render("help", {
		title: "Help page",
		info: "Help page from dynamic hbs",
		name: "Prathamesh Mali",
	})
);

/* 
* get(route, function(req.res))
* 1st argument will be the route that we take in
* 2nd argument is the function: this function has two arguments, 

* Arguments in the function: 
* 1.first is the object containing the info about incoming request to the server (called req)
* 2. second argument is the response, this contains bunch of methods allowing us to customize, what we are going to send back to requestor (called res)
*/

// app.get("", (req, res) => {
// 	res.send("Hello from express 😄");
// });

//** Creating different routes

//* We can also serve HTML on the routes
// app.get("/weatherInfo", (req, res) =>
// 	res.send("<h1>Weather ☁️</h1> <p>This is the weather  page</p>")
// );

//* We can also serve JSON response on the routes
// app.get("/help", (req, res) =>
// 	res.send([{ name: "Prathamesh", message: "This is help page 💗" }])
// );

// app.get("/weather", (req, res) =>
// 	res.send({
// 		lat: 42.5512,
// 		lon: 94.5541,
// 		forecast: "Broken clouds",
// 	})
// );

// app.get("/about", (req, res) =>
// 	res.send("<h1>About</h1> <p>This is about 🙎 page</p>")
// );

//* Start the server

//* This task will run continuously, it won't stop unless we stropped it, it will be up and running listening and processing new requests
app.listen(3000, () => console.log("Server is up on the port 3000"));
