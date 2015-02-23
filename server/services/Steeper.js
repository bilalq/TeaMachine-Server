var request = require('request-promise')

// This should be in a config, but it's a hackathon
var url = 'https://api.spark.io/v1/devices/54ff6c066678574933590767/setState'

// This should not be in the code like this. But it's a hackathon.
var token = '6165f0ccc410de961f94ede4539ec7274043b5dc'

var setState = function(state) {
  return request.post(url, {
    form: {
      access_token: token,
      stateStr: state
    }
  })
}

exports.State = {
  Outside: 0,
  TempSensorOnly: 1,
  AllIn: 2
}

exports.liftOut = function() {
  return setState(exports.State.Outside)
  .catch(console.error.bind(console))
}

exports.steepTempSensorOnly = function() {
  return setState(exports.State.TempSensorOnly)
  .catch(console.error.bind(console))
}

exports.steepAll = function() {
  return setState(exports.State.AllIn)
  .catch(console.error.bind(console))
}
