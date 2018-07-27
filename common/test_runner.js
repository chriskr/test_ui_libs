import {
  NAMESPACES,
  TEXT_NODE_NAME,
  createDom,
  render,
  renderClean,
} from 'uldu';
import {range} from './utils.js'

const FORWARD = 1;
const BACK = 2;
const NEW_VIEW = 3;
const CLEAR_VIEW = 4;
const NEW_SINGLE_VIEW = 5;
const NEW_VIEW_5 = 6;
const FORWARD_COMPOSITE_VIEW = 7;
const BACK_COMPOSITE_VIEW = 8;
const TAKE_TIME_STAMP = 9;

const TEST_UPDATE_COMPONENT = 1;
const TEST_NEW_VIEW = 2;
const TEST_UPDATE_COMPOSITE_VIEW = 3;
const TEST_TOTAL = 4;

const labels = {
  [TEST_UPDATE_COMPONENT]: 'Update single component',
  [TEST_NEW_VIEW]: 'Create new view',
  [TEST_UPDATE_COMPOSITE_VIEW]: 'Update composite view',
  [TEST_TOTAL]: 'Total',
};

const defs = new Map([
  [
    FORWARD, {
      'selector': '[data-handler="next-year"]',
      'type': TEST_UPDATE_COMPONENT,
    }
  ],
  [
    BACK, {
      'selector': '[data-handler="previous-year"]',
      'type': TEST_UPDATE_COMPONENT,
    }
  ],
  [
    CLEAR_VIEW, {
      'selector': 'button[value="0"]',
    }
  ],
  [
    NEW_VIEW, {
      'selector': 'button[value="10"]',
      'type': TEST_NEW_VIEW,
    }
  ],
  [
    NEW_SINGLE_VIEW, {
      'selector': 'button[value="1"]',
    }
  ],
  [
    NEW_VIEW_5, {
      'selector': 'button[value="5"]',
    }
  ],
  [
    FORWARD_COMPOSITE_VIEW, {
      'selector': '[data-handler="next-year"]',
      'type': TEST_UPDATE_COMPOSITE_VIEW,
    }
  ],
  [
    BACK_COMPOSITE_VIEW, {
      'selector': '[data-handler="previous-year"]',
      'type': TEST_UPDATE_COMPOSITE_VIEW,
    }
  ],
  [
    TAKE_TIME_STAMP, {
      'profile': true,
    }
  ],
]);

/*
const tests = [
  [TAKE_TIME_STAMP],
  ...Array.from(range(5)).map(
      () =>
          [FORWARD, FORWARD, FORWARD, BACK, BACK, BACK, BACK, BACK, BACK,
           FORWARD, FORWARD, FORWARD]),
  [TAKE_TIME_STAMP], ...Array.from(range(20)).map(() => [CLEAR_VIEW, NEW_VIEW]),
  [TAKE_TIME_STAMP], [CLEAR_VIEW, NEW_VIEW_5],
  ...Array.from(range(5)).map(
      () =>
          [FORWARD_COMPOSITE_VIEW, FORWARD_COMPOSITE_VIEW,
           FORWARD_COMPOSITE_VIEW, BACK_COMPOSITE_VIEW, BACK_COMPOSITE_VIEW,
           BACK_COMPOSITE_VIEW, BACK_COMPOSITE_VIEW, BACK_COMPOSITE_VIEW,
           BACK_COMPOSITE_VIEW, FORWARD_COMPOSITE_VIEW, FORWARD_COMPOSITE_VIEW,
           FORWARD_COMPOSITE_VIEW]),
  [CLEAR_VIEW, NEW_SINGLE_VIEW], [TAKE_TIME_STAMP],
  // eslint-disable-next-line
].reduce((acc, array) => (acc.push(...array), acc));
*/

const tests = [
  [NEW_VIEW],
  [FORWARD, FORWARD, FORWARD, FORWARD, FORWARD],
  [BACK, BACK, BACK, BACK, BACK, BACK],
  // eslint-disable-next-line
].reduce((acc, array) => (acc.push(...array), acc));

const testTypes = [
  TEST_UPDATE_COMPONENT,
  TEST_NEW_VIEW,
  TEST_UPDATE_COMPOSITE_VIEW,
];

const COUNT = 10;

class Log {
  constructor(labelId, time, average, count = 1) {
    this.labelId = labelId;
    this.time = time;
    this.average = average;
    this.count = count;
  }
}

