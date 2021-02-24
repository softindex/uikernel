"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _FormService = _interopRequireDefault(require("./FormService"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function connectForm() {
  var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return function (Component) {
    return /*#__PURE__*/function (_React$Component) {
      (0, _inherits2["default"])(ComponentWithFormService, _React$Component);

      var _super = _createSuper(ComponentWithFormService);

      function ComponentWithFormService() {
        var _this;

        (0, _classCallCheck2["default"])(this, ComponentWithFormService);
        _this = _super.call(this);
        _this.form = new _FormService["default"](fields);
        _this.state = _this.form.getAll();
        _this.onFormChange = _this.onFormChange.bind((0, _assertThisInitialized2["default"])(_this));
        return _this;
      }

      (0, _createClass2["default"])(ComponentWithFormService, [{
        key: "componentDidMount",
        value: function () {
          var _componentDidMount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
            var state;
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    state = this.form.getAll();

                    if (state.isLoaded) {
                      this.setState(state);
                    }

                    this.form.addChangeListener(this.onFormChange);

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function componentDidMount() {
            return _componentDidMount.apply(this, arguments);
          }

          return componentDidMount;
        }()
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.form.removeChangeListener(this.onFormChange);
        }
      }, {
        key: "onFormChange",
        value: function onFormChange(newFormState) {
          this.setState(newFormState);
        }
      }, {
        key: "render",
        value: function render() {
          return /*#__PURE__*/_react["default"].createElement(Component, (0, _extends2["default"])({}, this.props, {
            formData: this.state,
            formService: this.form
          }));
        }
      }]);
      return ComponentWithFormService;
    }(_react["default"].Component);
  };
}

var _default = connectForm;
exports["default"] = _default;
module.exports = exports.default;