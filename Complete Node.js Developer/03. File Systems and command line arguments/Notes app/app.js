const fs = require("fs");
const notes = require("./notes");
const chalk = require("chalk");
const yargs = require("yargs");

//**************** Taking user input ******************

//* Process.agrv provides nodejs installed path, current file path and the argument provided with the current file
console.log(process.argv[2]);

//* we will use the argument as the command for our note app, eg. add, remove update note.

//Customize yargs version
yargs.version = ["1.1.0"];

// console.log(process.argv);

const command = process.argv[2];

//* Features: add, remove, read, list

//* Creating add command
yargs.command({
	command: "add",
	describe: "Add a new note",
	builder: {
		//* Arguments to be passed with add
		title: {
			describe: "Note title",
			//* demandOption make sure that title is provided with the command
			demandOption: true,
			//* We can also specify the data type of this argument
			type: "string",
		},
		body: {
			describe: "Note Body",
			demandOption: true,
			type: "string",
		},
	},

	//* We can access the argv in this handler
	handler: (argv) => {
		// console.log(
		// 	"Adding a new note...",
		// 	`\nTitle: ${argv.title}`,
		// 	`\nBody: ${argv.body} `
		// );
		//Passing the data to the notes module

		notes.addNote(argv.title, argv.body);
	},
});

yargs.command({
	command: "delete",
	describe: "Remove a note",
	handler: () => console.log("Removing a note..."),
});

yargs.command({
	command: "list",
	describe: "List all notes",
	handler: () => console.log("Listing all notes...."),
});

yargs.command({
	command: "read",
	describe: "read a note",
	handler: () => console.log("Reading a note...."),
});

// console.log(yargs.argv);
yargs.parse();
