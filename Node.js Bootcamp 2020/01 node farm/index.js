const fs = require('fs')
const http = require('http')
const url = require('url')

const slugify = require('slugify')

const replaceTemplate = require('./modules/replaceTemplate')

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

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
)

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
)

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
)

const dataObj = JSON.parse(data)

// Creating slugs
const slugs = dataObj.map(product =>
  slugify(product.productName, { lower: true })
)
console.log(slugs)

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true)

  // Overview page
  if (pathname === '/overview' || pathname === '/') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    })

    const cardHtml = dataObj
      .map(product => replaceTemplate(tempCard, product))
      .join('')
    //console.log(cardHtml)
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/, cardHtml)
    res.end(output)

    // Product page
  } else if (pathname === '/product') {
    const product = dataObj[query.id]
    res.writeHead(200, { 'Content-type': 'text/html' })
    const output = replaceTemplate(tempProduct, product)
    res.end(output)

    // API
  } else if (pathname === '/api') {
    res
      .writeHead(200, {
        'Content-type': 'application/json',
      })
      .end(data)

    // Not Found
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
