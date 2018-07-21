import "./common/polyfills";
import { version, Component } from 'inferno';
import Calendar from "./Calendar";
import { range } from "./common/utils";
import TestRunner from './common/test_runner.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 1};
    this.refs = {};
    this.handleClick = this.handleClick.bind(this);
    this.showTime = this.showTime.bind(this);
    new TestRunner(document.querySelector('h3'));
    window.__a__ = this;
  }

  handleClick(event) {
    const t = window.performance.now();
    this.setState({ count: Number.parseInt(event.target.value, 10) });
    setTimeout(() => this.showTime(window.performance.now() - t), 1);
  }

  showTime(time) {
    document.dispatchEvent(new CustomEvent('log-time', {detail: time}));
    //this.refs.timeDisplay.showTime(time);
    this.refs.timeDisplay.setState({ time, });
    //this.setState({ time: time });
  }

  render() {
    const calendars = Array.from(range(this.state.count)).map(index => (
      <Calendar key={index} showTime={this.showTime} />
    ));
    const testButtons = [0, 1, 2, 3, 5, 10, 50, 100].map(value => (
      <TestButton key={value} onClick={this.handleClick} value={`${value}`} />
    ));
    const time =
      this.state.time > 0 ? `${this.state.time.toFixed(2)} milliseconds` : "";
    return (
      <div>
      <div key="test-buttons" id="test-buttons">
        {testButtons}
        <TimeDisplay  ref={element => this.refs.timeDisplay = element} />
      </div>
      {calendars}
      </div>
    );
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

class TimeDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { time: 0};
  }

  render() {
    const time =
      this.state.time > 0 ? `${this.state.time.toFixed(2)} milliseconds` : "";
    return (
        <div key="time-display" id="time-display">
          {time}
        </div>
        );
  }
}
export default App;
