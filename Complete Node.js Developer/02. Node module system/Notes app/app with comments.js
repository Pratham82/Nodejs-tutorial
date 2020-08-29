//* Import files
const fs = require("fs");

//* import utils
// const name = require("./utils");
const addFn = require("./utils");

//* import getNotes
const getNotes = require("./notes");

//* importing validator (node module)
const validator = require("validator");

//* importing chalk (node module)
const chalk = require("chalk");

//* All of the files which you referred to as modules have their own scopes. So app.js has its own scope and utils.js has its own scope.
//* For accessing the files from various modules we have to use module.exports in the file which we need to export and store that variable using in import
//* Here we are trying to use variable from the  utils.js but
// console.log(name);

//* Writing to a file
fs.writeFileSync("notes.txt", "This is initial write on the file");

//* Appending to the files
fs.appendFileSync("notes.txt", "\nThis line will be appended");

console.log(addFn(23, 27));

//* Calling getNotes function
console.log(getNotes());

//* Checking valid email using the imported npm package
console.log(
	validator.isEmail("james33454gmail.com")
		? chalk.green("Email Validation cleared ✅")
		: chalk.red("Email Validation failed ❌")
);

//* Validating URL with the imported module
console.log(
	validator.isURL("http://www.github.com")
		? chalk.green("URL Validation cleared ✅")
		: chalk.red("URL Validation failed ❌")
);

//* Challenge : Use the chalk library in your app
console.log(chalk.green.bold.italic.inverse("Success"));
console.log("test");

//* Globally installing nodemon
//* npm i -g nodemon
