var router = require('express').Router()
  , Hardware = require('../services/Hardware')

router.get('/', function(req, res) {
  res.json(Hardware.getLatestReadings(req.param('timestamp')))
})

router.post('/', function(req, res) {
  Hardware.beginSteeping({
    tempToBrew: req.param('tempToBrew'),
    timeToBrew: req.param('timeToBrew') * 60 * 1000, // convert to milliseconds
    tempToDrinkAt: req.param('timeToBrew')
  })
  res.send(200)
})

router.delete('/', function(req, res) {
  Hardware.cancelSteeping()
  .then(function() {
    res.send(200)
  })
  .catch(function(err) {
    res.send(500, err)
  })
})

module.exports = router

