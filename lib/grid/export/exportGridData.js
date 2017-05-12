/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _callbackify = require('../../common/callbackify');

var _callbackify2 = _interopRequireDefault(_callbackify);

var _ArgumentsError = require('../../common/ArgumentsError');

var _ArgumentsError2 = _interopRequireDefault(_ArgumentsError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

function formatColumns(columns, viewColumns) {
  var formattedColumns = {};
  var columnId = void 0;
  var i = void 0;

  for (i = 0; i < viewColumns.length; i++) {
    columnId = viewColumns[i];
    formattedColumns[columnId] = '' + (columns[columnId].parent ? columns[columnId].parent + ' ' : '') + columns[columnId].name;
  }

  return formattedColumns;
}

function formatRecord(record, columns, viewColumns) {
  var formattedRecord = {};

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(viewColumns), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var viewColumn = _step.value;

      var column = columns[viewColumn];
      formattedRecord[viewColumn] = column.render[column.render.length - 1](record);
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
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)(viewColumns), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var columnId = _step2.value;

      for (var i = 0; i < columns[columnId].render.length - 1; i++) {
        fields[columns[columnId].render[i]] = true;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return (0, _keys2.default)(fields);
}

/**
 * @param {{}} columns
 * @param {string[]} viewColumns
 */
function assertValidViewColumns(columns, viewColumns) {
  if (!viewColumns || !viewColumns.length) {
    throw new _ArgumentsError2.default('"viewColumns" can`t be empty');
  }

  var notExistColumns = [];
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = (0, _getIterator3.default)(viewColumns), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var columnId = _step3.value;

      if (!columns[columnId]) {
        notExistColumns.push(columnId);
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  if (notExistColumns.length) {
    throw new _ArgumentsError2.default('You trying to get not exist columns: ' + notExistColumns.join(', '));
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
 * @param {Function}              cb
 */
exports.default = (0, _callbackify2.default)(function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(gridModel, columns, viewColumns, exporter, settings) {
    var result, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
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
            return _context.abrupt('return', _context.sent);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}());
module.exports = exports['default'];