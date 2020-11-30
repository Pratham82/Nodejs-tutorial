const fs = require('fs')
const http = require('http')
const url = require('url')

///////////////////////////////// File Handling ///////////////////////////////
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

/*
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
*/

///////////////////// Creating simple HTTP server /////////////////////////////

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
  const pathName = req.url
  if (pathName === '/overview' || pathName === '/') {
    res.end('This is overview page')
  } else if (pathName === '/product') {
    res.end('This is product page')
  } else if (pathName === '/api') {
    res
      .writeHead(200, {
        'Content-type': 'application/json',
      })
      .end(data)
  } else {
    res
      .writeHead(404, {
        'Content-type': 'text/html',
        'my-header': 'testing headers',
      })
      .end('<h1>404 Page not found</h1>')
  }
})

server.listen(4000, '127.0.0.1', () =>
  console.log(`Server started on PORT 4000`)
)
