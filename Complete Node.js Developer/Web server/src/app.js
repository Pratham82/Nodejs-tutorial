const path = require("path");
const express = require("express");
const hbs = require("hbs");

//*** Express library exports a single function ***
const app = express();

//*** Creating paths for express config ***
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//*** Setup handlebars engine and views location ***
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
		title: "Weather",
		info: "Get your weather right",
		name: "Prathamesh Mali",
	})
);

app.get("/about", (req, res) =>
	res.render("about", {
		title: "About",
		about: "We help you to find weather info",
		name: "Prathamesh Mali",
	})
);

app.get("/help", (req, res) =>
	res.render("help", {
		title: "Help",
		info: "Help page from dynamic hbs",
		name: "Prathamesh Mali",
	})
);

//* Adding 404 handler specific to help pages
app.get("/help/*", (req, res) =>
	res.render("404page", {
		message: "Help page not found",
		name: "Prathamesh Mali",
	})
);

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "address is not provided",
		});
	} else {
		return res.send({
			forecast: " Its raining",
			location: "New York",
			address: req.query.address,
		});
	}
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "Search term was not provided",
		});
	}
	console.log(req.query.city);
	console.log(req.query.search);
	res.send({
		milk: "10$",
		notebook: "15$",
	});
});

//* Adding a 404 handler
app.get("*", (req, res) =>
	res.render("404page", {
		message: "Page not found",
		name: "Prathamesh Mali",
	})
);

//* Start the server

//* This task will run continuously, it won't stop unless we stropped it, it will be up and running listening and processing new requests
app.listen(3000, () => console.log("Server is up on the port 3000"));
