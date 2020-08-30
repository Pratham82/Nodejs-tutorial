//* Create and export configuration variables

const { listeners } = require("process");

//*Container for all environments

var environments = {};

//* Development object

environments.development = {
	httpPort: 3000,
	httpsPort: 3001,
	envName: "development",
	hashingSecret: "thisIsASecret",
};

//* Production object
environments.production = {
	httpPort: 4000,
	httpsPort: 4001,
	envName: "production",
	hashingSecret: "thisIsAlsoASecret",
};

//* Determine which environment was passed as command-line argument. Take the current environment and make it lowercase

let currentEnv =
	typeof process.env.NODE_ENV == "string"
		? process.env.NODE_ENV.toLowerCase()
		: "";

//* Check if the environment passed is one of the two environments and if its not then default to development environment
let environmentToExport =
	typeof environments[currentEnv] == "object"
		? environments[currentEnv]
		: environments.development;

//* Export the module
module.exports = environmentToExport;
