const fs = require("fs");
const chalk = require("chalk");

//* Challenge 2: Define and use a function a new file

const getNotes = () => "These are your Notes....";

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicatesArr = notes.filter((note) => note.title === title);
	// console.log("Duplicate arr: ", duplicatesArr.length);
	//The filter method in duplicatesArr will look through the whole array even though we found the first duplicate note, so instead of filer we can use find method

	//* Find method checks for first instance of the condition rather than going over complete array and returns true or false if it satisfies condition
	const duplicateNote = notes.find((note) => note.title == title);

	//* If there is no duplicate found we will add the note in the empty array
	if (!duplicateNote) {
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

//* Get titles
const titleNotFound = (title) => {
	const availableTitles = loadNotes().map((val) => `${val.title} `);
	console.log(
		chalk.redBright(`Notes with this title "${title}" not found ☹️`)
	);
	console.log(
		chalk.yellowBright(
			`These are the available titles:  ${availableTitles}`
		)
	);
};

//* Remove notes function
const removeNote = (title) => {
	const titleIndex = loadNotes()
		.map((val) => val.title)
		.indexOf(title);

	// const titles = loadNotes().map((val) => `"${val.title}"`);

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
		titleNotFound(title);
	}
};

//* List all notes

const listNotes = () => {
	console.log(chalk.yellowBright.inverse("All notes:"));
	console.log(
		loadNotes()
			.map((note) => `${chalk.bold(note.title)}: ${note.body}`)
			.join("\n")
	);
};

const readNote = (title) => {
	const note = loadNotes().find((note) => note.title === title);
	if (note) {
		console.log(`${chalk.bold(note.title.toUpperCase())}: \n${note.body}`);
	} else {
		titleNotFound(title);
	}
};

module.exports = { getNotes, addNote, removeNote, listNotes, readNote };
