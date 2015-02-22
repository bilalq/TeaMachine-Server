/**
 * This file should be broken up into like 8 smaller files, but this is a
 * hackathon
 */
var Steeper = require('./Steeper')
  , Promise = require('bluebird')
  , request = require('request-promise')
  , _ = require('lodash')

var hardwareReadings = []

var handleErr = function(err) {
  console.error(err.message)
  console.error(err.stack)
}

var reset = function() {
  hardwareReadings = []
  return Steeper.liftOut()
}

var waitFor = function(predicate) {
  return new Promise(function(resolve, reject) {
    var interval = setInterval(function() {
      if (predicate()) {
        resolve()
      }
    }, 1000)
  })
}

var ReadingPuller = (function() {
  var pullInterval

  this.start = (function() {
    if (!pullInterval) {
      pullInterval = setInterval(exports.pullData)
    }
  }).bind(this)

  this.stop = (function() {
    if (pullInterval) {
      clearInterval(pullInterval)
      pullInterval = null
    }
  }).bind(this)

})()

exports.beginSteeping = function(tempToBrew, timeToBrew, tempToDrinkAt) {
  reset()
  .then(Steeper.steepTempSensorOnly)
  .then(ReadingPuller.start)
  .then(waitFor(function() {
    return _.last(hardwareReadings).temperature <= tempToBrew
  }))
  .then(Steeper.steepAll)
  .delay(timeToBrew)
  .then(Steeper.steepTempSensorOnly)
  .then(waitFor(function() {
    return _.last(hardwareReadings).temperature <= tempToDrinkAt
  }))
  .then(ReadingPuller.stop)
  .then(Steeper.liftOut)
  .catch(handleErr)
}

exports.cancelSteeping = function() {
  ReadingPuller.stop()
  return reset()
}

var celciusToFarenheit = function(temp) {
  return (temp * 9 / 5) + 32
}
exports.pullData = function(reading) {
  return Promise.all([
    // Should not hardcode or have tokens in here, but it's a hackathon
    request.get('https://api.spark.io/v1/devices/54ff6c066678574933590767/currentState?access_token=6165f0ccc410de961f94ede4539ec7274043b5dc'),
    request.get('https://api.spark.io/v1/devices/54ff6c066678574933590767/temp?access_token=6165f0ccc410de961f94ede4539ec7274043b5dc')
  ])
  .spread(function(stateData, tempData) {
    return {
      state: JSON.parse(stateData).result,
      temperature: celciusToFarenheit(JSON.parse(tempData).result),
      timestamp: Math.floor(Date.parse(JSON.parse(stateData).coreInfo.last_heard) / 1000)
    }
  })
  .then(function(reading) {
    var index = _.sortedIndex(hardwareReadings, reading, function(r) {
      return r.timestamp
    })
    hardwareReadings.splice(index, 0, reading)
    return _.last(hardwareReadings)
  })
}

exports.getLatestReadings = function(timestamp) {
  return _.takeRightWhile(hardwareReadings, function(reading) {
    return !timestamp || reading.timestamp > timestamp
  })
}
