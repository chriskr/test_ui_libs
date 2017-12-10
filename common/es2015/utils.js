"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range = range;
exports.rotate = rotate;

var _marked = /*#__PURE__*/regeneratorRuntime.mark(range);

function range(end) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var iter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var i;
  return regeneratorRuntime.wrap(function range$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = start;

        case 1:
          if (!(i < end)) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return i;

        case 4:
          i += iter;
          _context.next = 1;
          break;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
};

function rotate(iterable, delta) {
  var l = iterable.length;
  return Array.from(range(l)).map(function (i) {
    return iterable[(i + delta) % l];
  });
};