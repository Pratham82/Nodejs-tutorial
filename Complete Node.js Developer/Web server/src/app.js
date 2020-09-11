const path = require("path");
const express = require("express");

//*** Express library exports a single function ***
const app = express();

//*** Creating paths for express config ***
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");

//*** Setup handlebars engine and views location ***
app.set("view engine", "hbs");
app.set("views", viewsPath);

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
	})
);

app.get("/help", (req, res) =>
	res.render("help", {
		title: "Help page",
		info: "Help page from dynamic hbs",
	})
);

//* Start the server

//* This task will run continuously, it won't stop unless we stropped it, it will be up and running listening and processing new requests
app.listen(3000, () => console.log("Server is up on the port 3000"));
