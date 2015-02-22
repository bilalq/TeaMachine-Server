var React = require('react');

module.exports = function (){
  var TimeToBrew = React.createClass({
    getInitialState: function () {
      return {
        steep: 3
      }
    },
    stepDown: function () {
      this.setState({steep : this.state.steep - 1});
    },
    stepUp: function () {
      this.setState({steep : this.state.steep + 1});
    },
    render: function () {
      return (
        <div>
          <h2>Time To Brew</h2>
          <h3>{this.state.steep}</h3>
          <div>
            <button type="button" name="steepDown" onClick={this.stepDown}>-</button>
            <button type="button" name="steepUp" onClick={this.stepUp}>+</button>
          </div>
        </div>
        );
    }
  });
}
