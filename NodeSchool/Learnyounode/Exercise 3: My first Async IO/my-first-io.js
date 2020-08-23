// ## MY FIRST I/O! (Exercise 3 of 13)

// Create a file named my-first-io.js.

// Write a program that uses a single synchronous filesystem operation to
// read a file and print the number of newlines (\n) it contains to the console (stdout), similar to running cat file | wc -l.
// The full path to the file to read will be provided as the first
// command-line argument (i.e., process.argv[2]). You do not need to make your own test file.

//* Importing the core filesystem module
// const fs = require("fs");

//* Store the info read from the given file and store it into buffer
// let buffer = fs.readFileSync(process.argv[2]);

//* Finding the amount of newline characters inside the given file
// let str = buffer.toString().split("\n").length - 1;
// console.log(str);

//* OR we can also use utf-8 so we don't have to convert our buffer to a string
//* Using utf-8
let bufferUTF8 = fs.readFileSync(process.argv[2], "utf-8");
let str2 = bufferUTF8.split("\n").length - 1;
console.log(str2);

//* For testing the file you have to pass the file as a argument with the current file:
//* node my-first-io test.txt
