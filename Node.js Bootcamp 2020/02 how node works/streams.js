const fs = require('fs')

// Requiring http server and initializing it right away
const server = require('http').createServer()

// Reading a file and sending the file data as response

//* Approach 1: saving the data in the variable and passing it down to the client
// If the file is big it will take too much time to load the data on the memory and our app may crash
// server.on('request', (_, res) => {
//   fs.readFile('test-file.txt', (err, data) =>
//     err ? res.writeHead(400).end('Unable to read data') : res.end(data)
//   )
// })

//* Approach 2: Instead of saving whole data which is read from the file we will create a readable stream, each chunk of data we receive ,we  send it to the client as a response which is writable stream

//* Our readable stream which is used to read the file form the disk is much faster than response writable stream over the network, this will overwhelm the response stream which cannot handle the incoming data so fast, its called back pressure

//*  Back pressure happens when response cannot send the data nearly as fast as its receiving from the file

// server.on('request', (_, res) => {
//   const readable = fs.createReadStream('test-fi--le.txt')

//   // Instead of saving the whole data on a variable and sending it to the client here we will send the data in chunks and write it as a response
//   readable.on('data', (chunk) => {
//     res.write(chunk)
//   })

//   // Once the data is send completely end the event using end method
//   readable.on('end', () => res.end())

//   readable.on('error', (err) => {
//     console.log(err)
//     res.writeHead(500).end('File not found')
//   })
// })

//* Approach 3:
// Pipe method solves the problem of back pressure

server.on('request', (_, res) => {
  const readable = fs.createReadStream('test-file.txt')
  // Syntax:  readableSource.pipeMethod(writableDestination)
  readable.pipe(res)
})

server.listen(4000, () => console.log('Server started on PORT 4000'))
