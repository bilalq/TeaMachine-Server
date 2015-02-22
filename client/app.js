const React = require('react')

const HelloMessage = React.createClass({
  render: function() {
    return <div>Yo {this.props.name}</div>
  }
})

React.render(
  <HelloMessage name="World" />,
  document.getElementsByClassName('tea-app')[0]
)
