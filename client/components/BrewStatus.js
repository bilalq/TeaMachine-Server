var React = require('react')
  , request = require('request-promise')
  , getData = require('../services/getBrewData')
  , LineChart = require('react-chartjs').Line

var BrewStatus = React.createClass({
  componentDidMount: function() {
    return getData()
    .then((data) => {
      var justFirst = {
        labels: [data.labels[0]],
        datasets: [ { data: [100] } ]
      }
      this.setState({ data: justFirst })
      setTimeout(() => { this.setState({data: data}) }, 10000)
    })
  },
  render: function() {
    return <LineChart data={this.props.data} width="600" height="250" />
  }
})

React.render(<BrewStatus />, document.getElementsByClassName('tea-app')[0])
