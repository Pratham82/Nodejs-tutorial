/*
Primary file for the API
*/

// Starting a server
// Dependencies
var http = require("http");
var https = require("https");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;
var config = require("./lib/config");
var fs = require("fs");
var handlers = require("./lib/handlers");
var helpers = require("./lib/helpers");

//* Instantiating HTTP server
var HTTPServer = http.createServer(function (req, res) {
	unifiedServer(req, res);
});

//* Starting HTTP server
HTTPServer.listen(config.httpPort, function () {
	console.log(
		`The sever is listening on port ${config.httpPort} in ${config.envName} mode`
	);
});

//* Instantiating HTTPS server
var HTTPServerOptions = {
	key: fs.readFileSync("./https/key.pem"),
	cert: fs.readFileSync("./https/cert.pem"),
};
var HTTPSServer = https.createServer(HTTPServerOptions, function (req, res) {
	unifiedServer(req, res);
});

//* Starting HTTP server
HTTPSServer.listen(config.httpsPort, function () {
	console.log(
		`The sever is listening on port ${config.httpsPort} in ${config.envName} mode`
	);
});

//* Creating a unifiedServer for HTTP and HTTPS
var unifiedServer = function (req, res) {
	//* Whenever someone call localhost:3000 this function gets called and the req and res object is new every time

	//* 1. Get the url and parse it
	parsedUrl = url.parse(req.url, true);

	//* 2. Get the path from parsedUrl object

	var path = parsedUrl.pathname;
	var trimmedPath = path.replace(/^\/+|\/+$/g, "");

	//* 2.1 Get the HTTP method
	var method = req.method.toLowerCase();

	//* 2.2 Get the query string as an object
	var queryStringObject = parsedUrl.query;

	//* 2.3 Get the header as an object
	var headers = req.headers;

	var decoder = new StringDecoder("utf-8");
	var buffer = ""; // It will be used to store the stream

	req.on("data", function (data) {
		buffer += decoder.write(data);
	});

	req.on("end", function () {
		buffer += decoder.end();

		var chosenHandler =
			typeof router[trimmedPath] !== "undefined"
				? router[trimmedPath]
				: handlers.notFound;

		//* Construct the data object to send to the handler
		var data = {
			trimmedPath,
			queryStringObject,
			method,
			headers,
			payload: helpers.parseJsonToObject(buffer),
		};

		chosenHandler(data, function (statusCode, payload) {
			//* Use the status code callback by the handler, or default to 200
			statusCode = typeof statusCode == "number" ? statusCode : 200;

			//* use the payload callback by the handler or default to an empty object
			payload = typeof payload == "object" ? payload : {};

			//* Convert the payload to a string
			var payloadString = JSON.stringify(payload);

			//* Add the content type in header
			res.setHeader("Content-Type", "application/json");

			//* After the request is finished we want to do the things that we were doing before

			res.writeHead(statusCode);
			//* 3. Send the response

			//* Returning a payload string
			res.end(payloadString);

			//* If we are sending a payload we have to use POST method
			//* And in POSTMAN we have to add the body so that will be read

			//* 4. Log the request
			console.log("Returning this response: ", statusCode, payloadString);
		});
	});
};

///* Defining a request router
var router = {
	ping: handlers.ping,
	users: handlers.users,
};
