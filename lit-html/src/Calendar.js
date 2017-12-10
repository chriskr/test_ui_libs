import {html, render} from './lit-html.js';
import LitComponent from './LitComponent.js';
import {range, rotate} from './common/utils.js';
import {getWeeksOfMonth} from './common/dateExtensions.js';
import LocalHolidays from './common/LocalHolidays.js';
import localHolidaysNorway from './common/localHolidaysNorway.js';


const WEEK_DAYS_SHORT = [
  'Su',
  'Mo',
  'Tu',
  'We',
  'Th',
  'Fr',
  'Sa',
];

const WEEK_DAYS_LONG = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

class Calendar extends LitComponent {
  constructor(showTime) {
    super();
    this.showTime_ = showTime;
    this.today = this.getToday();
    this.holidays = new LocalHolidays(localHolidaysNorway);
    this.state = {year: this.today.year};
    this.handleClick = this.handleClick.bind(this);
  }

  onFirstCreation(container) {
    container.querySelector('header').addEventListener(
        'click', event => this.handleClick(event));
  }

  handleClick(event) {
    const dataset = event.target.dataset;
    if (dataset.handler === undefined) {
      return;
    }
    const t = window.performance.now();
    const delta = dataset.handler === 'next-year' ? 1 : -1;
    this.setState(prevState => ({year: prevState.year + delta}));
    setTimeout(() => this.showTime_(window.performance.now() - t), 1);
  }

  getHtml() {
    return html`${this.renderToday()}${this.renderYear()}`;
  }

  renderToday() {
    const todayStr = [
      WEEK_DAYS_LONG[this.today.day], MONTH_NAMES[this.today.month],
      String(this.today.date)
    ].join(' ');

    return html`
      <header>
        <span data-handler="previous-year">
          &lt;
        </span>
        <h1>${todayStr}</h1>
        <span data-handler="next-year">
          &gt;
        </span>
      </header>
    `;
  }

  renderYear() {
    const tables = Array.from(range(12)).map(month => this.renderMonth(month));

    return html`<section>${tables}</section>`;
  }

  renderMonth(month) {
    const weeksOfMonth = getWeeksOfMonth(this.state.year, month);
    const weekDays = rotate(WEEK_DAYS_SHORT, 1);
    const weekLabels = weekDays.map(wday => html`<th>${wday}</th>`);

    const weekRows =
        weeksOfMonth.map((week, index) => this.renderWeek(month, week, index));
    const holidayList = this.renderHolidays(month);

    return html`
        <table>
          <caption>
            <span class='month-name'>${MONTH_NAMES[month]}</span>
            <span class="year-number">${String(this.state.year)}</span>
          </caption>
          <thead>
            <tr>
              <th>Week</th>
              ${weekLabels}
            </tr>
          </thead>
          <tbody>${weekRows}</tbody>
          <tfoot>
            <tr>
              <td colSpan="8">${holidayList}</td>
            </tr>
          </tfoot>
        </table>
        `;
  }

  renderWeek(month, week, weekIndex) {
    const INDEX_SUNDAY = 6;
    const [weekNumber, weekDays] = week;

    const weekRow = weekDays.map((day, index) => {
      const isToday = this.today.year === this.state.year &&
          this.today.month === month && this.today.date === day;
      const isHoliday = index === INDEX_SUNDAY ||
          this.holidays.isHoliday(this.state.year, month, day);
      const className =
          `${isToday ? 'today' : ''} ${isHoliday ? 'holiday' : ''}`.trim();

      return html`
          <td class="${className}">${day > 0 ? day : ''}</td>
          `;
    });

    return html`
        <tr>
          <td>
            <span class="week-number">${weekNumber}</span>
          </td>
          ${weekRow}
        </tr>
        `;
  }

  renderHolidays(month) {
    const holidaysOfMonth = this.holidays.getHolidays(this.state.year, month);
    if (holidaysOfMonth.length === 0) {
      return null;
    }

    const listItems =
        holidaysOfMonth.map(([day, name]) => html`<li>${day}. ${name}</li>`);

    return html`
        <ul class="holidays">${listItems}</ul>
        `;
  }

  getToday() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const date = d.getDate();
    const day = d.getDay();
    return {year, month, date, day};
  }
}

export default Calendar;
