const fs = require("fs");

//* Challenge 2: Define and use a function a new file

const getNotes = () => "These are your Notes....";

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicatesArr = notes.filter((note) => note.title === title);
	console.log("Duplicate arr: ", duplicatesArr.length);

	if (duplicatesArr.length === 0) {
		notes.push({
			title,
			body,
		});
		saveNotes(notes);
		console.log("New note added ...🖊");
	} else {
		console.log("Title taken 👍");
	}
};

// Saving notes

const saveNotes = (notes) => {
	fs.writeFileSync("notes.json", JSON.stringify(notes));
};

//* This function will go through our file system and checks if the notes.json is present or not, if its not present we will return an empty array

const loadNotes = () => {
	try {
		return JSON.parse(fs.readFileSync("notes.json").toString());
	} catch (e) {
		return [];
	}
};

module.exports = { getNotes, addNote };
