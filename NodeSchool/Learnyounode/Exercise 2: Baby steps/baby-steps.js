//## BABY STEPS (Exercise 2 of 13)

// Create a file named baby-steps.js.

// Write a program that accepts one or more numbers as command-line arguments
// and prints the sum of those numbers to the console (stdout)

//* Taking the arguments via process.argv and slicing it because the arguments present at the 2nd index
let arg = process.argv.slice(2);

//* Since we have give the sum of the elements we have to convert the strings into numbers, and after that for getting the sum we will reduce method
let sum = arg.map((val) => Number(val)).reduce((num1, num2) => num1 + num2);

//* Logging the sum
console.log(sum);
