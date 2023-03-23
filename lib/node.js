"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _common = _interopRequireDefault(require("./common"));

var _GridExpressApi = _interopRequireDefault(require("./grid/models/GridExpressApi"));

var _ListExpressApi = _interopRequireDefault(require("./list/ListExpressApi"));

var _FormExpressApi = _interopRequireDefault(require("./form/FormExpressApi"));

var _exportGridData = _interopRequireDefault(require("./grid/export/exportGridData"));

var _toJSON = _interopRequireDefault(require("./grid/export/exporters/toJSON"));

var _toCSV = _interopRequireDefault(require("./grid/export/exporters/toCSV"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var UIKernel = _objectSpread(_objectSpread({}, _common["default"]), {}, {
  gridExpressApi: _GridExpressApi["default"].create,
  listExpressApi: _ListExpressApi["default"].create,
  formExpressApi: _FormExpressApi["default"].create,
  exportGridData: _exportGridData["default"],
  toJSON: _toJSON["default"],
  toCSV: _toCSV["default"]
});

var _default = UIKernel;
exports["default"] = _default;
module.exports = exports.default;