var request = require('request-promise')
  , _ = require('lodash')

module.exports = function() {
  return request.get(window.location.origin + '/brew')
  .then(JSON.parse)
  .then(function(data) {
    window.console.log(data)
    if (!data.length) return data;
    var labels = data.map(function(x) {
      var date = new Date(x.timestamp * 1000)
      return (date.getHours() % 12) + ':' + _.padLeft(date.getMinutes(), 2, '0')
    })
    return {
      labels: labels,
      datasets: [ { data: data.map(_.property('temperature')) } ]
    }
  })
}
