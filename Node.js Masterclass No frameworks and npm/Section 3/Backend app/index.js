/*
Primary file for the API


*/

// Starting a server
// Dependencies
var http = require("http");
// console.log(http);

// The sever should respond to all requests with a string
var server = http.createServer(function (req, res) {
	res.end("Hello world\n");
});

//Start the server, and have it listen on PORT 3000
server.listen(3000, function () {
	console.log("The sever is listening on port 3000");
});
