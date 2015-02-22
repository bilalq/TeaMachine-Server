var React = require('react');

module.exports = function () {
  var TempToDrink = React.createClass({
    getInitialState: function () {
      return {
        stepper: 60
      }
    },
    stepDown: function () {
      this.setState({stepper : this.state.stepper - 1});
    },
    stepUp: function () {
      this.setState({stepper : this.state.stepper + 1});
    },
    render: function () {
      return (
        <div>
          <h2>Time to Drink</h2>
          <h3>{this.state.stepper}</h3>
          <div>
            <button type="button" name="drinkDown" onClick={this.stepDown}>-</button>
            <button type="button" name="drinkDown" onClick={this.stepUp}>+</button>
          </div>
        </div>
        );
    }
  });
}
