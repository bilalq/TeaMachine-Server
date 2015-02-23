var $ = require('jquery')
  , Promise = require('bluebird')
  , Chart = require('chart.js')
  , _ = require('lodash')
  , getData = require('./services/getBrewData')

module.exports = function() {
  $('.tea-form').fadeOut(500)
  var ctx = $('canvas').get(0).getContext('2d')
  var chart
  Promise.delay(5000)
  .then(getData)
  .then((data) => {
    chart = new Chart(ctx).Line(data)
    setInterval(() => {
      getData().then((newData) => {
        chart.destroy()
        chart = new Chart(ctx).Line(newData)
        window.console.log(data)
        window.console.log(newData)
      })
    }, 3000)
  })
}
