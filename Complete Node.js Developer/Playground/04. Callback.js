//* Callback functions

//* Callback function is function that we provide to another function

setTimeout(() => console.log("Log this after 1 seconds"), 1000);

const names = ["James", "Drew", "Hogg", "Jen"];
const shortNames = (arr) => arr.filter((val) => val.length < 4);

console.log(shortNames(names));

const geoCode = (address, callback) => {
	setTimeout(() => {
		const data = {
			lat: 0,
			lon: 0,
		};

		// return data;
		//* Here rather than returning the data via current function we are passing the data to the callback function which can be used in the future
		callback(data);
	}, 1000);
};

// const data = geoCode("Jog");
// console.log(data);

geoCode("address1", (dataFromFun) => console.log(dataFromFun));
