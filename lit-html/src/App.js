import {html, render} from './lit-html.js';
import LitComponent from './LitComponent.js';
import Calendar from './Calendar.js';
import {range} from './common/utils.js';
import TestRunner from './common/test_runner.js';


class App extends LitComponent {

  constructor() {
    super();
    this.state = {count: 1, time: 0};
    this.handleClick = this.handleClick.bind(this);
    this.showTime = this.showTime.bind(this);
    this.calendars_ = [];

    new TestRunner(document.querySelector('h3'));


  }

  onFirstCreation(container) {
    container.querySelector('#test-buttons').addEventListener(
        'click', event => this.handleClick(event));
  }

  handleClick(event) {
    if (event.target.dataset.handler === undefined) {
      return;
    }
    const t = window.performance.now();
    this.setState({count: Number.parseInt(event.target.value, 10)});
    setTimeout(() => this.showTime(window.performance.now() - t), 1);
  }

  showTime(time) {
    document.dispatchEvent(new CustomEvent('log-time', {detail: time}));
    this.setState({time: time});
  }

  getHtml() {

    const testButtons =
        [0, 1, 2, 3, 5, 10, 100].map(value => this.renderButton(value));
    const time =
        this.state.time > 0 ? `${this.state.time.toFixed(2)} milliseconds` : '';
    while (this.calendars_.length < this.state.count) {
      this.calendars_.push(new Calendar(this.showTime).render());
    }
    while (this.calendars_.length > this.state.count) {
      this.calendars_.pop();
    }


    return html`
        <div id="test-buttons">
          ${testButtons}
          <div key="time-display" id="time-display">${time}</div>
        </div>
        ${this.calendars_}
        `;

    // return r;
        //${this.calendars_.slice()}
    //setTimeout(() => this.render(), 1000)
  }

  renderButton(value) {
    return html `
        <button data-handler=${App.DISPLAY_CALENDARS}
                value=${value}
                title=${`Display ${value} calendars`} >
          ${String(value)}
        </button>`;
  }
}

export default App;
