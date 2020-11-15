const fs = require('fs')

fs.readdir(process.argv[2], (err, files) =>
  err
    ? err
    : files
        .filter(file => file.endsWith(`.${process.argv[3]}`))
        .map(file => console.log(file))
)
