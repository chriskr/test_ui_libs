"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWeekNumber = getWeekNumber;
exports.getWeeksOfMonth = getWeeksOfMonth;


/**
 * According to ISO 8601.
 * Week 1 is the week with the first Thursday.
 * Weeks starting on Monday.
 *
 * Code mainly from https://weeknumber.net/how-to/javascript
 */
function getWeekNumber(date) {
  var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  // Thursday in current week decides the year.
  // Week starts with Monday, getDay must be rotated accordingly.
  // This may change the year.
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(d.getFullYear(), 0, 4);
  // Adjustment to Thursday in week 1 is not needed, the maximum adjustment
  // would be +|- 3/7, which is less than +|- 0.5 from the exacte week delta.
  return 1 + Math.round((d.getTime() - week1.getTime()) / (7 * 24 * 60 * 60 * 1000));
};

/**
 * Gets the weeks of a month as tuples with week number and dates in that
 * week. The days belonging to the previous or next month are filled
 * with 0.
 *
 * E.g. getWeeksOfMonth(2017, 10) returns
 *
 *   [
 *     [44, [0, 0, 1, 2, 3, 4, 5]],
 *     [45, [6, 7, 8, 9, 10, 11, 12]],
 *     [46, [13, 14, 15, 16, 17, 18, 19]],
 *     [47, [20, 21, 22, 23, 24, 25, 26]],
 *     [48, [27, 28, 29, 30, 0, 0, 0]]
 *   ]
 *
 */
function getWeeksOfMonth(year, month) {
  var startWithMonday = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var day = 1;
  var date = new Date(year, month, day);
  var startDay = (date.getDay() + (startWithMonday ? 6 : 0)) % 7;
  var dayCount = 28;
  while (true) {
    date.setDate(dayCount + 1);
    if (date.getMonth() !== month) {
      break;
    }
    dayCount++;
  }

  var weeks = [];
  var week = [];
  while (startDay-- > 0) {
    week.push(0);
  }

  date.setYear(year);
  date.setMonth(month);
  while (day <= dayCount) {
    date.setDate(day);
    console.assert(date.getMonth() === month);
    week.push(day++);
    if (week.length === 7) {
      weeks.push([getWeekNumber(date), week]);
      week = [];
    }
  }

  if (week.length) {
    while (week.length < 7) {
      week.push(0);
    }
    weeks.push([getWeekNumber(date), week]);
  }

  return weeks;
};