class TestRunner {
  constructor (libLabelElement) {
    this.libLabelElement_ = libLabelElement;
    libLabelElement.addEventListener(
        'click', event => this.start());
    this.tests_ = null;
    this.pointer_ = 0;
    this.results_ = null;
    this.handleLogTime = this.handleLogTime.bind(this);
    this.tiemstamps_ = [];
    this.count_ = 0;
    document.addEventListener(
        'keydown',
        event => {
          if (event.altKey && event.key === 't') {
            event.preventDefault();
            this.start(COUNT);
          }
        }
    );
  }

  start(count = 1) {
    if (this.count_ > 0) {
      return;
    }
    this.count_ = count;
    this.results_ = [];
    this.start_();
  }

  start_() {
    this.closeDialog_();
    this.tiemstamps_ = [];
    this.tests_ = tests;
    this.pointer_ = 0;
    document.addEventListener('log-time', this.handleLogTime);
    this.startTest_();
  }

  startTest_() {
    if (this.pointer_ < this.tests_.length) {
      const test = defs.get(this.tests_[this.pointer_]);
      if (test.profile === true) {
        this.handleLogTime();
      } else {
        const element = document.querySelector(test.selector);
        element.click();
      }
    } else {
      document.removeEventListener('log-time', this.handleLogTime);
      const log = [];
      for (let i = 0; i < this.tiemstamps_.length - 1; i++) {
        const count =
            tests.filter(testId => defs.get(testId).type === testTypes[i])
                .length;
        const time = this.tiemstamps_[i + 1] - this.tiemstamps_[i];
        log.push(new Log(testTypes[i], time, time / count, count));
      }
      const time =
          this.tiemstamps_[this.tiemstamps_.length - 1] - this.tiemstamps_[0];
      log.push(new Log(TEST_TOTAL, time, time));
      this.results_.push(log);
      this.count_--;
      if (this.count_ > 0) {
        setTimeout(() => this.start_(), 500);
      } else {
        this.showResults();
      }
    }
  }

  showResults() {
    this.closeDialog_();
    //return;
    const log = this.results_[0];
    if (this.results_.length > 1) {
      for (let i = 0; i < log.length; i++) {
        const average = this.results_.reduce((acc, r) => acc += r[i].time, 0) /
            this.results_.length;
        const stdDev = (this.results_.reduce(
                            (acc, r) => acc += (r[i].time - average) ** 2, 0) /
                        this.results_.length) **
            .5;
        log[i].time = average;
        log[i].value = `${average.toFixed(1)} ±${stdDev.toFixed(1)}`;
        log[i].count = `${this.results_.length} * ${log[i].count}`;
      }
    }
    const dialog = render(TestRunner.Templates.resultDialog(log), document.body);
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
    if (test.profile === true) {
      this.tiemstamps_.push(Date.now());
    }
    this.pointer_++;
    // eslint-disable-next-line
    document.body.offsetHeight;
    setTimeout(() => this.startTest_(), 500);
  }
}

TestRunner.Templates = class {
  static resultDialog(results) {
    const table = [
      'table',
      [
        'thead',
        [
          'tr',
          ['th'],
          ['th', 'Iterations'],
          ['th', 'Average time per iteration in ms'],
          ['th', 'Total time in ms'],
        ]
      ],
      [
        'tbody',
        ...results.map(log => {
          const isTotal = log.count === 1;
          return [
            'tr',
            ['td', labels[log.labelId]],
            ['td', isTotal ? '' : String(log.count)],
            ['td', isTotal ? '' : log.average.toFixed(1)],
            ['td', String(Math.round(log.time))],
          ];
        })
      ]
    ];

    const style = [
      'style', `
            #result-dialog {
              background-color: hsla(0, 0%, 0%, .7);
              background-color: white;
              border: 1px solid hsla(0, 0%, 100%, .7);
              border: 1px solid hsla(0, 0%, 0%, .7);
              font-size: 12px;
              left: 10px;
              padding: 5px 10px;
              position: fixed;
              top: 58px;
              color: black;
            }

            #result-dialog table {
              clear: both;
            }

            #result-dialog th,
            #result-dialog td {
              vertical-align: bottom;
              padding: 0 5px;
            }

            #result-dialog p {
              clear: both;
              margin: 0;
              padding: 10px;
              font-size: 24px;
            }

            #result-dialog .close-button {
              cursor: pointer;
              float: right;
              height: 20px;
              line-height: 20px;
              text-align: center;
              padding: 0 5px;
              margin-right: -5px;
              margin-bottom: -10px;
            }
            `
    ];

    return [
      'div',
      {'id': 'result-dialog'},
      ['div', {'class': 'close-button'}, 'x'],
      ['p', 'done!'],
      //table,
      style,
    ];
  }
}

export default TestRunner
