const EventEmitter = require('events')

// Observer pattern example

// We can also create and EventEmitter by extending the EventEmitter class
class Sales extends EventEmitter {
  constructor() {
    super()
  }
}

// creating instance of emitter
// const emitter = new EventEmitter()

// Creating instance of Sales class
const emitter = new Sales()

// Creating listeners (Similar to the event listeners)

//Emitter 1
emitter.on('newSale', () => console.log('New sale done!'))

//Emitter 2 (We can also pass arguments to the emitters)
emitter.on('newSale', (salesMan) => console.log(`New sale done by ${salesMan}`))

// Creating  emitter event which will be listened by the listener
emitter.emit('newSale', 'Joey')
