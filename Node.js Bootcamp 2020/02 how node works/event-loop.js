const fs = require('fs')

const crypto = require('crypto')

const start = Date.now()
process.env.UV_THREADPOOL_SIZE = 1

setTimeout(() => console.log('Timer 1 finished'), 0)

setImmediate(() => console.log('Immediate 1 finished'))

fs.readFile('test-file.txt', () => {
  console.log('I/O Finished')

  console.log('--------------------')
  setTimeout(() => console.log('Timer 2 finished'), 0)
  setTimeout(() => console.log('Timer 3 finished'), 3000)

  setImmediate(() => console.log('Immediate 2 finished'))

  // This will run after every microtask so it will pe logged first inside the event event loops;w

  process.nextTick(() => console.log('Process.nextTick()'))

  // Adding thread pool tasks
  // More resource consuming task which then will be offloaded to the thread pool

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted')
  })
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted')
  })
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted')
  })
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted')
  })
})

// This will run first because its not in callback and its a top level code
console.log('Hello from top level code')

/*
* Output: 

Hello from top level code
Timer 1 finished    
Immediate 1 finished
I/O Finished        
Immediate 2 finished
Timer 2 finished
Timer 3 finished
*/

/*
* Output after adding nextTick():
Hello from top level code
Timer 1 finished
Immediate 1 finished
I/O Finished
--------------------
Process.nextTick()
Immediate 2 finished
Timer 2 finished
Timer 3 finished

* Output after adding threadpool tasks

Hello from top level code
Timer 1 finished    
Immediate 1 finished
I/O Finished        
--------------------
Process.nextTick()
Immediate 2 finished
Timer 2 finished
2357 Password encrypted
2364 Password encrypted
2533 Password encrypted
2610 Password encrypted
Timer 3 finished

*/
