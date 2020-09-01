//* Regular function
const square = function (x) {
	return x ** 2;
};

//* Arrow function
const squareArrow = (x) => x ** 2;

console.log(square(12));
console.log(squareArrow(12));

const event = {
	name: "Birthday Party",
	//Reg function
	// printGuestList: function () {
	// 	console.log(`GuestList for ${this.name}`);
	// },
	guestList: ["Ross", "Chandler", "Monica", "Rachael", "Phoebe"],

	//* We cannot access "this" in arrow functions we have to use ES6 shorthand
	printGuestList() {
		console.log(`GuestList for ${this.name}`);
		this.guestList.map((guest) =>
			console.log(`${guest} is attending the ${this.name}.`)
		);
	},
};

// console.log(event);
// console.log(event.name);
event.printGuestList();
