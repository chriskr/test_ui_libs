import { version, Component } from 'inferno';

import {getWeeksOfMonth} from './common/dateExtensions';
import LocalHolidays from './common/LocalHolidays';
import localHolidaysNorway from './common/localHolidaysNorway';
import {MONTH_NAMES, WEEK_DAYS_LONG, WEEK_DAYS_SHORT} from './common/ui_strings';
import {range, rotate} from './common/utils';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.today = getToday();
    this.holidays = new LocalHolidays(localHolidaysNorway);
    this.state = { year: this.today.year };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const t = window.performance.now();
    const delta = event.target.dataset.handler === "next-year" ? 1 : -1;
    this.setState(prevState => ({ year: prevState.year + delta }));
    setTimeout(() => this.props.showTime(window.performance.now() - t), 1);
  }

  render() {
    const { today, holidays, handleClick, state } = this;

    return (
    <div>
      <Today key="today" today={today} handleClick={handleClick} />
      <Year key="year" year={state.year} {...{ today, holidays }} />
    </div>
    );
  }
}

const Today = ({ today, handleClick }) => {
  const todayStr = [
    WEEK_DAYS_LONG[today.day],
    MONTH_NAMES[today.month],
    String(today.date)
  ].join(" ");

  return (
    <header>
      <span data-handler="previous-year" onClick={handleClick}>
        <i className="material-icons">chevron_left</i>
      </span>
      <h1>{todayStr}</h1>
      <span data-handler="next-year" onClick={handleClick}>
        <i className="material-icons">chevron_right</i>
      </span>
    </header>
  );
};

const Year = ({ year, today, holidays }) => {
  const tables = Array.from(range(12)).map(month => (
    <Month key={month} {...{ year, month, today, holidays }} />
  ));

  return <section>{tables}</section>;
};

const Month = ({ year, month, today, holidays }) => {
  const weeksOfMonth = getWeeksOfMonth(year, month);
  const weekDays = rotate(WEEK_DAYS_SHORT, 1);
  const weekLabels = weekDays.map(wday => <th key={wday}>{wday}</th>);

  const weekRows = weeksOfMonth.map((week, index) => (
    <Week key={index} {...{ year, month, week, today, holidays }} />
  ));

  return (
    <table>
      <caption>
        <span className="month-name">{MONTH_NAMES[month]}</span>
        <span className="year-number">{String(year)}</span>
      </caption>
      <thead>
        <tr>
          <th>Week</th>
          {weekLabels}
        </tr>
      </thead>
      <tbody>{weekRows}</tbody>
      <tfoot>
        <tr>
          <td colSpan="8">
            <Holidays {...{ year, month, holidays }} />
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

const Week = ({ year, month, week, today, holidays }) => {
  const INDEX_SUNDAY = 6;
  const [weekNumber, weekDays] = week;

  const weekRow = weekDays.map((day, index) => {
    const isToday =
      today.year === year && today.month === month && today.date === day;
    const isHoliday =
      index === INDEX_SUNDAY || holidays.isHoliday(year, month, day);
    const className = `${isToday ? "today" : ""} ${
      isHoliday ? "holiday" : ""
    }`.trim();

    return <td key={index} {...{ className }}>{`${day > 0 ? day : ""}`}</td>;
  });

  return (
    <tr>
      <td>
        <span className="week-number">{`${weekNumber}`}</span>
      </td>
      {weekRow}
    </tr>
  );
};

const Holidays = ({ year, month, holidays }) => {
  const holidaysOfMonth = holidays.getHolidays(year, month);
  if (holidaysOfMonth.length === 0) {
    return null;
  }
  const listItems = holidaysOfMonth.map(([day, name]) => (
    <li key={`${day}${name}`}>{`${day}. ${name}`}</li>
  ));

  return <ul className="holidays">{listItems}</ul>;
};

const getToday = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const date = d.getDate();
  const day = d.getDay();
  return { year, month, date, day };
};

export default Calendar;
