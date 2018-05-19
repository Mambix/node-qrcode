var QRCode = require('../lib')

QRCode.toString('yo yo yo', {type: 'squareTTF'}, function (error, data) {
  if (error) {
    throw new Error(error)
  }

  console.log(data)
})

QRCode.toString('yo yo yo', {type: 'circleTTF'}, function (error, data) {
  if (error) {
    throw new Error(error)
  }

  console.log(data)
})

QRCode.toString('yo yo yo', {type: 'donutTTF'}, function (error, data) {
  if (error) {
    throw new Error(error)
  }

  console.log(data)
})

QRCode.toString('yo yo yo', {type: 'hollowTTF'}, function (error, data) {
  if (error) {
    throw new Error(error)
  }

  console.log(data)
})
