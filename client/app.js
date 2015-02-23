var request = require('request-promise')
  , displayChart = require('./display')
  , $ = require('jquery')

$('#beginBrew').on('click', function() {
  var values = $('input').map(function() { return $(this).val() })
  window.console.log(values[0])
  window.console.log(values[1])
  window.console.log(values[2])
  //displayChart()
  $.post(`/brew?bt=${values[0]}&t=${values[1]}&dt=${values[2]}`)
  .then(displayChart)
  .fail(window.console.error.bind(window.console))
})
