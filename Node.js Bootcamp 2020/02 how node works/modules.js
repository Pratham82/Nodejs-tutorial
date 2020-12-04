const calc = require('./test-module-1')

//console.log(arguments)
//console.log(require('module').wrapper)

// Module.exports
const c1 = new calc()
console.log(c1.add(10, 10))

// Exports
// This calc2 is an exported object so we can use the functions in it right away
const calc2 = require('./test-module-2')
console.log(calc2.add(10, 30))

// Using destructuring for getting all the functions on calc2
const { add, subtract, multiply, divide } = calc2
console.log(add(100, 100))
console.log(multiply(5, 5))

// Caching
require('./test-module-3')()
require('./test-module-3')()
require('./test-module-3')()
/*

* Outputs: 

20
40
200
25
hello from module
Log this  😈
Log this  😈
Log this  😈
*/
