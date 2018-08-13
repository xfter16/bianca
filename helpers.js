const {red, yellow} = require('chalk')
let fatalLog = err => {
  console.log(red('ERROR: ',err.toString()))
  if(err.stack)
    console.log(yellow(err.stack))
}

module.exports = fatalLog