/*
Primary file for the API


*/

// Starting a server
// Dependencies
var http = require("http");
var url = require("url");
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

	//* 3. Send the response
	res.end("Hello world\n");

	//* 4. Log the request
	console.log(
		`Request is received path: ${trimmedPath} \n with ${method} method \n and with these query string params: `,
		queryStringObject,
		`\nheaders:`,
		headers
	);
});

//Start the server, and have it listen on PORT 3000
server.listen(3000, function () {
	console.log("The sever is listening on port 3000");
});

/*

Outputs:

* when we request the url: curl localhost:3000/foo?fizz=buzz
* OP: Request is received on this path: foo with GET method and with these query string params:  [Object: null prototype] { fizz: 'buzz' }
* Here ,
* trimmedPath = foo 
* method = GET 
* queryStringObject = [Object: null prototype] { fizz: 'buzz' }
*/
