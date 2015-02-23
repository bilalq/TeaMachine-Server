var router = require('express').Router()
  , Hardware = require('../services/Hardware')

router.get('/', function(req, res) {
  res.json(Hardware.getLatestReadings(req.param('timestamp')))
})

router.post('/', function(req, res) {
  // Hacks on hacks on hacks
  //
  // The body parser config is probably messed up somehow, but we don't have
  // time to debug
  Hardware.beginSteeping(
    req.query.bt,
    req.query.t,
    req.query.dt
  )
  res.sendStatus(200)
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

