var React = require('react');
var TempBrew = require('/TempToBrew.js');
var TimeBrew = require('/TimeToBrew.js');
var TempDrink = require('/TempToDrink.js');

module.exports = function () {
  var TeaForm = React.createClass({
    submit: function () {
      var json = {
        brewTemp: this.refs.brewTemp.state.brew,
        steeptime: this.refs.brewTime.state.steep,
        drinkTemp: this.refs.drinkTemp.state.drink
      };
      return request.post('/brew')
    },
    render: function () {
      return(
        <div>
          <TempToBrew ref="brewTemp" />
          <TimeToBrew ref="brewTime" />
          <TempToDrink ref="drinkTemp" />
          <button type="button" name="Submit" onClick={this.submit}>Submit</button>
        </div>
      );
    }
  });
}
