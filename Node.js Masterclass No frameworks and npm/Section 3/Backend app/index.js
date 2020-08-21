/*
Primary file for the API


*/

// Starting a server
// Dependencies
var http = require("http");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;
// console.log(http);

// The sever should respond to all requests with a string
var server = http.createServer(function (req, res) {
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

	//* When the request object emmits the event on data we want the callback to be called and the data should be passed to the callback, and the data should be appended toe buffer though a string decoder

	req.on("data", function (data) {
		//* As the data is streaming in every time it stream in a little piece he request object emits the data event that we are binding to and it sends us the bunch of un-decoded data, we decode it using (utf-8) and we append the result ot the buffer

		buffer += decoder.write(data);
	});

	//* We have a predefined function which tells us when the stream is ended
	//* The end event will be called every time even if we send the payload or not, data event will not be called always
	//* If we don't have a payload in our request then the buffer will initialized with empty string but noting gets appended to it, after that the end event will be called and ended then then the response will be sent

	req.on("end", function () {
		buffer += decoder.end();

		//* After the request is finished we want to do the things that we were doing before
		//* 3. Send the response
		res.end("Hello world\n");

		//* 4. Log the request
		// console.log(
		// 	`Request is received path: ${trimmedPath} \n with ${method} method \n and with these query string params: `,
		// 	queryStringObject,
		// 	`\nheaders:`,
		// 	headers,
		// 	`Given payload: `,
		// 	buffer
		// );
		//* If we are sending a payload we have to use POST method
		//*  And in POSTMAN we have to add the body so that will be read
		console.log("Request received with this payload: ", buffer);
	});
});

//Start the server, and have it listen on PORT 3000
server.listen(3000, function () {
	console.log("The sever is listening on port 3000");
});

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
*/
