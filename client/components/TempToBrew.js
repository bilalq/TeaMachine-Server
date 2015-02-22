var React = require('react');

module.exports = function () {
  var TempToBrew = React.createClass({
    getInitialState: function () {
      return {
        stepper: 120
      }
    },
    stepDown: function () {
      this.setState({stepper : this.state.stepper - 10});
    },
    stepUp: function () {
      this.setState({stepper : this.state.stepper + 10});
    },
    render: function () {
      return (
        <div>
          <h2>Temperature to Brew:</h2>
          <h3>{this.state.stepper}</h3>
          <div>
            <button type="button" name="tempDown" onClick={this.stepDown}>-</button>
            <button type="button" name="tempUp" onClick={this.stepUp}>+</button>
          </div>
        </div>
        );
    }
  });
}
