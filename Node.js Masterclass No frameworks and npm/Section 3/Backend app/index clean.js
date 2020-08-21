/*
Primary file for the API
*/

// Starting a server
// Dependencies
var http = require("http");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;

var server = http.createServer(function (req, res) {
	//* Whenever someone call localhost:3000 this function gets called and the req and res object is new every time

	//* 1. Get the url and parse it
	parsedUrl = url.parse(req.url, true);

	//* 2. Get the path from parsedUrl object

	var path = parsedUrl.pathname;
	var trimmedPath = path.replace(/^\/+|\/+$/g, "");

	//* 2.1 Get the HTTP method
	var method = req.method;

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

		//* 3. Send the response
		res.end("Hello world\n");

		//* 4. Log the request
		// console.log(
		// 	`Request is received path: ${trimmedPath} \n with ${method} method \n and with these query string params: `,
		// 	queryStringObject,
		// 	`\nheaders:`,
		// 	headers
		// );
		console.log("Request received with this payload: ", buffer);
	});
});

//Start the server, and have it listen on PORT 3000
server.listen(3000, function () {
	console.log("The sever is listening on port 3000");
});
