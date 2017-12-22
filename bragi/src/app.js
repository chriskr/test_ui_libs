import Bragi from './common/bragi_light.js';
import Calendar from './calender.js';
import LocalHolidays from './common/LocalHolidays.js';
import localHolidaysNorway from './common/localHolidaysNorway.js';
import {range} from './common/utils.js';
import TestRunner from './common/test_runner.js';


class App {
  constructor() {
    this.container_ = null;
    this.timeDisplay_ = null;
    this.holidays_ = new LocalHolidays(localHolidaysNorway);
    document.addEventListener(
        'display-time', event => this.displayTime_(event.detail));
    new TestRunner(document.querySelector('h3'));
  }

  render(container) {
    this.container_ = container;
    this.container_.appendTemplate(App.Templates.testButtons());
    this.timeDisplay_ = this.container_.querySelector('#time-display');
    this.container_.querySelector('#test-buttons')
        .addEventListener('click', event => {
          const target = event.target;
          if (target.nodeName.toLowerCase() === 'button') {
            const t = window.performance.now();
            this.displayCalendars_(Number.parseInt(target.value, 10));
            setTimeout(
                () => this.displayTime_(window.performance.now() - t), 1);
          }
        });
    this.displayCalendars_(1);
  }

  displayCalendars_(count) {
    Array.from(this.container_.querySelectorAll('.calendar'))
        .forEach(calendar => calendar.remove());
    Array.from(range(count))
        .forEach(
            () => this.container_.appendChild(
                new Calendar(this.holidays_).getElement()));
  }

  displayTime_(time) {
    document.dispatchEvent(new CustomEvent('log-time', {detail: time}));
    this.timeDisplay_.textContent =
        time > 0 ? `${time.toFixed(2)} milliseconds` : '';
  }
}

App.Templates = class {
  static testButton(value) {
    return [
      'button', {value: String(value), title: `Display ${value} calendars`},
      `${value}`
    ];
  }

  static testButtons() {
    return [
      'div',
      {'id': 'test-buttons'},
      [0, 1, 2, 3, 5, 10, 50, 100].map(count => this.testButton(count)),
      ['div', {'id': 'time-display'}],
    ];
  }
}

export default App;
