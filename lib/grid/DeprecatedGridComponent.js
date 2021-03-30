"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../common/utils");

var _Component = _interopRequireDefault(require("./Component"));

var deprecatedColsWarn = false;

var DeprecatedGridComponent = /*#__PURE__*/_react["default"].forwardRef(function deprecatedGrid(props, ref) {
  var prevColumns = (0, _react.useRef)();
  var columns = (0, _react.useMemo)(function () {
    if (props.cols) {
      if (!deprecatedColsWarn) {
        deprecatedColsWarn = true;
        console.warn('Prop "cols" deprecated. Use "columns" instead. ' + 'Any changing of columns bring to rendering');
      }

      if (!(0, _utils.isEqual)(prevColumns.current, props.cols)) {
        prevColumns.current = props.cols;
      }

      return prevColumns.current;
    }

    return props.columns;
  }, [props.columns, props.cols]);
  return /*#__PURE__*/_react["default"].createElement(_Component["default"], (0, _extends2["default"])({}, props, {
    columns: columns,
    ref: ref
  }));
});

var _default = DeprecatedGridComponent;
exports["default"] = _default;
module.exports = exports.default;