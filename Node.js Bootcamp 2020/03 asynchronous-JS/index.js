const fs = require('fs')
const superagent = require('superagent')

// Creating promise for reading a file
const readFilePromise = (file) => {
  return new Promise((res, rej) => {
    fs.readFile(file, (err, data) => {
      if (err) return rej(`Cannot find file 😅 `)
      res(data)
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
