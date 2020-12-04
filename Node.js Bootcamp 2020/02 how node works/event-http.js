const EventEmitter = require('events')
const http = require('http')

// Observer pattern in http server
const server = http.createServer()

// Creating listeners for the event emitter
// This will listen to the request event and execute the callback accordingly
server.on('request', (req, res) => {
  console.log('Request received')
  console.log(req.url)
  res.end('Request received from the client')
})

server.on('request', (_, res) => {
  console.log('Request 2.0 received')

  res.end('2nd Request received from the client')
})

// Request listener
server.listen(4000, (_, res) => console.log('Server listening on PORT 4000'))
