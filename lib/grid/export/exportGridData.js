"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ArgumentsError = _interopRequireDefault(require("../../common/ArgumentsError"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function formatColumns(columns, viewColumns) {
  var formattedColumns = {};
  var columnId;
  var i;

  for (i = 0; i < viewColumns.length; i++) {
    columnId = viewColumns[i];
    formattedColumns[columnId] = "".concat(columns[columnId].parent ? columns[columnId].parent + ' ' : '').concat(columns[columnId].name);
  }

  return formattedColumns;
}

function formatRecord(record, columns, viewColumns) {
  var formattedRecord = {};

  var _iterator = _createForOfIteratorHelper(viewColumns),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var viewColumn = _step.value;
      var column = columns[viewColumn];
      formattedRecord[viewColumn] = column.render[column.render.length - 1](record);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return formattedRecord;
}

function formatData(records, totals, columns, viewColumns) {
  var formatted = {
    columns: formatColumns(columns, viewColumns),
    records: records.map(function (record) {
      return formatRecord(record[1], columns, viewColumns);
    })
  };

  if (totals) {
    formatted.totals = formatRecord(totals, columns, viewColumns);
  }

  return formatted;
}

function getFields(columns, viewColumns) {
  var fields = {};

  var _iterator2 = _createForOfIteratorHelper(viewColumns),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var columnId = _step2.value;

      for (var i = 0; i < columns[columnId].render.length - 1; i++) {
        fields[columns[columnId].render[i]] = true;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return Object.keys(fields);
}
/**
 * @param {{}} columns
 * @param {string[]} viewColumns
 */


function assertValidViewColumns(columns, viewColumns) {
  if (!viewColumns || !viewColumns.length) {
    throw new _ArgumentsError["default"]('"viewColumns" can`t be empty');
  }

  var notExistColumns = [];

  var _iterator3 = _createForOfIteratorHelper(viewColumns),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var columnId = _step3.value;

      if (!columns[columnId]) {
        notExistColumns.push(columnId);
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  if (notExistColumns.length) {
    throw new _ArgumentsError["default"]("You trying to get not exist columns: ".concat(notExistColumns.join(', ')));
  }
}
/**
 * @param {{}}                    gridModel
 * @param {{}}                    columns
 * @param {string[]}              viewColumns
 * @param {Function}              exporter
 * @param {{}}                    settings
 * @param {[string, string][]}      settings.sort
 * @param {number}                  settings.limit
 * @param {number}                  settings.offset
 * @param {string[]}                settings.viewColumns
 */


function exportGridData(_x, _x2, _x3, _x4, _x5) {
  return _exportGridData.apply(this, arguments);
}

function _exportGridData() {
  _exportGridData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(gridModel, columns, viewColumns, exporter, settings) {
    var result, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            assertValidViewColumns(columns, viewColumns);
            _context.next = 3;
            return gridModel.read({
              fields: getFields(columns, viewColumns),
              sort: settings.sort ? [[settings.sort.column, settings.sort.direction]] : null,
              limit: settings.limit,
              offset: settings.offset
            });

          case 3:
            result = _context.sent;
            data = formatData(result.records, result.totals, columns, viewColumns);
            _context.next = 7;
            return exporter(data);

          case 7:
            return _context.abrupt("return", _context.sent);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _exportGridData.apply(this, arguments);
}

var _default = exportGridData;
exports["default"] = _default;
module.exports = exports.default;