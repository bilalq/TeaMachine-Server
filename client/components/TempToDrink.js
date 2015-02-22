var React = require('react');

module.exports = function () {
  var TempToDrink = React.createClass({
    getInitialState: function () {
      return {
        drink: 60
      }
    },
    stepDown: function () {
      this.setState({drink : this.state.drink - 10});
    },
    stepUp: function () {
      this.setState({drink : this.state.drink + 10});
    },
    render: function () {
      return (
        <div>
          <h2>Temperature to Drink</h2>
          <h3>{this.state.drink}</h3>
          <div>
            <button type="button" name="drinkDown" onClick={this.stepDown}>-</button>
            <button type="button" name="drinkDown" onClick={this.stepUp}>+</button>
          </div>
        </div>
        );
    }
  });
}
