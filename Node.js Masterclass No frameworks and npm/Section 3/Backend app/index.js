/*
Primary file for the API

*/

// Starting a server
// Dependencies
var http = require("http");
var https = require("https");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;
var config = require("./config");
var fs = require("fs");
var _data = require("./lib/data");

// console.log(http);

//* Testing the library that we have created
// TODO CREATE new file and write operation
// _data.create("test", "testingFile", { name: "Jason" }, function (err) {
// 	console.log(
// 		err == false ? "Data successfully written to the file ✅" : "Error 😢 ",
// 		err
// 		// "This was error",
// 		// err
// 	);
// });

// // TODO Testing read file operation
// _data.read("test", "testingFile", function (err, data) {
// 	console.log(
// 		// err == false ? `Data from the file ${data}` : "Error 😢 ",
// 		// err
// 		!err ? `Data from the file ${data}` : `Error 😢 \n${err}`
// 	);
// });

// // TODO Testing update file operation
// _data.update("test", "testingFile", { name: "New data" }, function (err) {
// 	console.log(
// 		err == false ? "Data successfully updated ✅" : ` Error 😢  ${err}`
// 	);
// });

// TODO Testing delete file operation
_data.delete("test", "testingFile", function (err) {
	console.log(
		err == false ? "File successfully deleted ✅" : ` Error 😢  ${err}`
	);
});

//* Instantiating the HTTP server
var HTTPServer = http.createServer(function (req, res) {
	unifiedServer(req, res);
});

//* Starting HTTP server
HTTPServer.listen(config.httpPort, function () {
	// console.log("The sever is listening on port 3000");
	console.log(
		`The server is listening on port ${config.httpPort} in ${config.envName} mode`
	);
});

//* Instantiating the HTTPS server
var HTTPSServerOptions = {
	key: fs.readFileSync("./https/key.pem"),
	cert: fs.readFileSync("./https/cert.pem"),
};
var HTTPSServer = https.createServer(HTTPSServerOptions, function (req, res) {
	unifiedServer(req, res);
});

//* Starting HTTPS server
HTTPSServer.listen(config.httpsPort, function () {
	console.log(
		`The server is listening on port ${config.httpsPort} in ${config.envName} mode`
	);
});

//* Creating unified server for http and https
var unifiedServer = function (req, res) {
	//* Whenever someone call localhost:3000 this function gets called and the req and res object is new every time

	//* 1. Get the url and parse it
	//* "req" object has all the info about what that user is asking for
	//* In this example we are narrowing down on the full url
	//* "true" is used for calling the query string module itself
	parsedUrl = url.parse(req.url, true);

	//* 2. Get the path from parsedUrl object
	//* pathname is the key that is set on "parsedUrl" object, it is the untrimmed path tha the user requests
	var path = parsedUrl.pathname;
	var trimmedPath = path.replace(/^\/+|\/+$/g, "");

	//* 2.1 Get the HTTP method
	var method = req.method;

	//* 2.2 Get the query string as an object
	var queryStringObject = parsedUrl.query;

	//* 2.3 Get the header as an object
	var headers = req.headers;

	//* Notes on streams and payloads
	//* Streams: are bits of information coming in little bit at a time
	//* Streams are built in to node

	//* Payloads: comes as the part of http request come in to the http server as (stream) we need to collect that stream as it comes in, when the stream tells us we are at the end merge that into one coherent thing

	//* 2.4 Get the payload if there is any
	//* here we are creating new decoder and add what type of encoding we gonna use
	var decoder = new StringDecoder("utf-8");
	var buffer = ""; // It will be used to store the stream

	//* When the request object emits the event on data we want the callback to be called and the data should be passed to the callback, and the data should be appended toe buffer though a string decoder

	req.on("data", function (data) {
		//* As the data is streaming in every time it stream in a little piece he request object emits the data event that we are binding to and it sends us the bunch of un-decoded data, we decode it using (utf-8) and we append the result ot the buffer

		buffer += decoder.write(data);
	});

	//* We have a predefined function which tells us when the stream is ended
	//* The (end) event will be called every time even if we send the payload or not, data event will not be called always
	//* If we don't have a payload in our request then the buffer will initialized with empty string but noting gets appended to it, after that the end event will be called and ended then then the response will be sent

	req.on("end", function () {
		buffer += decoder.end();

		//*Choose the handler this request should go to. If one is not found, use the not found handler
		//* If the path that user is requesting is exists as the key on the router for eg. if the user is requesting (/sample) that exists on the router so that request should be routed to (handlers.sample), if the request doesn't exists, for eg. request is (/foo) so we should route the request to (handlers.notFound)
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
			payload: buffer,
		};

		//* Route the request  to the handler specified in the router
		chosenHandler(data, function (statusCode, payload) {
			//* Use the status code callback by the handler, or default to 200
			statusCode = typeof statusCode == "number" ? statusCode : 200;

			//* use the payload callback by the handler or default to an empty object
			payload = typeof payload == "object" ? payload : {};

			//* Convert the payload to a string
			var payloadString = JSON.stringify(payload);

			//* After the request is finished we want to do the things that we were doing before

			//* Return the response
			//* We are using the built in writeHead function that comes from every response object received by http server to write a status code
			//* If we are returning a 200 then we are writing 200 response here
			//* Whatever status code the handler is defined will be written here

			//* Specifying the format of the response by adding the content type in header
			res.setHeader("Content-Type", "application/json");

			res.writeHead(statusCode);
			//* 3. Send the response
			// res.end("Hello World\n");

			//* Returning a payload string
			res.end(payloadString);

			//* If we are sending a payload we have to use POST method
			//* And in POSTMAN we have to add the body so that will be read

			//* 4. Log the request
			console.log("Returning this response: ", statusCode, payloadString);
		});

		//* Old request
		// console.log(
		// 	`Request is received path: ${trimmedPath} \n with ${method} method \n and with these query string params: `,
		// 	queryStringObject,
		// 	`\nheaders:`,
		// 	headers,
		// 	`Given payload: `,
		// 	buffer
		// );
	});
};

//* Define the handlers
var handlers = {};

//* Data inside the handlers contains the block of data which has been parsed earlier
//* We want the handlers to callback when they're done handling the request and tell us 2 things : 1) Callback a HTTP status code 2) A payload(object)

//* Creating sample handler
handlers.sample = function (data, callback) {
	callback(406, { name: "Sample handler" });
};

handlers.ping = function (data, callback) {
	callback(200, { status: "connection alive" });
};

//* Not found handler
handlers.notFound = function (data, callback) {
	callback(404);
};
///* Defining a request router
var router = {
	sample: handlers.sample,
	ping: handlers.ping,
};

/*

*Outputs (Before adding the decoder):

* when we request the url: curl localhost:3000/foo?fizz=buzz
* OP: Request is received on this path: foo with GET method and with these query string params:  [Object: null prototype] { fizz: 'buzz' }
* Here ,
* trimmedPath = foo 
* method = GET 
* queryStringObject = [Object: null prototype] { fizz: 'buzz' }



* Output after adding the decoder:
* when we request the url: localhost:3000
* The sever is listening on port 3000
* Request received with this payload:  This is the body we are sending


* Output after Routing Request:
The sever is listening on port 3000
Returning this response:  406 {"name":"Sample handler"}
*/
