const fs = require('fs')
const superagent = require('superagent')

// Creating promise for reading a file
const readFilePromise = (file) => {
  return new Promise((res, rej) => {
    fs.readFile(file, (err, data) => {
      if (err) return rej(`Cannot find file 😅 `)
      res(data.toString())
    })
  })
}

const writeFilePromise = (file, dataToWrite) => {
  return new Promise((res, rej) => {
    fs.writeFile(file, dataToWrite, (err) => {
      if (err) return rej(err.message)
      res(console.log('Data written to the file'))
    })
  })
}

//dog.ceo/api/breed/pug/images/random

//* Async keyword means this is a special function that is, which will keeps running in the background while performing the code thats in it, while the rest of the code keeps running in the event loop

//* Asynchronous functions will do the async work without ever blocking the event loop

// Using async await
const getDogPic = async () => {
  //* The await will stop the code from running until this point until this promise is resolved,
  //* If the promise is fulfilled then the value of await expression is the resolved value of the promise, which will finally assigned to dogName variable
  //* The whole point of async await is to make out code look like synchronous code while being asynchronous behind the scenes
  try {
    const dogName = await readFilePromise(`${__dirname}/dog.txt`)
    console.log(dogName)

    const dogPic = await superagent
      .get(`https://dog.ceo/api/breed/${dogName}/images/random`)
      .then((res) => res.body.message)

    await writeFilePromise(`${__dirname}/dog-image.txt`, dogPic)
  } catch (err) {
    console.log(err)
    // Handling the error in case we are returning value from this function, we wll throw the error and catch it while using the promise
    throw err
  }

  // Returning value from an async function
  // But even if there was an error we will still get this return value
  return '2:  Return value 🟢'
}

// Calling async method

// Using IFFIES
;(async () => {
  try {
    console.log('1: We will get dog pics')
    const value = await getDogPic()
    console.log(value)
    console.log('3: Save the dog pics to file')
  } catch (error) {
    console.log('Error 🔴')
  }
})()

/*
// Using promises

console.log('1: We will get dog pics')
//getDogPic()

// Storing the value of method in a variable
//const val = getDogPic()
//console.log(val) // This will return a pending promise

// For getting the return value from an async function we have to use the then method, just like normal promises
getDogPic()
  .then((res) => console.log(res))
  .catch((err) => console.log(err))

console.log('3: Save the dog pics to file')
*/

/*
Output of above 3 lines: 


1: We will get dog pics
2: Save the dog pics to file
husky
Data written to the file

Q.1 Why the order of these functions i like that ? why the getDogPic() async function didn't logged before the line '2: Save the ....'

Ans: 
1.  Async function runs in the background, we cannot stop the code(execution of main thread) when getDogPic() an async function is called, thats the whole philosophy of don't block the event loop.
2. So when the JS engine sees the async function(getDogPic) it will offload the function to the background and goes to the next line which is the 2nd console.log

*/

// Old code

// EndPoint: getDogPic2('labrador').then((res) => console.log(res.body.message))
/* 
// using our own promise
readFilePromise(`${__dirname}/dog.txt`)
  .then((data) => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
  })
  .then((res) => {
    console.log(res.body.message)
    // Converting writeFile to promise
    return writeFilePromise('dog-image.txt', res.body.message)
  })
  .then(() => console.log('File Written'))
  .catch((err) => {
    console.log(err.message)
  })

  */

// readFilePromise(`${__dirname}/dog.txt`)
//   .then((data) => {
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//   })
//   .then((res) => console.log(res.body.message))

/*fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data.toString()}`)

  /*
  // Fetching random images
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message)
      console.log(res.body.message)

      // Saving the dog image url
      fs.writeFile('dog-image.txt', res.body.message, (err) =>
        console.log('Radom dog image saved to file')
      )
    })
  */
/*

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message)

      // Saving the random dog image link
      fs.writeFile('dog-image.txt', res.body.message, (err) => {
        if (err) return console.log(err.message)
        console.log('Random fog image saved')
      })
    })
    .catch((err) => {
      console.log(err.message)
    })
})
*/
