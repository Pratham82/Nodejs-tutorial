//Save the arguments which are passed with the js file

const args = process.argv
  .slice(2)
  .map(n => Number(n))
  .reduce((a, b) => a + b)
console.log(args)
