var React = require('react');

module.exports = function (){
  var TimeToBrew = React.createClass({
    getInitialState: function () {
      return {
        stepper: 3
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
          <h2>Time To Brew</h2>
          <h3>{this.state.stepper}</h3>
          <div>
            <button type="button" name="steepDown" onClick={this.stepDown}>-</button>
            <button type="button" name="steepUp" onClick={this.stepUp}>+</button>
          </div>
        </div>
        );
    }
  });
}
