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
  }
}

getDogPic()
//getDogPic2('labrador').then((res) => console.log(res.body.message))
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
