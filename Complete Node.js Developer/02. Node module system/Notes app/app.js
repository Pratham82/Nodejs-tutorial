const fs = require("fs");
const addFn = require("./utils");
const getNotes = require("./notes");
const validator = require("validator");
const chalk = require("chalk");

//* Writing to a file
fs.writeFileSync("notes.txt", "This is initial write on the file");

//* Appending to the files
fs.appendFileSync("notes.txt", "\nThis line will be appended");

console.log(addFn(23, 27));

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
		? chalk.green.bold("URL Validation cleared ✅")
		: chalk.red("URL Validation failed ❌")
);

console.log(chalk.green.bold.italic.inverse("Success"));
console.log("test");
