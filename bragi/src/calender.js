import {
  NAMESPACES,
  TEXT_NODE_NAME,
  createDom,
  render,
  renderClean,
} from 'uldu';
import {getWeeksOfMonth} from './common/dateExtensions.js';
import LocalHolidays from './common/LocalHolidays.js';
import localHolidaysNorway from './common/localHolidaysNorway.js';
import {MONTH_NAMES, WEEK_DAYS_LONG, WEEK_DAYS_SHORT} from './common/ui_strings.js';
import {range, rotate} from './common/utils.js';

class Calendar {
  static getToday() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const date = d.getDate();
    const day = d.getDay();
    return {year, month, date, day};
  }

  constructor(holidays) {
    this.holidays_ = holidays;
    this.today_ = Calendar.getToday();
    this.year_ = this.today_.year;
    this.element_ = null;
  }

  destroy() {
    if (this.element_) {
      this.element_.remove();
      this.element_.removeEventListener('click', this.clickHandler_);
    }
    this.clickHandler_ = null;
    this.element_ = null;
    this.holidays_ = null;
    this.today_ = null;
    this.year_ = null;
  }

  getElement() {
    if (this.element_ === null) {
      this.clickHandler_ = this.clickHandler_.bind(this);
      this.element_ = createDom(Calendar.Templates.calendar(this.year_,
            this.today_, this.holidays_));
      this.element_.addEventListener('click', this.clickHandler_);
    }
    return this.element_;
  }

  clickHandler_(event) {
    const t = window.performance.now();
    const element = event.target.closest('[data-handler]');
    if (element !== null) {
      const delta = element.dataset.handler === 'next-year' ? 1 : -1;
      this.year += delta;
      this.updateView_();
    }
    setTimeout(
        () => document.dispatchEvent(new CustomEvent(
            'display-time', {detail: window.performance.now() - t})),
        1);
  }

  get year() {
    return this.year_;
  }

  set year(year) {
    this.year_ = year;
  }

  updateView_() {
    if (this.element_ === null) {
      return;
    }
    this.element_.querySelector('section').remove();
    render(Calendar.Templates.year(this.year_, this.today_, this.holidays_),
        this.element_);
  }
}

Calendar.Templates = class {
  static calendar(year, today, holidays) {
    return [
      'div',
      {'class': 'calendar'},
      this.today(today),
      this.year(year, today, holidays),
    ];
  }

  static today(today) {
    return [
      'header',
      ['span', {'data-handler': 'previous-year'},
        ['i', {class: 'material-icons'}, 'chevron_left'],
      ],
      [
        'h1',
        `${WEEK_DAYS_LONG[today.day]}` +
            ` ${MONTH_NAMES[today.month]} ${today.date}`
      ],
      ['span', {'data-handler': 'next-year'},
        ['i', {class: 'material-icons'}, 'chevron_right'],
      ],
    ];
  }

  static year(year, today, holidays) {
    return [
      'section',
      ...Array.from(range(12))
          .map(month => this.month(year, month, today, holidays))
    ];
  }

  static month(year, month, today, holidays, withWeekNubers = true) {
    const weeksOfMonth = getWeeksOfMonth(year, month);
    const table = ['table'];

    table.push([
      'caption',
      ['span', {'class': 'month-name'}, MONTH_NAMES[month]],
      ['span', {'class': 'year-number'}, String(year)],
    ]);

    const headRow = [];
    if (withWeekNubers) {
      headRow.push(['th', 'Week']);
    }
    const weekDays = rotate(WEEK_DAYS_SHORT, 1);
    headRow.push(...weekDays.map(wday => ['th', wday]));
    table.push(['thead', ['tr', ...headRow]]);

    table.push([
      'tbody',
      ...weeksOfMonth.map(week => this.week(year, month, week, today, holidays))
    ]);

    table.push(this.holidays(year, month, holidays));

    return table;
  }

  static week(year, month, week, today, holidays, withWeekNubers = true) {
    const INDEX_SUNDAY = 6;
    const [weekNumber, weekDays] = week;
    const tr = ['tr'];
    if (withWeekNubers) {
      tr.push(['td', ['span', {'class': 'week-number'}, String(weekNumber)]]);
    }
    tr.push(...weekDays.map((day, index) => {
      const isToday =
          today.year === year && today.month === month && today.date === day;
      const isHoliday =
          index === INDEX_SUNDAY || holidays.isHoliday(year, month, day);
      const className =
          `${isToday ? 'today' : ''} ${isHoliday ? 'holiday' : ''}`.trim();
      return ['td', {'class': className}, day > 0 ? String(day) : ''];
    }));
    return tr;
  }

  static holidays(year, month, holidays, withWeekNubers = true) {
    const holidaysOfMonth = holidays.getHolidays(year, month);

    if (holidaysOfMonth.length === 0) {
      return [];
    }

    return [
      'tfoot',
      [
        'tr',
        [
          'td', {'colspan': withWeekNubers ? '8' : '7'},
          [
            'ul', {'class': 'holidays'},
            ...holidaysOfMonth.map(([day, name]) => ['li', `${day}. ${name}`])
          ]
        ]
      ]
    ];
  }
}

export default Calendar;