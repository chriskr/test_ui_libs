'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalHolidays = function () {
  /**
   * Takes a list of tuples, short date and name of a holiday. The year yyyy is
   * a place holder for any year.
   * E.g.
   *
   * [
   * ['01.01.yyyy', 'New Year\'s Day'],
   * ...
   * ['25.04.2011', 'Easter Monday'],
   * ...
   * ]
   *
   */
  function LocalHolidays(holidays) {
    var _this = this;

    _classCallCheck(this, LocalHolidays);

    this.holidays_ = new Map(holidays.map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          date = _ref2[0],
          name = _ref2[1];

      var _date$split$map = date.split('.').map(function (i) {
        return i === 'yyyy' ? 0 : Number.parseInt(i, 10);
      }),
          _date$split$map2 = _slicedToArray(_date$split$map, 3),
          day = _date$split$map2[0],
          month = _date$split$map2[1],
          year = _date$split$map2[2];

      return [_this.toKey_(year, month - 1, day), name];
    }));
  }

  _createClass(LocalHolidays, [{
    key: 'isHoliday',
    value: function isHoliday(year, month, day) {
      return this.holidays_.has(this.toKey_(year, month, day)) || this.holidays_.has(this.toKey_(0, month, day));
    }

    /**
     * Returns a list of tuples, date and name of the according holidays.
     * E.g <Holidays>.getHolidays(2017, 4) returns
     *
     * [
     *   [1, 'Labor Day'],
     *   [17, 'Constitution Day'],
     *   [25, 'Ascension Day']
     * ]
     *
     */

  }, {
    key: 'getHolidays',
    value: function getHolidays(year, month) {
      var holidays = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.holidays_[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref3 = _step.value;

          var _ref4 = _slicedToArray(_ref3, 2);

          var key = _ref4[0];
          var value = _ref4[1];

          var _fromKey_ = this.fromKey_(key),
              _fromKey_2 = _slicedToArray(_fromKey_, 3),
              keyYear = _fromKey_2[0],
              keyMonth = _fromKey_2[1],
              keyDay = _fromKey_2[2];

          if ((keyYear === year || keyYear === 0) && keyMonth === month) {
            holidays.push([keyDay, value]);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return holidays.sort(function (a, b) {
        return a[0] - b[0];
      });
    }
  }, {
    key: 'toKey_',
    value: function toKey_(year, month, day) {
      return year << 9 | month << 5 | day;
    }
  }, {
    key: 'fromKey_',
    value: function fromKey_(key) {
      return [key >> 9, key >> 5 & 0xf, key & 0x1f];
    }
  }]);

  return LocalHolidays;
}();

exports.default = LocalHolidays;