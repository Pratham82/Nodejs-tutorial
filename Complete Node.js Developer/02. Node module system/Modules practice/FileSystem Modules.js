const fs = require("fs");

//* fs.writeFileSync(file, data[, options])
//* This method wil  write the data specified on the second argument to the first file
//* First argument is the name of the file and second argument is data to writes
fs.writeFileSync("notes.txt", "My name is Prathamesh 😄");

//* Challenge 1: Append message to notes.txt
fs.appendFileSync("notes.txt", "\nThis is new line to be appended");
