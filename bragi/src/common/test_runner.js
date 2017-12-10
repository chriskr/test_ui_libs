import Bragi from './bragi_light.js';
import {range} from './utils.js'

const FORWARD = 1;
const BACK = 2;
const NEW_VIEW = 3;
const CLEAR_VIEW = 4;

const TEST_UPDATE_COMPONENT = 1;
const TEST_NEW_VIEW = 2;
const TEST_CLEAR_VIEW = 3;

const labels = {
  [TEST_UPDATE_COMPONENT]: 'Update single componenet',
  [TEST_CLEAR_VIEW]: 'Test clear view',
  [TEST_NEW_VIEW]: 'Create new view',
};

const defs = new Map([
  [
    FORWARD, {
      'selector': '[data-handler="next-year"]',
      'type': TEST_UPDATE_COMPONENT,
    }
  ],
  [
    BACK,
    {
      'selector': '[data-handler="previous-year"]',
      'type': TEST_UPDATE_COMPONENT,
    },
  ],
  [
    CLEAR_VIEW,
    {
      'selector': 'button[value="0"]',
      'type': TEST_CLEAR_VIEW,
      'ignore': true,
    },
  ],
  [
    NEW_VIEW,
    {
      'selector': 'button[value="10"]',
      'type': TEST_NEW_VIEW,
    },
  ],
]);

const tests = [
  ...Array.from(range(5)).map(
      () =>
          [FORWARD, FORWARD, FORWARD, BACK, BACK, BACK, BACK, BACK, BACK, BACK,
           BACK, FORWARD, FORWARD, FORWARD]),
  ...Array.from(range(20)).map(() => [CLEAR_VIEW, NEW_VIEW]),
].reduce((acc, array) => (acc.push(...array), acc));

class TestRunner {
  constructor (libLabelElement) {
    this.libLabelElement_ = libLabelElement;
    libLabelElement.addEventListener(
        'click', event => this.start());
    this.tests_ = null;
    this.pointer_ = 0;
    this.results_ = null;
    this.handleLogTime = this.handleLogTime.bind(this);

  }

  start() {
    this.tests_ = tests;
    this.pointer_ = 0;
    this.results_ = new Map();
    document.addEventListener('log-time', this.handleLogTime);
    requestAnimationFrame(() => this.startTest_());
  }

  startTest_() {
    if (this.pointer_ < this.tests_.length) {
      const test = defs.get(this.tests_[this.pointer_]);
      const element = document.querySelector(test.selector);
      requestAnimationFrame(
          () => element.dispatchEvent(new Event('click', {bubbles: true})));
    } else {
      document.removeEventListener('log-time', this.handleLogTime);
      const log = [];
      for (const [testType, times] of this.results_) {
        const sum = times.reduce((sum, t) => sum + t);
        log.push({'label': labels[testType], 'time': Math.round(sum / times.length)});
      }
      this.showResults(log);
    }
  }

  showResults(log) {
    this.closeDialog_();
    const dialog =
        document.body.appendTemplate(TestRunner.Templates.resultDialog(log));
    dialog.querySelector('.close-button')
        .addEventListener('click', () => this.closeDialog_());
  }

  closeDialog_() {
    const dialog = document.querySelector('#result-dialog');
    if (dialog !== null) {
      dialog.remove();
    }
  }

  handleLogTime(event) {
    const test = defs.get(this.tests_[this.pointer_]);
    if (test.ignore !== true) {
      const type = test.type;
      if (!this.results_.has(type)) {
        this.results_.set(type, []);
      }
      this.results_.get(type).push(event.detail);
    }
    this.pointer_++;
    this.startTest_();
  }
}

TestRunner.Templates = class {
  static resultDialog(results) {
    return [
      'div', {'id': 'result-dialog'}, ['div', {'class': 'close-button'}, 'x'],
      [
        'ul',
        ...results.map(result => ['li', `${result.label}: ${result.time}ms`])
      ],
      ['style', `
          #result-dialog {
            background-color: hsla(0, 0%, 0%, .3);
            border: 1px solid hsla(0, 0%, 100%, .7);
            font-size: 16px;
            left: 10px;
            padding: 5px 10px;
            position: fixed;
            top: 100px;
          }

          #result-dialog ul {
            clear: both;
            list-style: none;
            margin: 0;
            padding: 0;
          }

          #result-dialog .close-button {
            cursor: pointer;
            float: right;
            height: 20px;
            line-height: 20px;
            text-align: center;
            padding: 0 5px;
            margin-right: -5px;
          }
          `]
    ];
  }
}

export default TestRunner