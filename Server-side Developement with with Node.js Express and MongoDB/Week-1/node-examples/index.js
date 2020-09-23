// const rect = {
// 	perimeter: (l, b) => l * b,
// 	area: (l, b) => 2 * (l * b),
// };

// Importing rectangle from external modules

const rect = require("./rectangle");

const solveRect = (l = 1, b = 1) =>
	l === 0 || b === 0
		? `Rectangle Dimensions should be greater than 0`
		: `Area of triangle: ${rect.area(l, b)} `;

console.log(solveRect());
