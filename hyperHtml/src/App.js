import Calendar from './Calendar.js';
import {range} from './common/utils.js';
import TestRunner from './common/test_runner.js';
import hyperHTML from 'hyperhtml/esm';

const {wire, Component} = hyperHTML;

class App extends Component {
  constructor() {
    super();
    this.state = {count: 1, time: 0};
    this.handleClick = this.handleClick.bind(this);
    this.showTime = this.showTime.bind(this);
    this.calendars_ = [];
    this.timeDisplay_ = new TimeDisplay();
    new TestRunner(document.querySelector('h3'));
  }

  handleClick(event) {
    const t = window.performance.now();
    this.setState({count: Number.parseInt(event.target.value, 10)});
    setTimeout(() => this.showTime(window.performance.now() - t), 1);
  }

  showTime(time) {
    document.dispatchEvent(new CustomEvent('log-time', {detail: time}));
    //this.setState({time: time});
    this.timeDisplay_.showTime(time);
  }

  render() {
    const testButtons =
        [0, 1, 2, 3, 5, 10, 50, 100].map(value => this.renderButton(value));
    const time =
        this.state.time > 0 ? `${this.state.time.toFixed(2)} milliseconds` : '';
    while (this.calendars_.length < this.state.count) {
      this.calendars_.push(new Calendar(this.showTime));
    }
    while (this.calendars_.length > this.state.count) {
      this.calendars_.pop();
    }

    return this.html`
        <div key="test-buttons" id="test-buttons">
          ${testButtons}
          ${this.timeDisplay_}
        </div>
        ${this.calendars_.slice()}
        `;
  }

  renderButton(value) {
    return wire(this, `:test-button-${value}`) `
        <button onClick=${this.handleClick}
                value=${value}
                title=${`Display ${value} calendars`} >
          ${String(value)}
        </button>`;
  }
}

class TimeDisplay extends Component {
  constructor() {
    super();
    this.state = {time: 0};
  }

  showTime(time) {
    this.setState({time: time});
  }

  render() {
    const time =
        this.state.time > 0 ? `${this.state.time.toFixed(2)} milliseconds` : '';

    return this.html`<div key="time-display" id="time-display">${time}</div>`;
  }
}

export default App;
