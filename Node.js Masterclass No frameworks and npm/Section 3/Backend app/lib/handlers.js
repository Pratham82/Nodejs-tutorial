/*
 * Request Handlers
 *
 */

//* Dependencies
var _data = require("./data");
var helpers = require("./helpers");

//* Define all the handlers
var handlers = {};

//* Ping
handlers.ping = function (data, callback) {
	callback(200);
};

//* Not-Found
handlers.notFound = function (data, callback) {
	callback(404);
};

//* Users
handlers.users = function (data, callback) {
	var acceptableMethods = ["post", "get", "put", "delete"];
	if (acceptableMethods.indexOf(data.method) > -1) {
		handlers._users[data.method](data, callback);
	} else {
		callback(405);
	}
};

//* Data inside the handlers contains the block of data which has been parsed earlier
//* We want the handlers to callback when they're done handling the request and tell us 2 things : 1) Callback a HTTP status code 2) A payload(object)

//* Container for all the users methods
handlers._users = {};

//* Users - post
//* Required data: firstName, lastName, phone, password, tosAgreement
//* Optional data: none
handlers._users.post = function (data, callback) {
	// Check that all required fields are filled out
	var firstName =
		typeof data.payload.firstName == "string" &&
		data.payload.firstName.trim().length > 0
			? data.payload.firstName.trim()
			: false;
	var lastName =
		typeof data.payload.lastName == "string" &&
		data.payload.lastName.trim().length > 0
			? data.payload.lastName.trim()
			: false;
	var phone =
		typeof data.payload.phone == "string" &&
		data.payload.phone.trim().length == 10
			? data.payload.phone.trim()
			: false;
	var password =
		typeof data.payload.password == "string" &&
		data.payload.password.trim().length > 0
			? data.payload.password.trim()
			: false;
	var tosAgreement =
		typeof data.payload.tosAgreement == "boolean" &&
		data.payload.tosAgreement == true
			? true
			: false;

	if (firstName && lastName && phone && password && tosAgreement) {
		// Make sure the user doesn't already exist
		_data.read("users", phone, function (err, data) {
			if (err) {
				// Hash the password
				var hashedPassword = helpers.hash(password);

				// Create the user object
				if (hashedPassword) {
					var userObject = {
						firstName: firstName,
						lastName: lastName,
						phone: phone,
						hashedPassword: hashedPassword,
						tosAgreement: true,
					};

					// Store the user
					_data.create("users", phone, userObject, function (err) {
						if (!err) {
							callback(200);
						} else {
							console.log(err);
							callback(500, {
								Error: "Could not create the new user",
							});
						}
					});
				} else {
					callback(500, {
						Error: "Could not hash the user's password.",
					});
				}
			} else {
				// User alread exists
				callback(400, {
					Error: "A user with that phone number already exists",
				});
			}
		});
	} else {
		callback(400, { Error: "Missing required fields" });
	}
};

// Export the handlers
module.exports = handlers;
