const fs = require('fs')

// Blocking, synchronous way
/*
const data = fs.readFileSync('./txt/input.txt', 'utf-8')
console.log(data)
fs.writeFileSync('./txt/input.txt', '/n New Line added')
*/

// Non-Blocking, asynchronous way

/*
// Here readFile is the async task so it will run  in the background, and not block the code, then it will immedietly move on to the next line. The callback function will run once the file is completely read.
fs.readFile('./txt/start.txt', 'utf-8', (_, data) => console.log(data))
console.log('Sync code ')
*/

// Chaining multiple callbacks
fs.readFile('./txt/start.txt', 'utf-8', (_, data) => {
  fs.readFile(`./txt/${data}.txt`, 'utf-8', (_, data2) => {
    console.log(data2)
    fs.readFile('./txt/append.txt', 'utf-8', (_, data3) => {
      console.log(data3)

      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err =>
        console.log(err)
      )
    })
  })
})

console.log('synchronous code ')
