/*
Library for storing and editing data
*/

//* Dependencies
var fs = require("fs");
var path = require("path");
var helpers = require("./helpers");

//* Container for the module (To be exported)
var lib = {};

//* Base directory of the data folder
//* Here we are specifying the directory of data folder
lib.baseDir = path.join(__dirname, "/../.data/");

//* WRITE data to a file
lib.create = function (dir, file, data, callback) {
	//* Open the file for writing
	//* We will be passing the base directory created earlier + the directory entered by user and the filename with json extension, "wx" flag is used  for writing. In the function parameters fileDescriptor is a way to identify the specific file.
	fs.open(lib.baseDir + dir + "/" + file + ".json", "wx", function (
		err,
		fileDescriptor
	) {
		if (!err && fileDescriptor) {
			//*Convert Data to string
			//* In this library we will always store data in string format and for returning it we will convert it back to json
			var stringData = JSON.stringify(data);

			//* Write the converted data to the file and close it
			fs.writeFile(fileDescriptor, stringData, function (err) {
				if (!err) {
					fs.close(fileDescriptor, function (err) {
						if (!err) {
							callback(false);
						} else {
							callback("Error closing the file");
						}
					});
				} else {
					callback("Error writing to new file");
				}
			});
		} else {
			callback("Could not create a new it may be already present");
		}
	});
};

//* READ data from a file
lib.read = function (dir, file, callback) {
	fs.readFile(lib.baseDir + dir + "/" + file + ".json", "utf8", function (
		err,
		data
	) {
		if (!err && data) {
			var parsedData = helpers.parseJsonToObject(data);
			callback(false, parsedData);
		} else {
			callback(err, data);
		}
	});
};

//* UPDATE data inside the file
lib.update = function (dir, file, data, callback) {
	//* Open the file for writing
	fs.open(lib.baseDir + dir + "/" + file + ".json", "r+", function (
		err,
		fileDescriptor
	) {
		if (!err && fileDescriptor) {
			//* Convert the data to string
			var stringData = JSON.stringify(data);

			//* Truncate the file
			//* Previously used truncate, updated version of the function is ftruncate
			fs.ftruncate(fileDescriptor, function (err) {
				if (!err) {
					//* Write new data to the file and close it
					fs.writeFile(fileDescriptor, stringData, function (err) {
						if (!err) {
							fs.close(fileDescriptor, function (err) {
								if (!err) {
									callback(false);
								} else {
									callback("Error closing the current file");
								}
							});
						} else {
							callback("Error writing to existing  file");
						}
					});
				} else {
					callback("Error truncating file");
				}
			});
		} else {
			callback(
				"Could not open the file for updating, it may not exist yet"
			);
		}
	});
};

//* DELETE the file
lib.delete = function (dir, file, callback) {
	//* Unlink the file
	fs.unlink(this.baseDir + dir + "/" + file + ".json", function (err) {
		if (!err) {
			callback(false);
		} else {
			callback("Error deleting the file");
		}
	});
};

//* Export the module
module.exports = lib;
