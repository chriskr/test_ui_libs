import "./common/polyfills";
import React, { Component } from "react";
import Calendar from "./Calendar";
import { range } from "./common/utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 1, time: "" };
    this.handleClick = this.handleClick.bind(this);
    this.showTime = this.showTime.bind(this);
  }

  handleClick(event) {
    const t = window.performance.now();
    this.setState({ count: Number.parseInt(event.target.value, 10) });
    setTimeout(() => this.showTime(window.performance.now() - t), 1);
  }

  showTime(time) {
    this.setState({ time: time });
  }

  render() {
    const calendars = Array.from(range(this.state.count)).map(index => (
      <Calendar key={index} showTime={this.showTime} />
    ));
    const testButtons = [0, 1, 2, 3, 5, 10, 100].map(value => (
      <TestButton key={value} onClick={this.handleClick} value={`${value}`} />
    ));
    const time =
      this.state.time > 0 ? `${this.state.time.toFixed(2)} milliseconds` : "";
    return [
      <div key="test-buttons" id="test-buttons">
        {testButtons}
        <div key="time-display" id="time-display">
          {time}
        </div>
      </div>,
      calendars
    ];
  }
}

var TestButton = props => {
  const { onClick, value } = props;
  return (
    <button
      key={value}
      {...{ onClick, value }}
      title={`Display ${value} calendars`}
    >
      {value}
    </button>
  );
};

export default App;
