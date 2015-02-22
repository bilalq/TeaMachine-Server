var express = require('express')
var router = express.Router()

router.post('/announce', function(req, res) {
  res.render('index', { title: 'TeaMachine' })
  res.send(200)
})

module.exports = router

