const fs = require('fs')

fs.readFile(process.argv[2], (err, res) =>
  err ? err : console.log(res.toString().match(/\n/g).length)
)
