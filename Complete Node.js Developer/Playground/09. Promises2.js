// Simulating an async function
const add = (a, b) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(a + b), 3000)
  })

// Invoking the Promise

/*
// nested Promised
add(12, 43)
  .then(res => {
    console.log(res)

    add(res, 10)
      .then(res2 => console.log(res2))
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
  */

// Using Promise chaining
// This will have only one then callback
add(20, 20)
  .then(res => {
    console.log(res)

    //Return another promise
    return add(res, 40)
  })
  .then(res2 => console.log(res2))
  .catch(err => console.log(err))
