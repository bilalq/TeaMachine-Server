const React = require('react');
var request = require('request');
// var TeaForm = require('/components/TeaForm.js');


const HelloMessage = React.createClass({
  getInitialState: function () {
    return
  },
  render: function() {
    return <div>Yo {this.props.name}</div>
  }
});

var TempToBrew = React.createClass({
  getInitialState: function () {
    return {
      brew: 120
    }
  },
  stepDown: function () {
    this.setState({brew : this.state.brew - 10});
  },
  stepUp: function () {
    this.setState({brew : this.state.brew + 10});
  },
  render: function () {
    return (
      <div>
        <h2>Temperature to Brew</h2>
        <h3>{this.state.brew}</h3>
        <div>
          <button type="button" name="tempDown" onClick={this.stepDown}>-</button>
          <button type="button" name="tempUp" onClick={this.stepUp}>+</button>
        </div>
      </div>
      );
  }
});

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

var TeaForm = React.createClass({
  submit: function () {
    var json = {
      brewTemp: this.refs.brewTemp.state.brew,
      steeptime: this.refs.brewTime.state.steep,
      drinkTemp: this.refs.drinkTemp.state.drink
    };

    this.setState({settings: json});
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

var Timer = React.createClass({
  getInitialState: function () {
    return {
      steepTime: this.toSteep(this.props.name),
      secondsElapsed: 0
    }
  },
  toSteep: function (teaType){
    switch (teaType) {
      case "black":
        return 1000;
      case "green":
        return 300;
      default:
        return 200;
    }
  },
  tick: function () {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentDidMount: function () {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function () {
    clearInterval(this.interval);
  },
  render: function() {
    return <div><h2>Time:</h2>{this.state.steepTime - this.state.secondsElapsed}</div>;
  }
});

React.render(
  // <HelloMessage name="World" />,
  <TeaForm />,
  document.getElementsByClassName('tea-app')[0]
);
