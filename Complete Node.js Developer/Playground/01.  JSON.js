const fs = require("fs");

const book = {
	title: "Ego is the enemy",
	author: "Ryan Holiday",
};

//* JSON.stringify will convert the JavaScript object to JSON object
const bookJSON = JSON.stringify(book);
//console.log(bookJSON);
// {"title":"Ego is the enemy","author":"Ryan Holiday"}

//* JSON.parse will convert the JSON object back to JavaScript object
const bookObj = JSON.parse(bookJSON);

//console.log(bookObj);
// { title: 'Ego is the enemy', author: 'Ryan Holiday' }
//* Now we can access all the properties on bookObj
console.log(bookObj.title);
console.log(bookObj.author);

//* Writing JSON data to a file
fs.writeFileSync("test.json", bookJSON);

//* Appending new stuff to the JSON file
// const newData = JSON.stringify({ title: "Depp Work", author: "Cal Newport" });
// fs.appendFileSync("test.json", newData);

//* Reading through a file
//* readFileSync method returns buffer(representation of binary data)
const dataBuffer = fs.readFileSync("test.json");

console.log(dataBuffer);
/*
<Buffer 7b 22 74 69 74 6c 65 22 3a 22 45 67 6f 20 69 73 20 74 68 65 20 65 6e 65 6d 79 22 2c 22 61 75 74 68 6f 72 22 3a 22 52 79 61 
6e 20 48 6f 6c 69 64 61 79 ... 2 more bytes>
*/

//* We can convert the buffer into string using toString method, this will still will be in JSON format
const dataString = dataBuffer.toString();

console.log(dataString);
// {"title":"Ego is the enemy","author":"Ryan Holiday"}

//* for converting JSON back to string we wil use JSON.parse
const data = JSON.parse(dataString);
console.log(data);
// { title: 'Ego is the enemy', author: 'Ryan Holiday' }
console.log(data.title); // Ego is the enemy
