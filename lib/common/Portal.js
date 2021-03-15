"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var portalClass = '__portal';

var Portal = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Portal, _React$Component);

  var _super = _createSuper(Portal);

  function Portal(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Portal);
    _this = _super.call(this, props);
    _this._onDocumentMouseDown = _this._onDocumentMouseDown.bind((0, _assertThisInitialized2["default"])(_this));
    _this._onDocumentMouseScroll = _this._onDocumentMouseScroll.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(Portal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('mousedown', this._onDocumentMouseDown, false);
      document.addEventListener('scroll', this._onDocumentMouseScroll, true);
      var portal = document.createElement('div');
      document.body.appendChild(portal);
      portal.className = portalClass;
      this.portal = portal;
      this.renderPortal();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('mousedown', this._onDocumentMouseDown, false);
      document.removeEventListener('scroll', this._onDocumentMouseScroll, true);

      _reactDom["default"].unmountComponentAtNode(this.portal);

      document.body.removeChild(this.portal);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.renderPortal();
    }
  }, {
    key: "_isDocumentEventOwner",
    value: function _isDocumentEventOwner(target) {
      return target === this.portal || this.portal.contains(target);
    }
  }, {
    key: "_onDocumentMouseDown",
    value: function _onDocumentMouseDown(e) {
      if (this.props.onDocumentMouseDown) {
        this.props.onDocumentMouseDown(e, this._isDocumentEventOwner(e.target));
      }
    }
  }, {
    key: "_onDocumentMouseScroll",
    value: function _onDocumentMouseScroll(e) {
      if (this.props.onDocumentMouseScroll) {
        this.props.onDocumentMouseScroll(e, this._isDocumentEventOwner(e.target));
      }
    }
  }, {
    key: "renderPortal",
    value: function renderPortal() {
      _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement("div", (0, _utils.omit)(this.props, ['onDocumentMouseDown', 'onDocumentMouseScroll']), this.props.children), this.portal);
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return Portal;
}(_react["default"].Component);

Portal.propTypes = {
  children: _propTypes["default"].node,
  onDocumentMouseDown: _propTypes["default"].func,
  onDocumentMouseScroll: _propTypes["default"].func
};
var _default = Portal;
exports["default"] = _default;
module.exports = exports.default;