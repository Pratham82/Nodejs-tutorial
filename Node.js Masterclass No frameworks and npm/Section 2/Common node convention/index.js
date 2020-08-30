/*
Title: Basic node app example
DescriptionL Simple fle that declares few functions and invokes it
Author: Prathamesh Mali
Date: 18/08/2020
*/

// Dependencies

var mathLib = require("./lib/math");
var jokesLib = require("./lib/jokes");

// App object
var app = {};

// Configuration
app.config = {
	timeBetweenJokes: 1000,
};

// Function that prints a random joke

app.printAJoke = function () {
	// Get all jokes
	var allJokes = jokesLib.allJokes();

	// Get Length of the jokes
	var numberOfJokes = allJokes.length;

	// Pick a random number between 1 and number of jokes
	var randomNumber = mathLib.getRandomNumber(1, numberOfJokes);

	// Get ht joke at that position in the array (minus one)
	var selectedJoke = allJokes[randomNumber - 1];

	// Send the joke to the console
	console.log(selectedJoke);
};

// Function that loops indefinitely calling the printAJoke function as it goes
app.infiniteLoop = function () {
	// Create the interval, using the config the printAJoke function as it goes
	setInterval(app.printAJoke, app.config.timeBetweenJokes);
};

// Invoke the loop
app.infiniteLoop();
