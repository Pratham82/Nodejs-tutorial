
// Exporting as a function
/*
class Calculator {
  add(n1, n2) {
    return n1 + n2
  }
  multiply(n1, n2) {
    return n1 * n2
  }
  subtract(n1, n2) {
    return n1 - n2
  }
  divide(n1, n2) {
    return n1 / n2
  }
}

// If we have to export 1 single value we will use module.exports
module.exports = Calculator
*/

module.exports = class {
  add(n1, n2) {
    return n1 + n2
  }
  multiply(n1, n2) {
    return n1 * n2
  }
  subtract(n1, n2) {
    return n1 - n2
  }
  divide(n1, n2) {
    return n1 / n2
  }
}