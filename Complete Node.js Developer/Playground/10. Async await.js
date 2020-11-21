// Normal funciton without any return value will return undefined
//const doWork = () => {}

// Async function without any return value will return a promise{undefined}
// Async function will always return a  promise and the value is decided by the developer

/*
const doWork = async () => {
  return 'Prathamesh'
}

console.log(doWork())
Output: 
Promise {'Prathamesh'}
*/

const add = (a, b) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject('Both numbers should be positive')
      }
      resolve(a + b)
    }, 3000)
  })

// Creating and using an async function
const doWork2 = async () => {
  // In every await the function will wait for 3 sec then exectue the next task and in total it will take 9 sec
  // Async await code looks synchronous but its actully asynchronous and it looks more cleaner syntactically
  // Its better than promise chaining
  // In async await we have a single scope so we can use any value which returning from various promises
  // If the promise gets rejected then the execution will stop then and there
  const sum = await add(12, 43)
  const sum2 = await add(50, sum)
  const sum3 = await add(-52, sum2)
  return sum3
}

doWork2()
  .then(res => console.log(`res: ${res}`))
  .catch(err => console.log(`err: ${err}`))
