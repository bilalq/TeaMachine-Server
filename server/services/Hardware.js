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
  return function() {
      new Promise(function(resolve, reject) {
      var interval = setInterval(function() {
        if (predicate()) {
          resolve()
        }
      }, 1000)
    })
  }
}

var celciusToFarenheit = function(temp) {
  return (temp * 9 / 5) + 32
}

var ReadingPuller = (function() {
  var pullInterval

  var puller = {}
  puller.start = (function() {
    if (!pullInterval) {
      pullInterval = setInterval(function() {
        Promise.all([
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
        .catch(handleErr)
      }, 1000)
    }
  }).bind(puller)

  puller.stop = (function() {
    if (pullInterval) {
      clearInterval(pullInterval)
      pullInterval = null
    }
  }).bind(puller)

  return puller
})()

exports.beginSteeping = function(tempToBrew, timeToBrew, tempToDrinkAt) {
  console.log(arguments)
  reset()
  .then(Steeper.steepTempSensorOnly)
  .then(ReadingPuller.start)
  .then(waitFor(function() {
    var lastReading = _.last(hardwareReadings)
    return lastReading && lastReading.temperature <= tempToBrew
  }))
  .then(Steeper.steepAll)
  .delay(timeToBrew * 1000 * 60)
  .then(Steeper.steepTempSensorOnly)
  .then(waitFor(function() {
    var lastReading = _.last(hardwareReadings)
    return lastReading && lastReading.temperature <= tempToDrinkAt
  }))
  .then(ReadingPuller.stop)
  .then(Steeper.liftOut)
  .catch(handleErr)
}

exports.cancelSteeping = function() {
  ReadingPuller.stop()
  return reset()
}

exports.getLatestReadings = function(timestamp) {
  return _.takeRightWhile(hardwareReadings, function(reading) {
    return !timestamp || reading.timestamp > timestamp
  })
}

Promise.delay(0)
.then(ReadingPuller.start)
.delay(10000)
.then(ReadingPuller.stop)
