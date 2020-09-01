const fs = require("fs");
const chalk = require("chalk");

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
		console.log(
			chalk.greenBright.inverse("New note successfully added ...🖊")
		);
	} else {
		console.log(chalk.yellowBright.inverse("Title taken 👍"));
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

//* Remove notes function
const removeNote = (title) => {
	const titleIndex = loadNotes()
		.map((val) => val.title)
		.indexOf(title);

	const titles = loadNotes().map((val) => `"${val.title}"`);

	if (titleIndex > -1) {
		console.log(`found notes at index ${titleIndex}`);
		const newNotes = loadNotes().filter((val) => val.title !== title);
		console.log(
			chalk.greenBright.inverse(
				`Successfully removed note with title: ${title} 🗑`
			)
		);

		saveNotes(newNotes);
	} else {
		console.log(
			chalk.redBright(
				`Notes with this title ${title} not found ☹️\nThese are the available title:  ${titles}`
			)
		);
	}
};

module.exports = { getNotes, addNote, removeNote };
