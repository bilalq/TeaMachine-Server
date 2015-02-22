const React = require('react');
// var TimeToBrew = require('./components/TeaForm.js');

const HelloMessage = React.createClass({
  getInitialState: function () {
    return
  },
  render: function() {
    return <div>Yo {this.props.name}</div>;
  }
});

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
        <h2>Temperature to Brew</h2>
        <h3>{this.props.brew = this.state.stepper}</h3>
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
        <h3>{this.props.steep = this.state.stepper}</h3>
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
        <h3>{this.props.drink = this.state.stepper}</h3>
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
    return {
      brew: this.props.brew,
      steep: this.props.steep,
      drink: this.props.drink
    }
  },
  render: function () {
    return(
      <form>
        <TempToBrew value={this.props.brew} />
        <TimeToBrew value={this.props.steep} />
        <TempToDrink value={this.props.drink} />
        <button name="Submit" onClick={this.submit}>Submit</button>
      </form>
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
