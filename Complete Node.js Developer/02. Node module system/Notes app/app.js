//* Import files
const fs = require("fs");

//* import utils
// const name = require("./utils");
const addFn = require("./utils");

//* import getNotes
const getNotes = require("./notes");

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
