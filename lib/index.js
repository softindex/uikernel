(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["UIKernel"] = factory();
	else
		root["UIKernel"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/node.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/browser.js":
/*!************************!*\
  !*** ./src/browser.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_setImmediate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/setImmediate */ "./src/common/setImmediate.js");
/* harmony import */ var _common_setImmediate__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_common_setImmediate__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/variables */ "./src/common/variables.js");
/* harmony import */ var _grid_models_applyGridFilters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./grid/models/applyGridFilters */ "./src/grid/models/applyGridFilters.js");
/* harmony import */ var _grid_Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./grid/Component */ "./src/grid/Component.js");
/* harmony import */ var _form_FormService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form/FormService */ "./src/form/FormService.js");
/* harmony import */ var _form_connectForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./form/connectForm */ "./src/form/connectForm.js");
/* harmony import */ var _common_validation_Validator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/validation/Validator */ "./src/common/validation/Validator.js");
/* harmony import */ var _grid_export_exportGridData__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./grid/export/exportGridData */ "./src/grid/export/exportGridData.js");
/* harmony import */ var _grid_export_exporters_toJSON__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./grid/export/exporters/toJSON */ "./src/grid/export/exporters/toJSON.js");
/* harmony import */ var _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/validation/ValidationErrors */ "./src/common/validation/ValidationErrors.js");
/* harmony import */ var _grid_models_GridXhrModel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./grid/models/GridXhrModel */ "./src/grid/models/GridXhrModel.js");
/* harmony import */ var _grid_models_GridCollectionModel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./grid/models/GridCollectionModel */ "./src/grid/models/GridCollectionModel.js");
/* harmony import */ var _common_Events__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./common/Events */ "./src/common/Events.js");
/* harmony import */ var _form_FormModel__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./form/FormModel */ "./src/form/FormModel.js");
/* harmony import */ var _form_FormXhrModel__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./form/FormXhrModel */ "./src/form/FormXhrModel.js");
/* harmony import */ var _list_ListXhrModel__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./list/ListXhrModel */ "./src/list/ListXhrModel.js");
/* harmony import */ var _form_AbstractFormModel__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./form/AbstractFormModel */ "./src/form/AbstractFormModel.js");
/* harmony import */ var _grid_models_AbstractGridModel__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./grid/models/AbstractGridModel */ "./src/grid/models/AbstractGridModel.js");
/* harmony import */ var _list_AbstractListModel__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./list/AbstractListModel */ "./src/list/AbstractListModel.js");
/* harmony import */ var _form_adapters_GridToFormUpdate__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./form/adapters/GridToFormUpdate */ "./src/form/adapters/GridToFormUpdate.js");
/* harmony import */ var _form_adapters_GridToFormCreate__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./form/adapters/GridToFormCreate */ "./src/form/adapters/GridToFormCreate.js");
/* harmony import */ var _editors_Select__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./editors/Select */ "./src/editors/Select.js");
/* harmony import */ var _editors_SuggestBox__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./editors/SuggestBox */ "./src/editors/SuggestBox.js");
/* harmony import */ var _editors_DatePicker__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./editors/DatePicker */ "./src/editors/DatePicker.js");
/* harmony import */ var _editors_Checkbox__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./editors/Checkbox */ "./src/editors/Checkbox.js");
/* harmony import */ var _editors_Number__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./editors/Number */ "./src/editors/Number.js");
/* harmony import */ var _common_ArgumentsError__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./common/ArgumentsError */ "./src/common/ArgumentsError.js");
/* harmony import */ var _common_ThrottleError__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./common/ThrottleError */ "./src/common/ThrottleError.js");
/* harmony import */ var _common_validation_rules_boolean__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./common/validation/rules/boolean */ "./src/common/validation/rules/boolean.js");
/* harmony import */ var _common_validation_rules_date__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./common/validation/rules/date */ "./src/common/validation/rules/date.js");
/* harmony import */ var _common_validation_rules_enum__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./common/validation/rules/enum */ "./src/common/validation/rules/enum.js");
/* harmony import */ var _common_validation_rules_set__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./common/validation/rules/set */ "./src/common/validation/rules/set.js");
/* harmony import */ var _common_validation_rules_float__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./common/validation/rules/float */ "./src/common/validation/rules/float.js");
/* harmony import */ var _common_validation_rules_regExp__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./common/validation/rules/regExp */ "./src/common/validation/rules/regExp.js");
/* harmony import */ var _common_validation_rules_notNull__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./common/validation/rules/notNull */ "./src/common/validation/rules/notNull.js");
/* harmony import */ var _common_validation_rules_number__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./common/validation/rules/number */ "./src/common/validation/rules/number.js");
/* harmony import */ var _common_validation_rules_notEmpty__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./common/validation/rules/notEmpty */ "./src/common/validation/rules/notEmpty.js");
/* harmony import */ var _form_mixin__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./form/mixin */ "./src/form/mixin.js");
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */







































if (!global._babelPolyfill) {
  __webpack_require__(/*! @babel/polyfill/browser */ "@babel/polyfill/browser");
}

var UIKernel = {
  applyGridFilters: _grid_models_applyGridFilters__WEBPACK_IMPORTED_MODULE_2__["default"],
  Grid: _grid_Component__WEBPACK_IMPORTED_MODULE_3__["default"],
  Form: _form_FormService__WEBPACK_IMPORTED_MODULE_4__["default"],
  connectForm: _form_connectForm__WEBPACK_IMPORTED_MODULE_5__["default"],
  createValidator: _common_validation_Validator__WEBPACK_IMPORTED_MODULE_6__["default"].create,
  exportGridData: _grid_export_exportGridData__WEBPACK_IMPORTED_MODULE_7__["default"],
  toJSON: _grid_export_exporters_toJSON__WEBPACK_IMPORTED_MODULE_8__["default"],
  ValidationErrors: _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_9__["default"],
  Models: {
    Grid: {
      Xhr: _grid_models_GridXhrModel__WEBPACK_IMPORTED_MODULE_10__["default"],
      Collection: _grid_models_GridCollectionModel__WEBPACK_IMPORTED_MODULE_11__["default"]
    },
    Events: _common_Events__WEBPACK_IMPORTED_MODULE_12__["default"],
    Form: _form_FormModel__WEBPACK_IMPORTED_MODULE_13__["default"],
    FormXhr: _form_FormXhrModel__WEBPACK_IMPORTED_MODULE_14__["default"],
    List: {
      Xhr: _list_ListXhrModel__WEBPACK_IMPORTED_MODULE_15__["default"]
    }
  },
  AbstractModels: {
    Form: _form_AbstractFormModel__WEBPACK_IMPORTED_MODULE_16__["default"],
    Grid: _grid_models_AbstractGridModel__WEBPACK_IMPORTED_MODULE_17__["default"],
    List: _list_AbstractListModel__WEBPACK_IMPORTED_MODULE_18__["default"]
  },
  Adapters: {
    Grid: {
      ToFormUpdate: _form_adapters_GridToFormUpdate__WEBPACK_IMPORTED_MODULE_19__["default"],
      ToFormCreate: _form_adapters_GridToFormCreate__WEBPACK_IMPORTED_MODULE_20__["default"]
    }
  },
  Editors: {
    Select: _editors_Select__WEBPACK_IMPORTED_MODULE_21__["default"],
    SuggestBox: _editors_SuggestBox__WEBPACK_IMPORTED_MODULE_22__["default"],
    DatePicker: _editors_DatePicker__WEBPACK_IMPORTED_MODULE_23__["default"],
    Checkbox: _editors_Checkbox__WEBPACK_IMPORTED_MODULE_24__["default"],
    Number: _editors_Number__WEBPACK_IMPORTED_MODULE_25__["default"]
  },
  ArgumentsError: _common_ArgumentsError__WEBPACK_IMPORTED_MODULE_26__["default"],
  ThrottleError: _common_ThrottleError__WEBPACK_IMPORTED_MODULE_27__["default"],
  Validators: {
    "boolean": _common_validation_rules_boolean__WEBPACK_IMPORTED_MODULE_28__["default"],
    date: _common_validation_rules_date__WEBPACK_IMPORTED_MODULE_29__["default"],
    "enum": _common_validation_rules_enum__WEBPACK_IMPORTED_MODULE_30__["default"],
    set: _common_validation_rules_set__WEBPACK_IMPORTED_MODULE_31__["default"],
    "float": _common_validation_rules_float__WEBPACK_IMPORTED_MODULE_32__["default"],
    regExp: _common_validation_rules_regExp__WEBPACK_IMPORTED_MODULE_33__["default"],
    notNull: _common_validation_rules_notNull__WEBPACK_IMPORTED_MODULE_34__["default"],
    number: _common_validation_rules_number__WEBPACK_IMPORTED_MODULE_35__["default"],
    notEmpty: _common_validation_rules_notEmpty__WEBPACK_IMPORTED_MODULE_36__["default"]
  },
  Mixins: {
    Form: _form_mixin__WEBPACK_IMPORTED_MODULE_37__["default"]
  },
  _get: _common_variables__WEBPACK_IMPORTED_MODULE_1__["default"].get,
  _set: _common_variables__WEBPACK_IMPORTED_MODULE_1__["default"].set
};
/* harmony default export */ __webpack_exports__["default"] = (UIKernel);

/***/ }),

/***/ "./src/common/ArgumentsError.js":
/*!**************************************!*\
  !*** ./src/common/ArgumentsError.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/common/utils.js");
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


function ArgumentsError(message) {
  Error.call(this, message);
  this.name = 'ArgumentsError';
  this.message = message;
  this.status = this.statusCode = 422;
  this.stack = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getStack"])();
}

ArgumentsError.prototype = Object.create(Error.prototype);
ArgumentsError.prototype.constructor = ArgumentsError;
/* harmony default export */ __webpack_exports__["default"] = (ArgumentsError);

/***/ }),

/***/ "./src/common/Events.js":
/*!******************************!*\
  !*** ./src/common/Events.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "@babel/runtime/helpers/typeof");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/common/utils.js");




/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Events control model
 */

var EventsModel =
/*#__PURE__*/
function () {
  function EventsModel() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, EventsModel);

    this._subscribers = {};
  }
  /**
   * Subscribe to inner model event
   *
   * @param {string}      event   Event ID
   * @param {Function}    cb      CallBack function
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(EventsModel, [{
    key: "on",
    value: function on(event, cb) {
      if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(this._subscribers[event]) !== 'object') {
        this._subscribers[event] = [];
      }

      this._subscribers[event].push(cb);
    }
    /**
     * Unsubscribe from inner model event
     *
     * @param {number}      event   Event ID
     * @param {Function}    cb      CallBack function
     */

  }, {
    key: "off",
    value: function off(event, cb) {
      if (this._subscribers[event]) {
        this._subscribers[event] = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["without"])(this._subscribers[event], cb);
      }
    }
    /**
     * Trigger inner model event
     *
     * @param {number}  event   Event ID
     * @param {...*}    params
     */

  }, {
    key: "trigger",
    value: function trigger(event) {
      if (!this._subscribers[event] || !this._subscribers[event].length) {
        return;
      }

      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._subscribers[event][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var subscriber = _step.value;
          subscriber.apply(void 0, params);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    /**
     * Returns the number of listeners listening to the event
     *
     * @param {string} event name
     */

  }, {
    key: "listenerCount",
    value: function listenerCount(event) {
      return this._subscribers[event] ? this._subscribers[event].length : 0;
    }
    /**
     * Removes all listeners of the specified event
     *
     * @param {string} event name
     */

  }, {
    key: "removeAllListeners",
    value: function removeAllListeners(event) {
      this._subscribers[event] = [];
    }
  }]);

  return EventsModel;
}();

/* harmony default export */ __webpack_exports__["default"] = (EventsModel);

/***/ }),

/***/ "./src/common/Portal.js":
/*!******************************!*\
  !*** ./src/common/Portal.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "@babel/runtime/helpers/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils */ "./src/common/utils.js");







/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */




var portalClass = '__portal';

var Portal =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Portal, _React$Component);

  function Portal(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Portal);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Portal).call(this, props));
    _this._onDocumentMouseDown = _this._onDocumentMouseDown.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    _this._onDocumentMouseScroll = _this._onDocumentMouseScroll.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Portal, [{
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
      react_dom__WEBPACK_IMPORTED_MODULE_6___default.a.unmountComponentAtNode(this.portal);
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
      react_dom__WEBPACK_IMPORTED_MODULE_6___default.a.render(react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", Object(_utils__WEBPACK_IMPORTED_MODULE_9__["omit"])(this.props, ['onDocumentMouseDown', 'onDocumentMouseScroll']), this.props.children), this.portal);
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return Portal;
}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);

Portal.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.node,
  onDocumentMouseDown: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func,
  onDocumentMouseScroll: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (Portal);

/***/ }),

/***/ "./src/common/ThrottleError.js":
/*!*************************************!*\
  !*** ./src/common/ThrottleError.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/common/utils.js");
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


function ThrottleError() {
  Error.call(this);
  this.name = 'ThrottleError';
  this.message = 'Too many function call';
  this.stack = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getStack"])();
}

ThrottleError.prototype = Object.create(Error.prototype);
ThrottleError.prototype.constructor = ThrottleError;

ThrottleError.createWithParentStack = function (stack) {
  var err = new ThrottleError();
  err.stack += '\n' + stack;
  return err;
};

/* harmony default export */ __webpack_exports__["default"] = (ThrottleError);

/***/ }),

/***/ "./src/common/callbackify.js":
/*!***********************************!*\
  !*** ./src/common/callbackify.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils */ "./src/common/utils.js");
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var functionsNames = [];
/* harmony default export */ __webpack_exports__["default"] = (function (func) {
  var hideWarning = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var funcName = func.name;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var lastArgumentIndex = args.length - 1;
    var cb = args[lastArgumentIndex];

    if (typeof cb === 'function' && !cb.__ignoreUIKernelWarning) {
      if (!functionsNames.includes(funcName) && !hideWarning) {
        Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["warn"])("You are using callback in: '".concat(funcName, "'. Use promise instead.\n").concat(JSON.stringify(args)));
        functionsNames.push(funcName);
      }

      var result = func.apply(this, args);

      if (result && result.then) {
        result.then(function (data) {
          cb(null, data);
        })["catch"](function (err) {
          cb(err);
        });
      }
    } else {
      return func.apply(this, args);
    }
  };
});

/***/ }),

/***/ "./src/common/defaultXhr.js":
/*!**********************************!*\
  !*** ./src/common/defaultXhr.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./variables */ "./src/common/variables.js");
/* harmony import */ var xhr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xhr */ "xhr");
/* harmony import */ var xhr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(xhr__WEBPACK_IMPORTED_MODULE_1__);
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */



function defaultXhr(settings) {
  return new Promise(function (resolve, reject) {
    xhr__WEBPACK_IMPORTED_MODULE_1___default()(settings, function (err, response, body) {
      if (response.statusCode === 200) {
        resolve(body);
        return;
      }

      if (!err) {
        err = new Error();
        err.statusCode = response.statusCode;
        err.message = 'Status Code: ' + err.statusCode;
      }

      if (body) {
        try {
          var parsedBody = JSON.parse(body);
          err.message = parsedBody.message || body;
        } catch (e) {
          err.message = body;
        }
      }

      reject(err);
    });
  });
}

if (!_variables__WEBPACK_IMPORTED_MODULE_0__["default"].get('xhr')) {
  _variables__WEBPACK_IMPORTED_MODULE_0__["default"].set('xhr', defaultXhr);
}

/* harmony default export */ __webpack_exports__["default"] = (function (settings) {
  return _variables__WEBPACK_IMPORTED_MODULE_0__["default"].get('xhr')(settings);
});

/***/ }),

/***/ "./src/common/setImmediate.js":
/*!************************************!*\
  !*** ./src/common/setImmediate.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
if (typeof window !== 'undefined' && typeof window.setImmediate !== 'function') {
  window.setImmediate = function () {
    var head = {};
    var tail = head;
    var ID = Math.random();

    function onMessage(e) {
      if (e.data !== ID) {
        return;
      }

      head = head.next;
      var func = head.func;
      delete head.func;
      func();
    }

    if (window.addEventListener) {
      window.addEventListener('message', onMessage, false);
    } else {
      window.attachEvent('onmessage', onMessage);
    }

    return window.postMessage ? function (func) {
      tail = tail.next = {
        func: func
      };
      window.postMessage(ID, '*');
    } : function (func) {
      setTimeout(func, 0);
    };
  }();
}

/***/ }),

/***/ "./src/common/toPromise.js":
/*!*********************************!*\
  !*** ./src/common/toPromise.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils */ "./src/common/utils.js");
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var functionsNames = [];

function toPromise(func, hideWarning) {
  var funcName = func.name;

  function promiseWarn(text) {
    if (!hideWarning) {
      if (!functionsNames.includes(funcName)) {
        Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["warn"])(text);
        functionsNames.push(funcName);
      }
    }
  }

  return function () {
    for (var _len = arguments.length, mainArguments = new Array(_len), _key = 0; _key < _len; _key++) {
      mainArguments[_key] = arguments[_key];
    }

    var promise;
    var callbackPromise = new Promise(function (resolve, reject) {
      function toPromiseCallback(err, data) {
        if (err) {
          return reject(err);
        }

        resolve(data);
      }

      toPromiseCallback.__ignoreUIKernelWarning = true;
      mainArguments.push(toPromiseCallback);
      promise = func.apply(void 0, mainArguments);
    });

    if (promise) {
      if (promise.then && promise["catch"]) {
        return promise;
      }

      promiseWarn("The return value is not a Promise in '".concat(funcName, "'.\n") + "Arguments: ".concat(JSON.stringify(mainArguments), "\n") + "Returns: ".concat(JSON.stringify(promise)));
      return callbackPromise;
    } else {
      promiseWarn("You are using callback in: '".concat(funcName, "'. Use promise instead.\n") + "Arguments: ".concat(JSON.stringify(mainArguments)));
      return callbackPromise;
    }
  };
}

/* harmony default export */ __webpack_exports__["default"] = (toPromise);

/***/ }),

/***/ "./src/common/utils.js":
/*!*****************************!*\
  !*** ./src/common/utils.js ***!
  \*****************************/
/*! exports provided: isIntersection, size, indexOf, throttle, parseValueFromEvent, Decorator, decorate, isEqual, clone, cloneDeep, isEmpty, isDefined, forEach, pluck, find, findIndex, omit, escape, zipObject, pick, mapKeys, reduce, union, at, pairs, toDate, without, last, getRecordChanges, getStack, warn, toEncodedString, asyncHandler, parents, parseJson */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIntersection", function() { return isIntersection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "size", function() { return size; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indexOf", function() { return indexOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return throttle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseValueFromEvent", function() { return parseValueFromEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Decorator", function() { return Decorator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decorate", function() { return decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEqual", function() { return isEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneDeep", function() { return cloneDeep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDefined", function() { return isDefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pluck", function() { return pluck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "find", function() { return find; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findIndex", function() { return findIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "omit", function() { return omit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escape", function() { return escape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zipObject", function() { return zipObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pick", function() { return pick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapKeys", function() { return mapKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reduce", function() { return reduce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "union", function() { return union; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "at", function() { return at; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pairs", function() { return pairs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toDate", function() { return toDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "without", function() { return without; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "last", function() { return last; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRecordChanges", function() { return getRecordChanges; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStack", function() { return getStack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warn", function() { return warn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toEncodedString", function() { return toEncodedString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncHandler", function() { return asyncHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parents", function() { return parents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseJson", function() { return parseJson; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "@babel/runtime/helpers/typeof");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThrottleError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThrottleError */ "./src/common/ThrottleError.js");
/* harmony import */ var _ArgumentsError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ArgumentsError */ "./src/common/ArgumentsError.js");



/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */



function baseClone(obj, isDeep) {
  var cloned;
  var es6types = ['[object Set]', '[object WeakSet]', '[object Map]', '[object WeakMap]'];

  if (!(obj instanceof Object) || obj instanceof Date || obj instanceof Function || obj instanceof RegExp) {
    return obj;
  }

  if (Array.isArray(obj)) {
    cloned = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = obj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var el = _step.value;
        cloned.push(isDeep ? baseClone(el, true) : el);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } else if (es6types.includes(obj.toString())) {
    cloned = new obj.constructor(obj);
  } else {
    cloned = {};

    for (var _i = 0, _Object$entries = Object.entries(obj); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_Object$entries[_i], 2),
          field = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      cloned[field] = isDeep ? baseClone(value, true) : value;
    }
  }

  return cloned;
}
/**
 * Check if two arrays intersection exists
 */


function isIntersection(a, b) {
  var c;

  if (a.length > b.length) {
    c = a;
    a = b;
    b = c;
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = a[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var el = _step2.value;

      if (indexOf(b, el) > -1) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return false;
}
/**
 * Define object size
 *
 * @param   {Object}    obj     Object
 * @return  {number}    Object size
 */

function size(obj) {
  return Object.keys(obj).length;
}
/**
 * Element position (isEqual checking)
 *
 * @param   {Array}   arr   Array
 * @param   {*}       item  Element item
 * @return  {number}
 */

function indexOf(arr, item) {
  for (var i = 0; i < arr.length; i++) {
    if (isEqual(arr[i], item)) {
      return i;
    }
  }

  return -1;
}
function throttle(func) {
  var worked = false;
  var nextArguments;
  var nextResolve;
  var nextReject;
  return function () {
    if (typeof arguments[arguments.length - 1] === 'function') {
      return throttleCallback(func).apply(this, arguments);
    } else {
      return throttlePromise(func).apply(this, arguments);
    }
  }; // it is still used in FormMixin._validateForm so we can't remove it yet

  function throttleCallback(func) {
    return function run() {
      var ctx = this; // Function context

      var cb = arguments[arguments.length - 1];
      var argumentsArray = [].slice.call(arguments);

      if (worked) {
        // Set as the next call
        nextArguments = arguments;
        return;
      }

      worked = true;

      var cbWrapper = function cbWrapper() {
        if (!nextWorker() && typeof cb === 'function') {
          cb.apply(null, arguments);
        }
      };

      if (typeof cb === 'function') {
        argumentsArray[argumentsArray.length - 1] = cbWrapper;
        func.apply(this, argumentsArray.concat(nextWorker));
      } else {
        func.apply(this, argumentsArray.concat(cbWrapper, nextWorker));
      }

      function nextWorker() {
        worked = false;

        if (nextArguments) {
          var args = nextArguments;
          nextArguments = null;
          run.apply(ctx, args);
          return true;
        }

        return false;
      }
    };
  }

  function throttlePromise(func) {
    /**
     * @throws {ThrottleError} Too many function call
     */
    return function run() {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var parentStack = getStack(2);
      return new Promise(function (resolve, reject) {
        if (worked) {
          if (nextArguments) {
            nextReject(_ThrottleError__WEBPACK_IMPORTED_MODULE_2__["default"].createWithParentStack(parentStack));
          }

          nextArguments = args;
          nextResolve = resolve;
          nextReject = reject;
          return;
        }

        worked = true;
        func.apply(_this, args).then(function (result) {
          worked = false;

          if (nextArguments) {
            nextResolve(run.apply(_this, nextArguments));
            nextArguments = null;
            reject(_ThrottleError__WEBPACK_IMPORTED_MODULE_2__["default"].createWithParentStack(parentStack));
            return;
          }

          resolve(result);
        })["catch"](function (err) {
          worked = false;
          reject(err);
        });
      });
    };
  }
}
function parseValueFromEvent(event) {
  if (event && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(event) === 'object' && event.target && ['INPUT', 'TEXTAREA', 'SELECT'].indexOf(event.target.tagName) >= 0) {
    switch (event.target.type) {
      case 'checkbox':
        return event.target.checked;
    }

    return event.target.value;
  }

  return event;
}
function Decorator(obj, decor) {
  Object.assign(this, decor);

  for (var i in obj) {
    if (typeof obj[i] === 'function' && !decor[i]) {
      this[i] = obj[i].bind(obj);
    }
  }
}
function decorate(obj, decor) {
  Decorator.prototype = obj;
  return new Decorator(obj, decor);
}
/**
 * Checking at equals params
 *
 * @param a
 * @param b
 * @returns {boolean}
 */

function isEqual(a, b) {
  if (a === null || b === null || a === undefined || b === undefined || typeof a === 'function' || typeof b === 'function' || a instanceof RegExp || b instanceof RegExp) {
    return a === b;
  }

  if (a === b || a.valueOf() === b.valueOf() || a !== a && b !== b) {
    return true;
  }

  if (Array.isArray(a) && (!Array.isArray(b) || a.length !== b.length) || _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(a) !== 'object' || _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(b) !== 'object') {
    return false;
  }

  if (typeof File === 'function' && a instanceof File && b instanceof File) {
    return a.size === b.size && a.name === b.name;
  }

  var keys = Object.keys(a);
  return Object.keys(b).every(function (key) {
    return keys.includes(key);
  }) && keys.every(function (key) {
    return isEqual(a[key], b[key]);
  });
}
/**
 * Clone object
 *
 * @param obj
 * @returns {*}
 */

function clone(obj) {
  return baseClone(obj, false);
}
function cloneDeep(obj) {
  return baseClone(obj, true);
}
function isEmpty(value) {
  if (!value) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(value) === 'object') {
    return Object.keys(value).length === 0;
  }

  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  return false;
}
function isDefined(value) {
  return value !== null && value !== undefined;
}
function forEach(obj, func, ctx) {
  for (var i in obj) {
    func.call(ctx, obj[i], i);
  }
}
function pluck(arr, field) {
  return arr.map(function (item) {
    return item[field];
  });
}
function find(arr, func) {
  for (var i in arr) {
    if (func(arr[i], i)) {
      return arr[i];
    }
  }

  return null;
}
function findIndex(obj, func) {
  for (var i in obj) {
    if (func(obj[i], i)) {
      return i;
    }
  }

  return -1;
}
function omit(obj, predicate) {
  var result = {};

  for (var _i2 = 0, _Object$entries2 = Object.entries(obj); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_Object$entries2[_i2], 2),
        field = _Object$entries2$_i[0],
        value = _Object$entries2$_i[1];

    if (typeof predicate === 'string' && predicate !== field || Array.isArray(predicate) && !predicate.includes(field) || typeof predicate === 'function' && !predicate(value, field)) {
      result[field] = value;
    }
  }

  return result;
}
function escape(string) {
  var reUnescaped = /[&<>"'`]/g;
  var escapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '`': '&#96;'
  };
  string = "".concat(string === null ? '' : string.toString());

  if (string && reUnescaped.test(string)) {
    return string.replace(reUnescaped, function (chr) {
      return escapes[chr];
    });
  }

  return string;
}
function zipObject(keys, values) {
  var result = {};

  for (var i = 0; i < keys.length; i++) {
    result[keys[i]] = values[i];
  }

  return result;
}
function pick(obj, keys, defaultValue) {
  return keys.reduce(function (result, key) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    } else if (defaultValue !== undefined) {
      result[key] = defaultValue;
    }

    return result;
  }, {});
}
function mapKeys(object, iteratee) {
  var result = {};

  for (var _i3 = 0, _Object$entries3 = Object.entries(object); _i3 < _Object$entries3.length; _i3++) {
    var _Object$entries3$_i = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_Object$entries3[_i3], 2),
        key = _Object$entries3$_i[0],
        value = _Object$entries3$_i[1];

    result[iteratee(value, key)] = value;
  }

  return result;
}
function reduce(obj, func, value) {
  for (var i in obj) {
    value = func(value, obj[i], i);
  }

  return value;
}
function union() {
  var elements = {};

  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  for (var _i4 = 0, _args = args; _i4 < _args.length; _i4++) {
    var arg = _args[_i4];
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = arg[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var el = _step3.value;
        elements[el] = el;
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }

  return Object.values(elements);
}
function at(obj, keys) {
  var result = [];

  if (!Array.isArray(keys)) {
    return [obj[keys]];
  }

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = keys[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var key = _step4.value;
      result.push(obj[key]);
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return result;
}
function pairs(obj) {
  var result = [];

  for (var i in obj) {
    result.push([i, obj[i]]);
  }

  return result;
}
function toDate(value) {
  var date;

  if (typeof value === 'number') {
    return new Date(value);
  }

  if (typeof value === 'string') {
    date = new Date(value);
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000); // Convert UTC to local time

    return date;
  }

  return new Date(value);
}
function without(arr, el) {
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(el) ? indexOf(el, arr[i]) > -1 : isEqual(arr[i], el)) {
      continue;
    }

    result.push(arr[i]);
  }

  return result;
}
function last(arr) {
  return arr[arr.length - 1];
}
function getRecordChanges(model, data, changes, newChanges) {
  var result = Object.assign({}, changes, newChanges);

  for (var i in result) {
    if (isEqual(data[i], result[i])) {
      delete result[i];
    }
  }

  Object.assign(result, pick(data, model.getValidationDependency(Object.keys(result))));
  return result;
}
function getStack() {
  var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  // We add here try..catch because in IE Error.stack is available only
  // for thrown errors: https://msdn.microsoft.com/ru-ru/library/windows/apps/hh699850.aspx
  var stack = '';
  var stackTraceLimitDefault = Error.stackTraceLimit;
  Error.stackTraceLimit = deep + 12;

  try {
    throw new Error();
  } catch (e) {
    if (e.stack) {
      // Error.stack is unavailable in old browsers
      stack = e.stack.split('\n').slice(2 + deep) // Here we delete rows 'Error' and 'at getStack(utils.js:427)'
      .join('\n');
    }
  }

  Error.stackTraceLimit = stackTraceLimitDefault;
  return stack;
}
function warn(message) {
  console.warn(message, '\n', getStack(1));
}
function toEncodedString(value) {
  return encodeURIComponent(typeof value === 'string' ? value : JSON.stringify(value));
}
function asyncHandler(router) {
  return function (req, res, next) {
    var promise = router(req, res, next);

    if (promise && promise.then) {
      return promise["catch"](next);
    }

    next(new Error('asyncHandler expected to take async function.'));
  };
}
function parents(element, selector) {
  var result = [];

  while (element = element.parentElement) {
    if (element.matches(selector)) {
      result.push(element);
    }
  }

  return result;
}
function parseJson(json) {
  var errorMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Incorrect JSON';
  var result;

  try {
    result = JSON.parse(json);
  } catch (err) {
    throw new _ArgumentsError__WEBPACK_IMPORTED_MODULE_3__["default"](errorMessage);
  }

  return result;
}

/***/ }),

/***/ "./src/common/validation/ValidationErrors.js":
/*!***************************************************!*\
  !*** ./src/common/validation/ValidationErrors.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);






/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ValidationErrors =
/*#__PURE__*/
function () {
  /**
   * Field errors control manager
   * @constructor
   */
  function ValidationErrors() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ValidationErrors);

    this._fields = new Map();
  }
  /**
   * Convert JSON to ValidationErrors object
   *
   * @param   {{:string[]}}      jsonObject
   * @return  {ValidationErrors}
   * @static
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ValidationErrors, [{
    key: "add",

    /**
     * Add an error
     *
     * @param {string}                  field       Field name
     * @param {string|{string message}} error       Error text
     * @return {ValidationErrors}
     */
    value: function add(field, error) {
      error = this._formErrorValue(error);

      if (!this._fields.has(field)) {
        this._fields.set(field, [error]);

        return this;
      }

      var fieldErrors = this._fields.get(field);

      if (!fieldErrors.includes(error)) {
        fieldErrors.push(error);
      }

      return this;
    }
    /**
     * Field has error flag
     *
     * @param   {string}      field     Field name
     * @returns {boolean}
     */

  }, {
    key: "hasError",
    value: function hasError(field) {
      return this._fields.has(field);
    }
    /**
     * Get field errors
     *
     * @param   {string}      field     Field name
     * @returns {Array|null}  Errors array or null
     */

  }, {
    key: "getFieldErrors",
    value: function getFieldErrors(field) {
      return this._fields.get(field) || null;
    }
    /**
     * Get field errors message
     *
     * @param   {string}      field     Field name
     * @returns {Array|null}  Errors array or null
     */

  }, {
    key: "getFieldErrorMessages",
    value: function getFieldErrorMessages(field) {
      var fieldErrors = this._fields.get(field);

      if (fieldErrors) {
        return fieldErrors.map(function (error) {
          return error.message;
        });
      }

      return null;
    }
    /**
     * Get field names array, that contain errors
     *
     * @returns {string[]|null}
     */

  }, {
    key: "getFailedFields",
    value: function getFailedFields() {
      var fields = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(this._fields.keys());

      return fields.length ? fields : null;
    }
    /**
     * Errors absence check
     *
     * @returns {boolean} Errors presence
     */

  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this._fields.size === 0;
    }
    /**
     * Clear specific field errors
     *
     * @param   {string}  field  Field name
     * @returns {ValidationErrors}
     */

  }, {
    key: "clearField",
    value: function clearField(field) {
      this._fields["delete"](field);

      return this;
    }
    /**
     * Clear errors list
     *
     * @return {ValidationErrors}
     */

  }, {
    key: "clear",
    value: function clear() {
      this._fields = new Map();
      return this;
    }
    /**
     * Convert errors to JSON
     *
     * @return {{[string]: Array<string>}}
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];

          json[key] = value;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return json;
    }
    /**
     * Clone object
     *
     * @return {ValidationErrors}
     */

  }, {
    key: "clone",
    value: function clone() {
      return ValidationErrors.createFromJSON(this.toJSON());
    }
    /**
     * Merge object
     *
     * @return {ValidationErrors}
     */

  }, {
    key: "merge",
    value: function merge(validationErrors) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = validationErrors.getErrors()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _errors;

          var _step2$value = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_step2.value, 2),
              field = _step2$value[0],
              newErrors = _step2$value[1];

          var errors = this._fields.get(field);

          if (!errors) {
            errors = [];

            this._fields.set(field, errors);
          }

          (_errors = errors).push.apply(_errors, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(newErrors));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this;
    }
    /**
     * Get errors iterator
     *
     * @return {[string, string[]][]}
     */

  }, {
    key: "getErrors",
    value: function getErrors() {
      return this._fields;
    }
  }, {
    key: "_formErrorValue",
    value: function _formErrorValue(error) {
      if (typeof error === 'string') {
        return {
          message: error
        };
      }

      if (!error.message) {
        throw new Error('Invalid error value. Error must be string or object with "message" property.');
      }

      return error;
    }
  }], [{
    key: "createFromJSON",
    value: function createFromJSON(jsonObject) {
      var validationErrors = new ValidationErrors();

      var _loop = function _loop() {
        var _Object$entries$_i = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        value.forEach(function (errMessage) {
          return validationErrors.add(key, errMessage);
        });
      };

      for (var _i = 0, _Object$entries = Object.entries(jsonObject); _i < _Object$entries.length; _i++) {
        _loop();
      }

      return validationErrors;
    }
    /**
     * Create ValidationErrors object with one error
     *
     * @param {string}                  field
     * @param {string|{error: string}}  error
     * @return {ValidationErrors}
     */

  }, {
    key: "createWithError",
    value: function createWithError(field, error) {
      var validationErrors = new ValidationErrors();
      validationErrors.add(field, error);
      return validationErrors;
    }
  }]);

  return ValidationErrors;
}();

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(ValidationErrors, "merge", function () {
  var jsonErrors = [{}];

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var _i2 = 0, _args = args; _i2 < _args.length; _i2++) {
    var arg = _args[_i2];
    jsonErrors.push(arg.toJSON());
  } // TODO Need deep merge


  return ValidationErrors.createFromJSON(Object.assign.apply(Object, jsonErrors));
});

/* harmony default export */ __webpack_exports__["default"] = (ValidationErrors);

/***/ }),

/***/ "./src/common/validation/Validator.js":
/*!********************************************!*\
  !*** ./src/common/validation/Validator.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ValidationErrors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ValidationErrors */ "./src/common/validation/ValidationErrors.js");
/* harmony import */ var _ArgumentsError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ArgumentsError */ "./src/common/ArgumentsError.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils */ "./src/common/utils.js");






/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */




var Validator =
/*#__PURE__*/
function () {
  /**
   * Validation check model
   *
   * @constructor
   */
  function Validator() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, Validator);

    this._settings = {
      validators: {},
      groupValidators: [],
      asyncValidators: {},
      asyncGroupValidators: [],
      asyncDependenies: []
    };
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(Validator, [{
    key: "field",

    /**
     * Add field sync validators
     *
     * @param {string}      field       Field name
     * @param {...Function} validators  Field validators
     * @returns {Validator} validator
     */
    value: function field(_field) {
      if (!this._settings.validators[_field]) {
        this._settings.validators[_field] = [];
      }

      for (var _len = arguments.length, validators = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        validators[_key - 1] = arguments[_key];
      }

      this._settings.validators[_field] = this._settings.validators[_field].concat(validators);
      return this;
    }
    /**
     * Specify multiple sync validators for fields group
     *
     * @param {Array}      fields              Fields array
     * @param {Function}   validatorFunction   Validator function
     * @returns {Validator} validator
     */

  }, {
    key: "fields",
    value: function fields(_fields, validatorFunction) {
      this._settings.groupValidators.push({
        fields: _fields,
        fn: validatorFunction
      });

      return this;
    }
    /**
     * Point which fields server validation needs
     *
     * @param {Array}   fields   Fields array
     * @returns {Validator} validator
     */

  }, {
    key: "asyncDependence",
    value: function asyncDependence(fields) {
      this._settings.asyncDependenies.push(fields);

      return this;
    }
    /**
     * Add field async validators
     *
     * @param {string}     field               Field name
     * @param {Function}   validatorFunction   Validator function
     * @returns {Validator} validator
     */

  }, {
    key: "asyncField",
    value: function asyncField(field, validatorFunction) {
      if (!this._settings.asyncValidators[field]) {
        this._settings.asyncValidators[field] = [];
      }

      this._settings.asyncValidators[field].push(validatorFunction);

      return this;
    }
    /**
     * Specify multiple async validators for fields group
     *
     * @param {Array}      fields              Fields array
     * @param {Function}   validatorFunction   Validator function
     * @returns {Validator} validator
     */

  }, {
    key: "asyncFields",
    value: function asyncFields(fields, validatorFunction) {
      this._settings.asyncGroupValidators.push({
        fields: fields,
        fn: validatorFunction
      });

      return this;
    }
    /**
     * Get all dependent fields validation needs
     *
     * @param {Array}   fields    Fields array
     * @returns {Array} fields
     */

  }, {
    key: "getValidationDependency",
    value: function getValidationDependency(fields) {
      var result = [];
      var length;
      var groups = Object(_utils__WEBPACK_IMPORTED_MODULE_7__["pluck"])(this._settings.groupValidators.concat(this._settings.asyncGroupValidators), 'fields').concat(this._settings.asyncDependenies);

      while (length !== result.length) {
        length = result.length;

        for (var i = 0; i < groups.length; i++) {
          if (!Object(_utils__WEBPACK_IMPORTED_MODULE_7__["isIntersection"])(groups[i], fields) && !Object(_utils__WEBPACK_IMPORTED_MODULE_7__["isIntersection"])(groups[i], result)) {
            continue;
          }

          for (var j = 0; j < groups[i].length; j++) {
            var field = groups[i][j];

            if (fields.indexOf(field) >= 0 || result.indexOf(field) >= 0) {
              continue;
            }

            result.push(field);
          }
        }
      }

      return result;
    }
    /**
     * Check client record validity
     *
     * @param {Object}  record   Record
     * @returns {ValidationErrors|null} Record validity
     */

  }, {
    key: "isValidRecord",
    value: function () {
      var _isValidRecord = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(record) {
        var fields, errors, awaitStack, promises, dependentFields, _i, _Object$entries, _Object$entries$_i, _field2, value, validators, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, validator, _error, asyncValidators, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, asyncValidator, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, groupValidator, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, asyncGroupValidator, asyncErrors, error, field;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fields = Object.keys(record);
                errors = new _ValidationErrors__WEBPACK_IMPORTED_MODULE_5__["default"]();
                awaitStack = [];
                promises = [];
                dependentFields = this.getValidationDependency(fields);

                if (!dependentFields.length) {
                  _context.next = 7;
                  break;
                }

                throw new _ArgumentsError__WEBPACK_IMPORTED_MODULE_6__["default"]('Not enough fields for validator: ' + dependentFields.join(', '));

              case 7:
                _i = 0, _Object$entries = Object.entries(record);

              case 8:
                if (!(_i < _Object$entries.length)) {
                  _context.next = 66;
                  break;
                }

                _Object$entries$_i = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_Object$entries[_i], 2), _field2 = _Object$entries$_i[0], value = _Object$entries$_i[1];
                validators = this._settings.validators[_field2];

                if (!validators) {
                  _context.next = 31;
                  break;
                }

                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context.prev = 15;

                for (_iterator3 = validators[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  validator = _step3.value;
                  _error = validator(value);

                  if (_error) {
                    errors.add(_field2, _error);
                  }
                }

                _context.next = 23;
                break;

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](15);
                _didIteratorError3 = true;
                _iteratorError3 = _context.t0;

              case 23:
                _context.prev = 23;
                _context.prev = 24;

                if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                  _iterator3["return"]();
                }

              case 26:
                _context.prev = 26;

                if (!_didIteratorError3) {
                  _context.next = 29;
                  break;
                }

                throw _iteratorError3;

              case 29:
                return _context.finish(26);

              case 30:
                return _context.finish(23);

              case 31:
                asyncValidators = this._settings.asyncValidators[_field2];

                if (!asyncValidators) {
                  _context.next = 63;
                  break;
                }

                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context.prev = 36;
                _iterator4 = asyncValidators[Symbol.iterator]();

              case 38:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context.next = 49;
                  break;
                }

                asyncValidator = _step4.value;
                awaitStack.push(_field2);
                _context.t1 = promises;
                _context.next = 44;
                return asyncValidator(value);

              case 44:
                _context.t2 = _context.sent;

                _context.t1.push.call(_context.t1, _context.t2);

              case 46:
                _iteratorNormalCompletion4 = true;
                _context.next = 38;
                break;

              case 49:
                _context.next = 55;
                break;

              case 51:
                _context.prev = 51;
                _context.t3 = _context["catch"](36);
                _didIteratorError4 = true;
                _iteratorError4 = _context.t3;

              case 55:
                _context.prev = 55;
                _context.prev = 56;

                if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                  _iterator4["return"]();
                }

              case 58:
                _context.prev = 58;

                if (!_didIteratorError4) {
                  _context.next = 61;
                  break;
                }

                throw _iteratorError4;

              case 61:
                return _context.finish(58);

              case 62:
                return _context.finish(55);

              case 63:
                _i++;
                _context.next = 8;
                break;

              case 66:
                // Add sync and async group validators
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 69;

                for (_iterator = this._settings.groupValidators[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  groupValidator = _step.value;

                  if (Object(_utils__WEBPACK_IMPORTED_MODULE_7__["isIntersection"])(groupValidator.fields, fields)) {
                    groupValidator.fn(record, errors);
                  }
                }

                _context.next = 77;
                break;

              case 73:
                _context.prev = 73;
                _context.t4 = _context["catch"](69);
                _didIteratorError = true;
                _iteratorError = _context.t4;

              case 77:
                _context.prev = 77;
                _context.prev = 78;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 80:
                _context.prev = 80;

                if (!_didIteratorError) {
                  _context.next = 83;
                  break;
                }

                throw _iteratorError;

              case 83:
                return _context.finish(80);

              case 84:
                return _context.finish(77);

              case 85:
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context.prev = 88;
                _iterator2 = this._settings.asyncGroupValidators[Symbol.iterator]();

              case 90:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context.next = 102;
                  break;
                }

                asyncGroupValidator = _step2.value;

                if (!Object(_utils__WEBPACK_IMPORTED_MODULE_7__["isIntersection"])(asyncGroupValidator.fields, fields)) {
                  _context.next = 99;
                  break;
                }

                awaitStack.push(null);
                _context.t5 = promises;
                _context.next = 97;
                return asyncGroupValidator.fn(record, errors);

              case 97:
                _context.t6 = _context.sent;

                _context.t5.push.call(_context.t5, _context.t6);

              case 99:
                _iteratorNormalCompletion2 = true;
                _context.next = 90;
                break;

              case 102:
                _context.next = 108;
                break;

              case 104:
                _context.prev = 104;
                _context.t7 = _context["catch"](88);
                _didIteratorError2 = true;
                _iteratorError2 = _context.t7;

              case 108:
                _context.prev = 108;
                _context.prev = 109;

                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }

              case 111:
                _context.prev = 111;

                if (!_didIteratorError2) {
                  _context.next = 114;
                  break;
                }

                throw _iteratorError2;

              case 114:
                return _context.finish(111);

              case 115:
                return _context.finish(108);

              case 116:
                _context.next = 118;
                return Promise.all(promises);

              case 118:
                asyncErrors = _context.sent;

                while (asyncErrors.length) {
                  error = asyncErrors.pop();
                  field = awaitStack.pop();

                  if (error && field) {
                    errors.add(field, error);
                  }
                }

                return _context.abrupt("return", errors);

              case 121:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[15, 19, 23, 31], [24,, 26, 30], [36, 51, 55, 63], [56,, 58, 62], [69, 73, 77, 85], [78,, 80, 84], [88, 104, 108, 116], [109,, 111, 115]]);
      }));

      function isValidRecord(_x) {
        return _isValidRecord.apply(this, arguments);
      }

      return isValidRecord;
    }()
  }], [{
    key: "create",
    value: function create() {
      return new Validator();
    }
  }]);

  return Validator;
}();

/* harmony default export */ __webpack_exports__["default"] = (Validator);

/***/ }),

/***/ "./src/common/validation/rules/boolean.js":
/*!************************************************!*\
  !*** ./src/common/validation/rules/boolean.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/common/utils.js");
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


function baseValidator(notNull, error, value) {
  error = error || 'Not boolean';

  if (!Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(value)) {
    if (notNull) {
      return error;
    }

    return;
  }

  if (typeof value !== 'boolean') {
    return error;
  }
}
/**
 * Create boolean validator
 *
 * @param {string} error Error message
 * @returns {Function} Validator
 */


var validator = function validator(error) {
  return baseValidator.bind(null, false, error);
};

validator.notNull = function (error) {
  return baseValidator.bind(null, true, error);
};

/* harmony default export */ __webpack_exports__["default"] = (validator);

/***/ }),

/***/ "./src/common/validation/rules/date.js":
/*!*********************************************!*\
  !*** ./src/common/validation/rules/date.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "@babel/runtime/helpers/typeof");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ "./src/common/utils.js");


/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


function baseValidator(notNull, min, max, error, value) {
  error = error || 'Invalid date';

  if (!Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(value)) {
    if (notNull) {
      return error;
    }

    return;
  }

  var typeOfValue = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(value);

  if (typeOfValue !== 'number' && typeOfValue !== 'string' && !(value instanceof Date)) {
    return error;
  }

  value = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["toDate"])(value);

  if (isNaN(value)) {
    return error;
  }

  if (min && Object(_utils__WEBPACK_IMPORTED_MODULE_1__["toDate"])(min) > value) {
    return error;
  }

  if (max && Object(_utils__WEBPACK_IMPORTED_MODULE_1__["toDate"])(max) < value) {
    return error;
  }
}
/**
 * Create date validator
 *
 * @param {Date}    [min]   Min date
 * @param {Date}    [max]   Max date
 * @param {string}  error   Error message
 * @returns {Function} Validator
 */


var validator = function validator(min, max, error) {
  return baseValidator.bind(null, false, min, max, error);
};

validator.notNull = function (min, max, error) {
  return baseValidator.bind(null, true, min, max, error);
};

/* harmony default export */ __webpack_exports__["default"] = (validator);

/***/ }),

/***/ "./src/common/validation/rules/enum.js":
/*!*********************************************!*\
  !*** ./src/common/validation/rules/enum.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/common/utils.js");
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


function baseValidator(notNull, variants, error, value) {
  error = error || 'Not in variants';

  if (!Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(value)) {
    if (notNull) {
      return error;
    }

    return;
  }

  if (variants.indexOf(value) < 0) {
    return error;
  }
}
/**
 * Create enum validator
 *
 * @param variants
 * @param {string} error Error message
 * @returns {Function}
 */


var validator = function validator(variants, error) {
  return baseValidator.bind(null, false, variants, error);
};

validator.notNull = function (variants, error) {
  return baseValidator.bind(null, true, variants, error);
};

/* harmony default export */ __webpack_exports__["default"] = (validator);

/***/ }),

/***/ "./src/common/validation/rules/float.js":
/*!**********************************************!*\
  !*** ./src/common/validation/rules/float.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/common/utils.js");
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


function baseValidator(notNull, min, max, error, value) {
  error = error || 'Invalid float';

  if (!Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(value)) {
    if (notNull) {
      return error;
    }

    return;
  }

  if (typeof value !== 'number' || isNaN(value) || !isFinite(value) || typeof min === 'number' && value < min || typeof max === 'number' && value > max) {
    return error;
  }
}
/**
 * Create float validator
 *
 * @param min
 * @param max
 * @param {string} error Error message
 * @returns {Function}
 */


var validator = function validator(min, max, error) {
  return baseValidator.bind(null, false, min, max, error);
};

validator.notNull = function (min, max, error) {
  return baseValidator.bind(null, true, min, max, error);
};

/* harmony default export */ __webpack_exports__["default"] = (validator);

/***/ }),

/***/ "./src/common/validation/rules/notEmpty.js":
/*!*************************************************!*\
  !*** ./src/common/validation/rules/notEmpty.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/common/utils.js");
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Check if value is not empty string, array and object. Not null, undefined, 0
 *
 * @param {string} [error="Can not be empty"] Error message
 * @returns {Function}
 */

/* harmony default export */ __webpack_exports__["default"] = (function (error) {
  error = error || 'Can not be empty';
  return function (value) {
    if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isEmpty"])(value) || typeof value === 'number' && (isNaN(value) || !isFinite(value))) {
      return error;
    }
  };
});

/***/ }),

/***/ "./src/common/validation/rules/notNull.js":
/*!************************************************!*\
  !*** ./src/common/validation/rules/notNull.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/common/utils.js");
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Create NULL validator
 *
 * @param {string} [error = "Can not be empty"] Error message
 * @returns {Function}
 */

/* harmony default export */ __webpack_exports__["default"] = (function (error) {
  error = error || 'Can not be empty';
  return function (value) {
    if (!Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(value) || value === '' || typeof value === 'number' && (isNaN(value) || !isFinite(value))) {
      return error;
    }
  };
});

/***/ }),

/***/ "./src/common/validation/rules/number.js":
/*!***********************************************!*\
  !*** ./src/common/validation/rules/number.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/common/utils.js");
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


function baseValidator(notNull, min, max, error, value) {
  error = error || 'Invalid number';

  if (!Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(value)) {
    if (notNull) {
      return error;
    }

    return;
  }

  if (typeof value !== 'number' || isNaN(value) || parseInt(value, 10).toString() !== value.toString() || typeof min === 'number' && value < min || typeof max === 'number' && value > max) {
    return error;
  }
}
/**
 * Create range Number validator
 *
 * @param min
 * @param max
 * @param {string} error Error message
 * @returns {Function}
 */


var validator = function validator(min, max, error) {
  return baseValidator.bind(null, false, min, max, error);
};

validator.notNull = function (min, max, error) {
  return baseValidator.bind(null, true, min, max, error);
};

/* harmony default export */ __webpack_exports__["default"] = (validator);

/***/ }),

/***/ "./src/common/validation/rules/regExp.js":
/*!***********************************************!*\
  !*** ./src/common/validation/rules/regExp.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/common/utils.js");
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


function baseValidator(notNull, regExp, error, value) {
  error = error || 'Invalid value';

  if (!Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(value) || value === '') {
    if (notNull) {
      return error;
    }

    return;
  }

  if (typeof value !== 'string' || !regExp.test(value)) {
    return error;
  }
}
/**
 * Create RegEx validator
 *
 * @param regExp
 * @param {string} error Error message
 * @returns {Function}
 */


var validator = function validator(regExp, error) {
  return baseValidator.bind(null, false, regExp, error);
};

validator.notNull = function (regExp, error) {
  return baseValidator.bind(null, true, regExp, error);
};

/* harmony default export */ __webpack_exports__["default"] = (validator);

/***/ }),

/***/ "./src/common/validation/rules/set.js":
/*!********************************************!*\
  !*** ./src/common/validation/rules/set.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/common/utils.js");
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


function baseValidator(notNull, variants, error, values) {
  error = error || 'Not in variants';

  if (!Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(values) || !values.length) {
    if (notNull) {
      return error;
    }

    return;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      if (variants.indexOf(value) < 0) {
        return error;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}
/**
 * Create set validator
 *
 * @param variants
 * @param {string} error Error message
 * @returns {Function}
 */


var validator = function validator(variants, error) {
  return baseValidator.bind(null, false, variants, error);
};

validator.notNull = function (variants, error) {
  return baseValidator.bind(null, true, variants, error);
};

/* harmony default export */ __webpack_exports__["default"] = (validator);

/***/ }),

/***/ "./src/common/variables.js":
/*!*********************************!*\
  !*** ./src/common/variables.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var variables = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  get: function get(key) {
    return variables[key];
  },
  set: function set(key, value) {
    variables[key] = value;
  }
});

/***/ }),

/***/ "./src/editors/Checkbox.js":
/*!*********************************!*\
  !*** ./src/editors/Checkbox.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "@babel/runtime/helpers/objectWithoutProperties");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);



/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */



function Checkbox(props) {
  var indeterminate = props.indeterminate,
      otherProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(props, ["indeterminate"]);

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, otherProps, {
    type: "checkbox",
    ref: function ref(input) {
      if (input) {
        input.indeterminate = indeterminate;
      }
    }
  }));
}

Checkbox.propTypes = {
  indeterminate: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool
};
/* harmony default export */ __webpack_exports__["default"] = (Checkbox);

/***/ }),

/***/ "./src/editors/DatePicker.js":
/*!***********************************!*\
  !*** ./src/editors/DatePicker.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-datepicker */ "react-datepicker");
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_datepicker__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../common/utils */ "./src/common/utils.js");








/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */






var DatePickerEditor =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(DatePickerEditor, _React$Component);

  function DatePickerEditor() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, DatePickerEditor);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(DatePickerEditor).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(DatePickerEditor, [{
    key: "onChange",
    value: function onChange(date) {
      if (date) {
        date = date.format(this.props.format);
      }

      this.props.onChange(date);
    }
  }, {
    key: "render",
    value: function render() {
      var otherProps = Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["omit"])(this.props, ['textFormat', 'value', 'onChange', 'min', 'max']);
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_datepicker__WEBPACK_IMPORTED_MODULE_8___default.a, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, otherProps, {
        dateFormat: this.props.textFormat,
        selected: this.props.value && moment__WEBPACK_IMPORTED_MODULE_9___default()(this.props.value),
        onChange: this.onChange.bind(this),
        minDate: this.props.min && moment__WEBPACK_IMPORTED_MODULE_9___default()(this.props.min),
        maxDate: this.props.max && moment__WEBPACK_IMPORTED_MODULE_9___default()(this.props.max),
        todayButton: 'Today'
      }));
    }
  }]);

  return DatePickerEditor;
}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(DatePickerEditor, "propTypes", {
  format: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string,
  textFormat: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string,
  min: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.any,
  max: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.any,
  value: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.any,
  show: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.bool,
  onBlur: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.func,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.func.isRequired
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(DatePickerEditor, "defaultProps", {
  textFormat: 'YYYY-MM-DD'
});

/* harmony default export */ __webpack_exports__["default"] = (DatePickerEditor);

/***/ }),

/***/ "./src/editors/Number.js":
/*!*******************************!*\
  !*** ./src/editors/Number.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _common_validation_rules_float__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/validation/rules/float */ "./src/common/validation/rules/float.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/utils */ "./src/common/utils.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);








/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */





var isInvalidFloat = Object(_common_validation_rules_float__WEBPACK_IMPORTED_MODULE_7__["default"])(null, null, true);

var NumberEditor =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(NumberEditor, _React$Component);

  function NumberEditor(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, NumberEditor);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(NumberEditor).call(this, props));
    _this.state = {
      value: props.value
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(NumberEditor, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!Object(_common_utils__WEBPACK_IMPORTED_MODULE_8__["isEqual"])(this.state.value, nextProps.value)) {
        Object(react_dom__WEBPACK_IMPORTED_MODULE_9__["findDOMNode"])(this.input).value = this.state.value = nextProps.value;
      }
    }
  }, {
    key: "_onChangeHandler",
    value: function _onChangeHandler(e) {
      var target = e.target;
      var valueAsNumber = parseFloat(target.value); // Edge doesn't support "target.valueAsNumber"

      if (target.value === '' && target.validity.valid) {
        // Invalid number set empty string and valid=false to event
        this.state.value = null;
      } else if (isInvalidFloat(valueAsNumber)) {
        this.state.value = '';
      } else {
        this.state.value = valueAsNumber;
      }

      this.props.onChange(this.state.value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("input", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        step: "any"
      }, Object(_common_utils__WEBPACK_IMPORTED_MODULE_8__["omit"])(this.props, 'value'), {
        type: "number",
        ref: function ref(input) {
          return _this2.input = input;
        },
        onChange: this._onChangeHandler.bind(this),
        defaultValue: this.props.value
      }));
    }
  }]);

  return NumberEditor;
}(react__WEBPACK_IMPORTED_MODULE_10___default.a.Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(NumberEditor, "propTypes", {
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func.isRequired,
  value: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.number, // String should be allowed, because when we start typing negative number,
  // there is appearing a warning in console after '-' symbol
  prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string])
});

/* harmony default export */ __webpack_exports__["default"] = (NumberEditor);

/***/ }),

/***/ "./src/editors/Select.js":
/*!*******************************!*\
  !*** ./src/editors/Select.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/utils */ "./src/common/utils.js");








/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */




var SelectEditor =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(SelectEditor, _React$Component);

  function SelectEditor(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, SelectEditor);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(SelectEditor).call(this, props));
    _this.state = {
      options: props.options,
      loading: Boolean(props.model)
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(SelectEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.model) {
        this.props.model.read('').then(function (data) {
          data.unshift([null, '']);

          _this2.setState({
            options: data,
            loading: false
          });
        })["catch"](function (err) {
          console.error(err);
        });
      }
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return this.props.model ? this.state.options : this.props.options;
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var option = this.getOptions()[e.target.value];

      if (!(option instanceof Array)) {
        option = [option, option];
      }

      this.props.onChange(option[0]);

      if (this.props.onLabelChange) {
        this.props.onLabelChange(option[1]);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var options = this.getOptions();
      var valueIndex = Object(_common_utils__WEBPACK_IMPORTED_MODULE_9__["findIndex"])(options, function (option) {
        return Object(_common_utils__WEBPACK_IMPORTED_MODULE_9__["isEqual"])(option instanceof Array ? option[0] : option, _this3.props.value);
      });
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("select", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, Object(_common_utils__WEBPACK_IMPORTED_MODULE_9__["omit"])(this.props, ['value', 'options']), {
        value: valueIndex,
        onChange: this.handleChange.bind(this),
        disabled: this.props.disabled || this.state.loading
      }), options.map(function (item, index) {
        var optionProps = item instanceof Array && item[2] instanceof Object ? item[2] : {};
        return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("option", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
          key: index,
          value: index
        }, optionProps), item instanceof Array ? item[1] : item);
      }));
    }
  }]);

  return SelectEditor;
}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(SelectEditor, "propTypes", {
  options: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.array,
  // shape: [[value, label, props], ...] or [label1, label2, ...]
  //                           `props` will be passed to each corresponding <option />
  model: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.shape({
    read: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func
  }),
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func.isRequired,
  onLabelChange: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func,
  value: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.any
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(SelectEditor, "defaultProps", {
  options: []
});

/* harmony default export */ __webpack_exports__["default"] = (SelectEditor);

/***/ }),

/***/ "./src/editors/SuggestBox.js":
/*!***********************************!*\
  !*** ./src/editors/SuggestBox.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "@babel/runtime/helpers/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _common_toPromise__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../common/toPromise */ "./src/common/toPromise.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../common/utils */ "./src/common/utils.js");
/* harmony import */ var _common_Portal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../common/Portal */ "./src/common/Portal.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _common_ThrottleError__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../common/ThrottleError */ "./src/common/ThrottleError.js");











/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */







var popupId = '__suggestBoxPopUp';
var classes = {
  option: '__suggestBoxPopUp-option',
  optionFocused: '__suggestBoxPopUp-option-focused',
  optionSelectable: '__suggestBoxPopUp-option-selectable',
  optionTypes: {
    group: '__suggestBoxPopUp-option-group',
    header: '__suggestBoxPopUp-option-header',
    subitem: '__suggestBoxPopUp-option-subitem',
    empty: '__suggestBoxPopUp-option-empty'
  },
  searchBlock: '__suggestBox-search',
  selectBtn: '__suggestBox-select-btn',
  arrow: '__suggestBox-arrow',
  up: '__suggestBox-up'
};
var TAB_KEY = 9;
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;
var ARROW_UP_KEY = 38;
var ARROW_DOWN_KEY = 40;
var MIN_POPUP_HEIGHT = 100;

var SuggestBoxEditor =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default()(SuggestBoxEditor, _React$Component);

  function SuggestBoxEditor(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, SuggestBoxEditor);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(SuggestBoxEditor).call(this, props));
    _this._loadData = Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["throttle"])(_this._loadData);
    _this.state = {
      isOpened: false,
      options: [],
      selectedOptionKey: null,
      lastValidLabel: '',
      label: '',
      popupStyles: {}
    };
    _this._onInputFocus = _this._onInputFocus.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this));
    _this._onInputKeyDown = _this._onInputKeyDown.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this));
    _this._onInputValueChange = _this._onInputValueChange.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this));
    _this._focusOption = _this._focusOption.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this));
    _this._onDocumentMouseDown = _this._onDocumentMouseDown.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this));
    _this._onDocumentMouseScroll = _this._onDocumentMouseScroll.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this));
    _this._toggleList = _this._toggleList.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this));
    _this._openList = _this._openList.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(SuggestBoxEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;

      if (this.props.defaultLabel) {
        this._setLabelTo(this.props.defaultLabel, true);
      } else if (this.props.hasOwnProperty('label')) {
        this._setLabelTo(this.props.label, true);
      } else {
        this._getLabelFromModel(this.props.model, this.props.value);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.state !== nextState || !Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["isEqual"])(this.props.value, nextProps.value) || this.props.disabled !== nextProps.disabled;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["isEqual"])(this.props.value, nextProps.value)) {
        if (!this.props.hasOwnProperty('label')) {
          this._getLabelFromModel(nextProps.model, nextProps.value);
        }
      }

      if (this.props.label !== nextProps.label) {
        this._setLabelTo(nextProps.label, true);
      }
    }
  }, {
    key: "_getOptionLabel",
    value: function _getOptionLabel(option) {
      return Array.isArray(option.label) ? option.label[option.label.length - 1] : option.label;
    }
  }, {
    key: "_setLabelTo",
    value: function _setLabelTo(label, markAsValid) {
      if (label === null || label === undefined) {
        label = '';
      }

      this.setState({
        label: label,
        lastValidLabel: markAsValid ? label : this.state.lastValidLabel
      });
    }
  }, {
    key: "_getLabelFromModel",
    value: function _getLabelFromModel(model, id) {
      var _this2 = this;

      if (id === null || id === undefined) {
        return this._setLabelTo('', true);
      }

      model.getLabel(id).then(function (label) {
        if (!_this2._isMounted) {
          return;
        }

        _this2._setLabelTo(label, true);
      })["catch"](function (err) {
        if (err) {
          console.error(err);
          throw err;
        }
      });
    }
  }, {
    key: "_updateList",
    value: function () {
      var _updateList2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(searchPattern) {
        var options, content;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this._loadData(searchPattern);

              case 3:
                options = _context.sent;
                _context.next = 11;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);

                if (_context.t0 instanceof _common_ThrottleError__WEBPACK_IMPORTED_MODULE_16__["default"]) {
                  _context.next = 10;
                  break;
                }

                throw _context.t0;

              case 10:
                return _context.abrupt("return");

              case 11:
                if (options.length && this.props.withEmptyOption) {
                  options.unshift({
                    id: null,
                    label: "\xA0" // Use this symbol for save line height

                  });
                }

                if (!this._isMounted) {
                  _context.next = 15;
                  break;
                }

                _context.next = 15;
                return this.setState({
                  options: options,
                  selectedOptionKey: null,
                  loading: false
                });

              case 15:
                content = document.querySelector("".concat(popupId, " .__suggestBoxPopUp-content"));

                if (content) {
                  content.style = {
                    bottom: 'auto',
                    position: 'static'
                  };
                }

                this._scrollListTo();

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      function _updateList(_x) {
        return _updateList2.apply(this, arguments);
      }

      return _updateList;
    }()
  }, {
    key: "_loadData",
    value: function _loadData(searchPattern) {
      return this.props.model.read(searchPattern || '');
    }
  }, {
    key: "_openList",
    value: function () {
      var _openList2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(searchPattern) {
        var _this3 = this;

        var focusFirstOption,
            popupStyles,
            key,
            selectedOptionKey,
            _args2 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                focusFirstOption = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;

                if (!(this.props.disabled || this.state.isOpened)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return");

              case 3:
                popupStyles = this._getComputedPopupStyles();

                if (popupStyles) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return");

              case 6:
                _context2.next = 8;
                return Object(_common_toPromise__WEBPACK_IMPORTED_MODULE_10__["default"])(this.setState.bind(this), true)({
                  isOpened: true,
                  loading: true,
                  popupStyles: popupStyles
                });

              case 8:
                Object(react_dom__WEBPACK_IMPORTED_MODULE_13__["findDOMNode"])(this.input).select();
                _context2.next = 11;
                return this._updateList(searchPattern);

              case 11:
                if (this.state.options.length) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return");

              case 13:
                if (!focusFirstOption) {
                  _context2.next = 18;
                  break;
                }

                key = this.state.options[0].type !== 'group' ? 0 : 1;
                _context2.next = 17;
                return this._focusOption(key, true);

              case 17:
                return _context2.abrupt("return");

              case 18:
                selectedOptionKey = Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["findIndex"])(this.state.options, function (option) {
                  return Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["isEqual"])(option.id, _this3.props.value);
                });

                if (selectedOptionKey !== -1) {
                  this._focusOptionAndScrollIntoView(Number(selectedOptionKey));
                }

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _openList(_x2) {
        return _openList2.apply(this, arguments);
      }

      return _openList;
    }()
  }, {
    key: "_onInputFocus",
    value: function () {
      var _onInputFocus2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(e) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._openList();

              case 2:
                if (this._isMounted) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return");

              case 4:
                Object(react_dom__WEBPACK_IMPORTED_MODULE_13__["findDOMNode"])(this.input).select();

                if (this.props.onFocus) {
                  this.props.onFocus(e);
                }

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _onInputFocus(_x3) {
        return _onInputFocus2.apply(this, arguments);
      }

      return _onInputFocus;
    }()
  }, {
    key: "_closeList",
    value: function _closeList(shouldBlur) {
      if (shouldBlur) {
        Object(react_dom__WEBPACK_IMPORTED_MODULE_13__["findDOMNode"])(this.input).blur();
      }

      if (!this.state.isOpened || !this._isMounted) {
        return;
      }

      this.setState({
        options: [],
        selectedOptionKey: null,
        isOpened: false
      });
    }
  }, {
    key: "_toggleList",
    value: function () {
      var _toggleList2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee4() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.state.isOpened) {
                  _context4.next = 4;
                  break;
                }

                this._closeList();

                _context4.next = 6;
                break;

              case 4:
                _context4.next = 6;
                return this._openList();

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _toggleList() {
        return _toggleList2.apply(this, arguments);
      }

      return _toggleList;
    }()
  }, {
    key: "_selectOption",
    value: function _selectOption(option) {
      option = option || {
        id: null,
        label: '',
        metadata: {}
      };
      this.props.onChange(option.id, option);

      if (this.props.onLabelChange) {
        this.props.onLabelChange(option.label);
      }

      if (this.props.onMetadataChange) {
        this.props.onMetadataChange(option.metadata);
      }

      Object(react_dom__WEBPACK_IMPORTED_MODULE_13__["findDOMNode"])(this.input).select();
    }
  }, {
    key: "_focusOption",
    value: function () {
      var _focusOption2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee5(key, shouldSetLabel) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (shouldSetLabel === true) {
                  this._setLabelTo(this.state.options[key].label);
                }

                if (!this.state.isOpened) {
                  _context5.next = 5;
                  break;
                }

                this._focusOptionAndScrollIntoView(key);

                _context5.next = 8;
                break;

              case 5:
                _context5.next = 7;
                return this._openList(null);

              case 7:
                this._focusOptionAndScrollIntoView(key);

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _focusOption(_x4, _x5) {
        return _focusOption2.apply(this, arguments);
      }

      return _focusOption;
    }()
  }, {
    key: "_focusOptionAndScrollIntoView",
    value: function _focusOptionAndScrollIntoView(key) {
      this.state.selectedOptionKey = key;
      var focusedItems = document.querySelector(".".concat(classes.optionFocused));
      var currentItem = document.querySelector(".".concat(classes.option, "[data-key=\"").concat(key, "\"]"));

      if (focusedItems) {
        focusedItems.classList.remove(classes.optionFocused);
      }

      if (currentItem) {
        currentItem.classList.add(classes.optionFocused);
      }

      var domOption = document.querySelectorAll("#".concat(popupId, " li[data-key=\"").concat(key, "\"]"))[0];

      this._scrollListTo(domOption);
    }
  }, {
    key: "_focusNextOption",
    value: function _focusNextOption() {
      if (!this.state.options.length) {
        return;
      }

      if (this.state.selectedOptionKey === null) {
        this.state.selectedOptionKey = 0;
        return this._focusOption(this.state.selectedOptionKey, true);
      }

      var key;

      for (key = this.state.selectedOptionKey + 1; key < this.state.options.length; key++) {
        if (this.state.options[key].id) {
          return this._focusOption(key, true);
        }
      }

      for (key = 0; key < this.state.selectedOptionKey + 1; key++) {
        if (this.state.options[key].id) {
          return this._focusOption(key, true);
        }
      }
    }
  }, {
    key: "_focusPrevOption",
    value: function _focusPrevOption() {
      if (this.state.selectedOptionKey === null) {
        this.state.selectedOptionKey = 0;
        return this._focusOption(this.state.selectedOptionKey);
      }

      var key;

      for (key = this.state.selectedOptionKey - 1; key >= 0; key--) {
        if (this.state.options[key].id) {
          return this._focusOption(key, true);
        }
      }

      for (key = this.state.options.length - 1; key > this.state.selectedOptionKey - 1; key--) {
        if (this.state.options[key].id) {
          return this._focusOption(key, true);
        }
      }
    }
  }, {
    key: "_scrollListTo",
    value: function _scrollListTo(target) {
      var container = document.querySelector("#".concat(popupId, ":first-child"));

      if (!container) {
        return;
      }

      if (!target) {
        container.scrollTop = 0;
        return;
      }

      if (target.offsetTop - container.scrollTop >= container.clientHeight - target.clientHeight) {
        container.scrollTop = target.offsetTop - container.clientHeight + target.clientHeight;
      } else if (target.offsetTop - container.scrollTop < 0) {
        container.scrollTop = target.offsetTop;
      }
    }
  }, {
    key: "_isParentOf",
    value: function _isParentOf(child) {
      while (child) {
        child = child.parentNode;

        if (child === Object(react_dom__WEBPACK_IMPORTED_MODULE_13__["findDOMNode"])(this)) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "_onDocumentMouseDown",
    value: function _onDocumentMouseDown(e, isOwner) {
      if (e.button !== 0) {
        return;
      }

      var target = e.target;

      if (isOwner) {
        if (!target.classList.contains(classes.option)) {
          target = target.parentNode;
        }

        if (target.classList.contains(classes.optionSelectable) && this.state.isOpened) {
          this._selectOption(this.state.options[target.getAttribute('data-key')]);

          this._closeList(true);
        }
      } else {
        // q where to test
        if (!Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["parents"])(target, ".".concat(classes.searchBlock)).length) {
          if (!Object(react_dom__WEBPACK_IMPORTED_MODULE_13__["findDOMNode"])(this.input).value) {
            this._selectOption(null);
          } else {
            this._setLabelTo(this.state.lastValidLabel);
          }
        }

        if (!this._isParentOf(e.target)) {
          this._closeList(true);
        }
      }
    }
  }, {
    key: "_onDocumentMouseScroll",
    value: function _onDocumentMouseScroll(e, isOwner) {
      if (!isOwner && this.state.isOpened) {
        var popupStyles = this._getComputedPopupStyles();

        if (popupStyles) {
          this.setState({
            popupStyles: this._getComputedPopupStyles()
          });
        } else {
          this._setLabelTo(this.state.lastValidLabel);

          this._closeList(true);
        }
      }
    }
  }, {
    key: "_onInputKeyDown",
    value: function _onInputKeyDown(e) {
      if (this.props.disabled) {
        return;
      }

      switch (e.keyCode) {
        case ARROW_DOWN_KEY:
          e.preventDefault();

          if (!this.state.isOpened) {
            return this._openList('', true);
          }

          this._focusNextOption();

          break;

        case ARROW_UP_KEY:
          e.preventDefault();

          if (!this.state.isOpened) {
            return this._openList();
          }

          this._focusPrevOption();

          break;

        case ENTER_KEY:
          e.preventDefault();

          if (this.state.selectedOptionKey === null) {
            this._selectOption(null);
          } else {
            this._selectOption(this.state.options[this.state.selectedOptionKey]);
          }

          this._closeList();

          break;

        case TAB_KEY:
        case ESCAPE_KEY:
          if (e.keyCode === ESCAPE_KEY) {
            e.preventDefault();
          }

          if (!e.target.value || !this.props.value) {
            this._setLabelTo('');

            this._selectOption(null);
          } else {
            this._setLabelTo(this.state.lastValidLabel);
          }

          this._closeList();

          break;
      }
    }
  }, {
    key: "_onInputValueChange",
    value: function () {
      var _onInputValueChange2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee6(e) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this._setLabelTo(e.target.value);

                if (!this.state.isOpened) {
                  _context6.next = 6;
                  break;
                }

                _context6.next = 4;
                return this._updateList(e.target.value);

              case 4:
                _context6.next = 8;
                break;

              case 6:
                _context6.next = 8;
                return this._openList(e.target.value);

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _onInputValueChange(_x6) {
        return _onInputValueChange2.apply(this, arguments);
      }

      return _onInputValueChange;
    }()
  }, {
    key: "_getComputedPopupStyles",
    value: function _getComputedPopupStyles() {
      var inputStyles = window.getComputedStyle(Object(react_dom__WEBPACK_IMPORTED_MODULE_13__["findDOMNode"])(this.input));
      var popupStyle = {};
      var inputOffset = Object(react_dom__WEBPACK_IMPORTED_MODULE_13__["findDOMNode"])(this.input).getBoundingClientRect();
      var inputWidth = inputStyles.width;
      var inputHeight = parseInt(inputStyles.height);

      if (inputOffset.top + inputHeight <= 0 || inputOffset.top >= window.innerHeight) {
        return null;
      }

      var offsetTop = inputOffset.top + inputHeight;
      var offsetLeft = inputOffset.left;

      if (typeof window !== 'undefined') {
        var availableSpace = window.innerHeight - offsetTop;

        if (availableSpace < MIN_POPUP_HEIGHT) {
          popupStyle.maxHeight = inputOffset.top;
          popupStyle.bottom = -inputOffset.top;
        } else {
          popupStyle.maxHeight = availableSpace;
          popupStyle.top = offsetTop;
        }
      }

      popupStyle.minWidth = inputWidth;
      popupStyle.left = offsetLeft;
      return popupStyle;
    }
  }, {
    key: "focus",
    value: function focus() {
      Object(react_dom__WEBPACK_IMPORTED_MODULE_13__["findDOMNode"])(this.input).focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var arrowClasses = [classes.arrow];
      var options;
      var optionsPopup = null;

      if (this.state.isOpened) {
        arrowClasses.push(classes.up);

        if (this.state.loading) {
          options = react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("li", {
            className: [classes.option, classes.optionTypes.empty].join(' ')
          }, this.props.loadingElement);
        } else {
          if (!this.state.options.length) {
            options = react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("li", {
              className: [classes.option, classes.optionTypes.empty].join(' ')
            }, this.props.notFoundElement);
          } else {
            options = this.state.options.map(function (option, key) {
              var optionClassNames = [classes.option];

              if (key === _this4.state.selectedOptionKey) {
                optionClassNames.push(classes.optionFocused);
              }

              if (option.id !== undefined) {
                optionClassNames.push(classes.optionSelectable);
              }

              if (option.type) {
                optionClassNames.push(classes.optionTypes[option.type] || option.type);
              }

              return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("li", {
                key: key,
                "data-key": key,
                onMouseOver: _this4._focusOption.bind(_this4, key),
                className: optionClassNames.join(' ')
              }, Array.isArray(option.label) ? option.label.map(function (label, columnKey) {
                return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
                  key: columnKey
                }, label);
              }) : react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", null, option.label));
            });
          }
        }

        optionsPopup = react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_common_Portal__WEBPACK_IMPORTED_MODULE_12__["default"], {
          id: popupId,
          style: this.state.popupStyles,
          onDocumentMouseDown: this._onDocumentMouseDown,
          onDocumentMouseScroll: this._onDocumentMouseScroll,
          className: "__suggestBoxPopUp"
        }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
          className: "__suggestBoxPopUp-content"
        }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("ul", null, options)));
      }

      return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        className: "__suggestBox"
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        className: classes.searchBlock
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("input", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["omit"])(this.props, ['model', 'value', 'onChange', 'onLabelChange', 'onFocus', 'select', 'notFoundElement', 'loadingElement', 'defaultLabel', 'onMetadataChange', 'withEmptyOption']), {
        ref: function ref(input) {
          return _this4.input = input;
        },
        type: "text",
        onClick: this._openList,
        onFocus: this._onInputFocus,
        onKeyDown: this._onInputKeyDown,
        onChange: this._onInputValueChange,
        value: this.state.label
      })), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        onClick: this._toggleList,
        className: classes.selectBtn
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        className: arrowClasses.join(' ')
      }))), optionsPopup);
    }
  }]);

  return SuggestBoxEditor;
}(react__WEBPACK_IMPORTED_MODULE_14___default.a.Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(SuggestBoxEditor, "propTypes", {
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.bool,
  model: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.shape({
    read: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.func,
    getLabel: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.func
  }),
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.func.isRequired,
  onLabelChange: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.func,
  onMetadataChange: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.func,
  value: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.any,
  defaultLabel: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.string,
  label: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.string,
  notFoundElement: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.element,
  loadingElement: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.element,
  onFocus: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.func,
  withEmptyOption: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.bool
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(SuggestBoxEditor, "defaultProps", {
  disabled: false,
  notFoundElement: react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", null, "Nothing found"),
  loadingElement: react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", null, "Loading..."),
  value: null,
  withEmptyOption: false
});

/* harmony default export */ __webpack_exports__["default"] = (SuggestBoxEditor);

/***/ }),

/***/ "./src/form/AbstractFormModel.js":
/*!***************************************!*\
  !*** ./src/form/AbstractFormModel.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/validation/ValidationErrors */ "./src/common/validation/ValidationErrors.js");
/* harmony import */ var _common_Events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/Events */ "./src/common/Events.js");






/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */



var AbstractFormModel =
/*#__PURE__*/
function (_EventsModel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(AbstractFormModel, _EventsModel);

  /**
   * Abstract form model
   *
   * @constructor
   */
  function AbstractFormModel() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AbstractFormModel);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(AbstractFormModel).call(this));
  }
  /**
   * Get data
   *
   * @param {Array} fields     Required fields
   * @returns {Object}  Promise
   * @abstract
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AbstractFormModel, [{
    key: "getData",
    value: function getData()
    /*fields*/
    {
      return Promise.resolve({});
    }
    /**
     * Process form data
     *
     * @param   {Object}      changes     Form data
     * @returns {Object}  Promise
     * @abstract
     */

  }, {
    key: "submit",
    value: function submit()
    /*changes*/
    {
      return Promise.resolve();
    }
    /**
     * Record validity check
     *
     * @param {Object}      record  Record object
     * @returns {Object}  Promise
     * @abstract
     */

  }, {
    key: "isValidRecord",
    value: function isValidRecord()
    /*record*/
    {
      return Promise.resolve(new _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_5__["default"]());
    }
    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {Array}  fields  Fields list
     * @returns {Array}  Dependencies
     * @abstract
     */

  }, {
    key: "getValidationDependency",
    value: function getValidationDependency()
    /*fields*/
    {
      return [];
    }
  }]);

  return AbstractFormModel;
}(_common_Events__WEBPACK_IMPORTED_MODULE_6__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (AbstractFormModel);

/***/ }),

/***/ "./src/form/FormExpressApi.js":
/*!************************************!*\
  !*** ./src/form/FormExpressApi.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/validation/ValidationErrors */ "./src/common/validation/ValidationErrors.js");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/utils */ "./src/common/utils.js");





/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */




var FormExpressApi =
/*#__PURE__*/
function () {
  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(FormExpressApi, null, [{
    key: "create",
    value: function create() {
      return new FormExpressApi();
    }
  }]);

  function FormExpressApi() {
    var _this = this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, FormExpressApi);

    this.middlewares = {
      getData: [Object(_common_utils__WEBPACK_IMPORTED_MODULE_6__["asyncHandler"])(
      /*#__PURE__*/
      function () {
        var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
        /*#__PURE__*/
        _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res, next) {
          var fields, model, data;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  fields = req.query.fields ? JSON.parse(req.query.fields) : null;
                  model = _this._getModel(req, res);
                  _context.prev = 2;
                  _context.next = 5;
                  return model.getData(fields);

                case 5:
                  data = _context.sent;

                  _this._result(null, data, req, res, next);

                  _context.next = 12;
                  break;

                case 9:
                  _context.prev = 9;
                  _context.t0 = _context["catch"](2);

                  _this._result(_context.t0, null, req, res, next);

                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[2, 9]]);
        }));

        return function (_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }())],
      submit: [Object(_common_utils__WEBPACK_IMPORTED_MODULE_6__["asyncHandler"])(
      /*#__PURE__*/
      function () {
        var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
        /*#__PURE__*/
        _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(req, res, next) {
          var model, data;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  model = _this._getModel(req, res);
                  _context2.prev = 1;
                  _context2.next = 4;
                  return model.submit(req.body);

                case 4:
                  data = _context2.sent;

                  _this._result(null, {
                    data: data,
                    error: null
                  }, req, res, next);

                  _context2.next = 14;
                  break;

                case 8:
                  _context2.prev = 8;
                  _context2.t0 = _context2["catch"](1);

                  if (!(_context2.t0 && !(_context2.t0 instanceof _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_4__["default"]))) {
                    _context2.next = 13;
                    break;
                  }

                  _this._result(_context2.t0, null, req, res, next);

                  return _context2.abrupt("return");

                case 13:
                  _this._result(null, {
                    data: null,
                    error: _context2.t0
                  }, req, res, next);

                case 14:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, null, [[1, 8]]);
        }));

        return function (_x4, _x5, _x6) {
          return _ref2.apply(this, arguments);
        };
      }())],
      validate: [Object(_common_utils__WEBPACK_IMPORTED_MODULE_6__["asyncHandler"])(
      /*#__PURE__*/
      function () {
        var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
        /*#__PURE__*/
        _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(req, res, next) {
          var model, data;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  model = _this._getModel(req, res);
                  _context3.prev = 1;
                  _context3.next = 4;
                  return model.isValidRecord(req.body);

                case 4:
                  data = _context3.sent;

                  _this._result(null, data, req, res, next);

                  _context3.next = 11;
                  break;

                case 8:
                  _context3.prev = 8;
                  _context3.t0 = _context3["catch"](1);

                  _this._result(_context3.t0, null, req, res, next);

                case 11:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, null, [[1, 8]]);
        }));

        return function (_x7, _x8, _x9) {
          return _ref3.apply(this, arguments);
        };
      }())]
    };
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(FormExpressApi, [{
    key: "model",
    value: function model(_model) {
      if (typeof _model === 'function') {
        this._getModel = _model;
      } else {
        this._getModel = function () {
          return _model;
        };
      }

      return this;
    }
  }, {
    key: "getRouter",
    value: function getRouter() {
      return new express__WEBPACK_IMPORTED_MODULE_5___default.a.Router().get('/', this.middlewares.getData).post('/', this.middlewares.submit).post('/validation', this.middlewares.validate);
    }
  }, {
    key: "getData",
    value: function getData(middlewares) {
      return this._addMidelwares('getData', middlewares);
    }
  }, {
    key: "submit",
    value: function submit(middlewares) {
      return this._addMidelwares('submit', middlewares);
    }
  }, {
    key: "validate",
    value: function validate(middlewares) {
      return this._addMidelwares('validate', middlewares);
    }
  }, {
    key: "_addMidelwares",
    value: function _addMidelwares(method, middlewares) {
      if (!Array.isArray(middlewares)) {
        middlewares = [middlewares];
      }

      this.middlewares[method] = middlewares.concat(this.middlewares[method]);
      return this;
    } // Default implementation

  }, {
    key: "_getModel",
    value: function _getModel() {
      throw Error('Model is not defined.');
    }
  }, {
    key: "_result",
    value: function _result(err, data, req, res, next) {
      if (err) {
        next(err);
      } else {
        res.json(data);
      }
    }
  }]);

  return FormExpressApi;
}();

/* harmony default export */ __webpack_exports__["default"] = (FormExpressApi);

/***/ }),

/***/ "./src/form/FormModel.js":
/*!*******************************!*\
  !*** ./src/form/FormModel.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _common_validation_Validator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/validation/Validator */ "./src/common/validation/Validator.js");
/* harmony import */ var _AbstractFormModel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AbstractFormModel */ "./src/form/AbstractFormModel.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/utils */ "./src/common/utils.js");








/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */




var FormModel =
/*#__PURE__*/
function (_AbstractFormModel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(FormModel, _AbstractFormModel);

  /**
   * Simple form model
   *
   * @param {Object}    defaultValues Default form field values
   * @param {Validator} validation    Validation
   * @constructor
   */
  function FormModel(defaultValues, validation) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, FormModel);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(FormModel).call(this));
    _this._validation = validation || new _common_validation_Validator__WEBPACK_IMPORTED_MODULE_7__["default"]();
    _this._data = defaultValues ? Object(_common_utils__WEBPACK_IMPORTED_MODULE_9__["clone"])(defaultValues) : {};
    return _this;
  }
  /**
   * Get data
   *
   * @param {Array}    fields     Required fields
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(FormModel, [{
    key: "getData",
    value: function () {
      var _getData = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(fields) {
        var record, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, field;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                record = {};

                if (!fields) {
                  _context.next = 23;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 5;

                for (_iterator = fields[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  field = _step.value;
                  record[field] = this._data[field];
                }

                _context.next = 13;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](5);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 13:
                _context.prev = 13;
                _context.prev = 14;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 16:
                _context.prev = 16;

                if (!_didIteratorError) {
                  _context.next = 19;
                  break;
                }

                throw _iteratorError;

              case 19:
                return _context.finish(16);

              case 20:
                return _context.finish(13);

              case 21:
                _context.next = 24;
                break;

              case 23:
                record = Object(_common_utils__WEBPACK_IMPORTED_MODULE_9__["clone"])(this._data);

              case 24:
                return _context.abrupt("return", record);

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 9, 13, 21], [14,, 16, 20]]);
      }));

      function getData(_x) {
        return _getData.apply(this, arguments);
      }

      return getData;
    }()
    /**
     * Process form data
     *
     * @param {Object}      changes     Form data
     */

  }, {
    key: "submit",
    value: function () {
      var _submit = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(changes) {
        var validErrors;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.isValidRecord(changes);

              case 2:
                validErrors = _context2.sent;

                if (validErrors.isEmpty()) {
                  _context2.next = 5;
                  break;
                }

                throw validErrors;

              case 5:
                Object.assign(this._data, changes);
                this.trigger('update', changes);
                return _context2.abrupt("return", changes);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function submit(_x2) {
        return _submit.apply(this, arguments);
      }

      return submit;
    }()
    /**
     * Validation check
     *
     * @param {Object}      record
     */

  }, {
    key: "isValidRecord",
    value: function () {
      var _isValidRecord = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(record) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._validation.isValidRecord(record);

              case 2:
                return _context3.abrupt("return", _context3.sent);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function isValidRecord(_x3) {
        return _isValidRecord.apply(this, arguments);
      }

      return isValidRecord;
    }()
    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {Array}  fields   Fields list
     * @returns {Array}  Dependencies
     */

  }, {
    key: "getValidationDependency",
    value: function getValidationDependency(fields) {
      return this._validation.getValidationDependency(fields);
    }
  }]);

  return FormModel;
}(_AbstractFormModel__WEBPACK_IMPORTED_MODULE_8__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (FormModel);

/***/ }),

/***/ "./src/form/FormService.js":
/*!*********************************!*\
  !*** ./src/form/FormService.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "@babel/runtime/helpers/objectSpread");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _common_Events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/Events */ "./src/common/Events.js");
/* harmony import */ var _common_validation_Validator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/validation/Validator */ "./src/common/validation/Validator.js");
/* harmony import */ var _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/validation/ValidationErrors */ "./src/common/validation/ValidationErrors.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../common/utils */ "./src/common/utils.js");
/* harmony import */ var _common_ThrottleError__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../common/ThrottleError */ "./src/common/ThrottleError.js");








/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */






var FormService =
/*#__PURE__*/
function () {
  function FormService() {
    var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default()(this, FormService);

    this._data = null;
    this._changes = null;
    this._errors = new _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_9__["default"]();
    this._warnings = new _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_9__["default"]();
    this._warningsValidator = null;
    this._eventEmitter = new _common_Events__WEBPACK_IMPORTED_MODULE_7__["default"]();
    this._isNotInitialized = true;
    this.fields = fields;
    this._validateForm = Object(_common_utils__WEBPACK_IMPORTED_MODULE_10__["throttle"])(this._validateForm.bind(this));
    this.validateForm = this.validateForm.bind(this);
    this._onModelChange = this._onModelChange.bind(this);
    this.clearChanges = this.clearChanges.bind(this);
    this.clearError = this.clearError.bind(this);
    this.clearValidation = this.clearValidation.bind(this);
    this.updateField = this.updateField.bind(this);
    this.validateField = this.validateField.bind(this);
    this._getData = this._getData.bind(this);
    this._getChanges = this._getChanges.bind(this);
  }
  /**
   * Initialize form
   *
   * @param {Object}            settings                                Configuration
   * @param {Array}             settings.fields                         Fields list, that are required to display
   * @param {FormModel}         settings.model                          Model of form
   * @param {Object}            [settings.data]                         Preset data
   * @param {Object}            [settings.changes                       Preset changes
   * @param {bool}              [settings.submitAll=false]              Send all form for validity check
   * @param {bool}              [settings.partialErrorChecking=false]   Activate partial gradual form validation
   * @param {bool}              [settings.showDependentFields=false]    Mark the fields which are involved in the group validation
   * @param {Validator}         [settings.warningsValidator]            Warnings validator for fields
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(FormService, [{
    key: "init",
    value: function () {
      var _init = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee(settings) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (settings.model) {
                  _context.next = 2;
                  break;
                }

                throw Error('You must specify the model');

              case 2:
                this._data = settings.data || null;
                this._changes = settings.changes || {};
                this._isSubmitting = false;
                this.showDependentFields = settings.showDependentFields || false;
                this._partialErrorChecking = settings.partialErrorChecking; // Current mode

                this._partialErrorCheckingDefault = settings.partialErrorChecking; // Default mode

                this.model = settings.model; // FormModel

                this.submitAll = settings.submitAll;
                this._warningsValidator = settings.warningsValidator || new _common_validation_Validator__WEBPACK_IMPORTED_MODULE_8__["default"]();
                this.validating = false;
                this._hiddenValidationFields = [];
                this.submitting = false;
                this._isNotInitialized = false;

                if (settings.hasOwnProperty('fields')) {
                  this.fields = settings.fields;
                }

                if (this._data) {
                  _context.next = 20;
                  break;
                }

                _context.next = 19;
                return settings.model.getData(this.fields);

              case 19:
                this._data = _context.sent;

              case 20:
                this.model.on('update', this._onModelChange);

                this._setState();

                if (settings.partialErrorChecking) {
                  _context.next = 25;
                  break;
                }

                _context.next = 25;
                return this.validateForm();

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init(_x) {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "getAll",
    value: function getAll() {
      var isLoaded = this._isLoaded();

      if (!isLoaded) {
        var emptyData = {
          isLoaded: isLoaded,
          data: {},
          originalData: {},
          changes: {},
          errors: new _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_9__["default"](),
          warnings: new _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_9__["default"](),
          isSubmitting: false
        };
        emptyData.fields = this._getFields(emptyData.data, emptyData.changes, emptyData.errors, emptyData.warnings);
        return emptyData;
      }

      var data = this._getData();

      var changes = this._getChangesFields();

      var errors = this._getDisplayedErrors(this._errors);

      var warnings = this._getDisplayedErrors(this._warnings);

      return {
        isLoaded: isLoaded,
        data: data,
        originalData: this._data,
        changes: changes,
        errors: errors,
        warnings: warnings,
        // Note that we return errors and warnings both in bunch as a property and for each field separately
        // - it is redundantly, but handy :)
        fields: this._getFields(data, changes, errors, warnings),
        isSubmitting: this._isSubmitting
      };
    }
    /**
     * Update form value. Is used as the Editors onChange handler
     *
     * @param {string}  field  Parameter
     * @param {*}       value  Event or data
     */

  }, {
    key: "updateField",
    value: function () {
      var _updateField = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee2(field, value) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.set(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, field, Object(_common_utils__WEBPACK_IMPORTED_MODULE_10__["parseValueFromEvent"])(value)));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateField(_x2, _x3) {
        return _updateField.apply(this, arguments);
      }

      return updateField;
    }()
  }, {
    key: "addChangeListener",
    value: function addChangeListener(func) {
      this._eventEmitter.on('update', func);
    }
  }, {
    key: "removeChangeListener",
    value: function removeChangeListener(func) {
      this._eventEmitter.off('update', func);

      if (this._eventEmitter.listenerCount('update') === 0 && !this._isNotInitialized) {
        this.model.off('update', this._onModelChange);
      }
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners() {
      this._eventEmitter.removeAllListeners('update');

      this.model.off('update', this._onModelChange);
    }
    /**
     * @param {string|string[]} fields
     */

  }, {
    key: "clearValidation",
    value: function clearValidation(fields) {
      if (this._isNotInitialized) {
        return;
      } // We keep info about _hiddenValidationFields for cases when clearValidation was called while validateForm was
      // called and haven't finished, so then old validation result shouldn't show errors for _hiddenValidationFields
      // fields, but the next called validations will clear _hiddenValidationFields so the fields will get errors again.
      // Use case: a user changed field 'name', a validation started, the user focused field 'age' so we called
      // clearValidation('age'), the validation finished and returned errors for fields 'name' and 'age', but we
      // shouldn't show error for field 'age' because the user has just focused it. Then user blured field 'age', a new
      // validation stated and it should show errors for field 'age'.


      if (Array.isArray(fields)) {
        var _this$_hiddenValidati;

        (_this$_hiddenValidati = this._hiddenValidationFields).push.apply(_this$_hiddenValidati, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(fields));
      } else {
        this._hiddenValidationFields.push(fields);
      }

      this._setState();
    }
  }, {
    key: "clearError",
    value: function clearError(field) {
      console.warn('Deprecated: FormService method "clearError" renamed to "clearValidation"');
      this.clearValidation(field);
    }
  }, {
    key: "validateField",
    value: function () {
      var _validateField = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee3(field, value) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.set(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, field, Object(_common_utils__WEBPACK_IMPORTED_MODULE_10__["parseValueFromEvent"])(value)), true);

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function validateField(_x4, _x5) {
        return _validateField.apply(this, arguments);
      }

      return validateField;
    }()
    /**
     * Set data in the form
     *
     * @param {Object}    data              Data
     * @param {bool}      [validate=false]  Validate form
     */

  }, {
    key: "set",
    value: function () {
      var _set = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee4(data, validate) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this._isLoaded()) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                this._changes = Object(_common_utils__WEBPACK_IMPORTED_MODULE_10__["getRecordChanges"])(this.model, this._data, this._changes, data);

                this._setState();

                if (!validate) {
                  _context4.next = 14;
                  break;
                }

                _context4.prev = 5;
                _context4.next = 8;
                return this.validateForm();

              case 8:
                _context4.next = 14;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](5);

                if (_context4.t0 instanceof _common_ThrottleError__WEBPACK_IMPORTED_MODULE_11__["default"]) {
                  _context4.next = 14;
                  break;
                }

                throw _context4.t0;

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[5, 10]]);
      }));

      function set(_x6, _x7) {
        return _set.apply(this, arguments);
      }

      return set;
    }()
  }, {
    key: "submitData",
    value: function () {
      var _submitData = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee5(data) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this._isNotInitialized) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return");

              case 2:
                _context5.next = 4;
                return this.set(data);

              case 4:
                _context5.next = 6;
                return this.submit();

              case 6:
                return _context5.abrupt("return", _context5.sent);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function submitData(_x8) {
        return _submitData.apply(this, arguments);
      }

      return submitData;
    }()
    /**
     * Send form data to the model
     */

  }, {
    key: "submit",
    value: function () {
      var _submit = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee6() {
        var changes, countOfHiddenValidationFieldsToRemove, data, validationErrors, newChanges, actualChanges;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(this._isNotInitialized || this._isSubmitting)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                changes = this._getChanges();
                this._isSubmitting = true;
                this._partialErrorChecking = false;
                countOfHiddenValidationFieldsToRemove = this._hiddenValidationFields.length;

                this._setState(); // Send changes to model


                _context6.prev = 7;
                _context6.next = 10;
                return this.model.submit(changes);

              case 10:
                data = _context6.sent;
                _context6.next = 20;
                break;

              case 13:
                _context6.prev = 13;
                _context6.t0 = _context6["catch"](7);

                if (_context6.t0 instanceof _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_9__["default"]) {
                  _context6.next = 19;
                  break;
                }

                this._isSubmitting = false;

                this._setState();

                throw _context6.t0;

              case 19:
                validationErrors = _context6.t0;

              case 20:
                this._isSubmitting = false;
                newChanges = this._getChanges();
                actualChanges = Object(_common_utils__WEBPACK_IMPORTED_MODULE_10__["isEqual"])(changes, newChanges);

                if (actualChanges) {
                  if (validationErrors) {
                    this._errors = validationErrors;
                  } else {
                    this._errors = new _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_9__["default"]();
                    this._changes = {};
                  }
                }

                this._hiddenValidationFields.splice(0, countOfHiddenValidationFieldsToRemove);

                this._setState();

                if (!validationErrors) {
                  _context6.next = 28;
                  break;
                }

                throw validationErrors;

              case 28:
                return _context6.abrupt("return", data);

              case 29:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[7, 13]]);
      }));

      function submit() {
        return _submit.apply(this, arguments);
      }

      return submit;
    }()
  }, {
    key: "clearFieldChanges",
    value: function clearFieldChanges(field) {
      if (this._isNotInitialized) {
        return;
      }

      this._errors.clearField(field);

      this._warnings.clearField(field);

      delete this._changes[field];

      this._setState();
    }
  }, {
    key: "clearChanges",
    value: function clearChanges() {
      if (this._isNotInitialized) {
        return;
      }

      this._errors.clear();

      this._warnings.clear();

      this._changes = {};
      this._partialErrorChecking = this._partialErrorCheckingDefault;

      this._setState();
    }
  }, {
    key: "setPartialErrorChecking",
    value: function setPartialErrorChecking(value) {
      this._partialErrorChecking = value;

      this._setState();
    }
  }, {
    key: "getPartialErrorChecking",
    value: function getPartialErrorChecking() {
      return this._partialErrorChecking;
    }
  }, {
    key: "validateForm",
    value: function () {
      var _validateForm2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee7() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return this._validateForm();

              case 3:
                return _context7.abrupt("return", _context7.sent);

              case 6:
                _context7.prev = 6;
                _context7.t0 = _context7["catch"](0);

                if (_context7.t0 instanceof _common_ThrottleError__WEBPACK_IMPORTED_MODULE_11__["default"]) {
                  _context7.next = 10;
                  break;
                }

                throw _context7.t0;

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 6]]);
      }));

      function validateForm() {
        return _validateForm2.apply(this, arguments);
      }

      return validateForm;
    }()
  }, {
    key: "_validateForm",
    value: function () {
      var _validateForm3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee8() {
        var countOfHiddenValidationFieldsToRemove, displayedErrors, displayedWarning;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this._isNotInitialized) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return");

              case 2:
                // We should remove only those hiddenValidationFields that were present before validation started and keep those
                // that were added after validation started (so it is possible and ok that field 'name' may be present 2 times:
                // 1 for old validation call and 1 for the new).
                // Take into account that _validateForm is throttled, so next calls will be skipped or scheduled after current call
                // finishes. It means we don't need to care about parallel calls because they are impossible.
                countOfHiddenValidationFieldsToRemove = this._hiddenValidationFields.length;
                this.validating = true;
                _context8.prev = 4;
                _context8.next = 7;
                return Promise.all([this._runValidator(this.model, this._getChanges, '_errors'), this._runValidator(this._warningsValidator, this._getData, '_warnings')]);

              case 7:
                _context8.prev = 7;
                this.validating = false;

                this._hiddenValidationFields.splice(0, countOfHiddenValidationFieldsToRemove);

                this._setState();

                return _context8.finish(7);

              case 12:
                displayedErrors = this._getDisplayedErrors(this._errors);
                displayedWarning = this._getDisplayedErrors(this._warnings);
                return _context8.abrupt("return", {
                  errors: !displayedErrors.isEmpty() ? displayedErrors : null,
                  warnings: !displayedWarning.isEmpty() ? displayedWarning : null
                });

              case 15:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[4,, 7, 12]]);
      }));

      function _validateForm() {
        return _validateForm3.apply(this, arguments);
      }

      return _validateForm;
    }()
  }, {
    key: "_getFields",
    value: function _getFields(data, changes, errors, warnings) {
      var proxy = new Proxy({}, {
        get: function get(target, fieldName) {
          return {
            value: data[fieldName],
            isChanged: changes.hasOwnProperty(fieldName),
            errors: errors.getFieldErrorMessages(fieldName),
            warnings: warnings.getFieldErrorMessages(fieldName)
          };
        }
      }); // Explicit declaration of fields in an object

      if (this.fields) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var field = _step.value;
            proxy[field] = proxy[field];
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return proxy;
    }
    /**
     * Check is data loaded
     *
     * @returns {boolean}
     */

  }, {
    key: "_isLoaded",
    value: function _isLoaded() {
      return this._data !== null;
    }
    /**
     * Get form changes
     *
     * @return {{}}
     */

  }, {
    key: "_getChangesFields",
    value: function _getChangesFields() {
      // TODO _getChanges
      var changes = {};

      for (var field in this._changes) {
        if (!this._isDependentField(field)) {
          changes[field] = this._changes[field];
        }
      }

      return changes;
    }
    /**
     * Filter errors depending on the partialErrorChecking mode and clearValidation method
     *
     * @param {ValidationErrors}  validationErrors
     * @returns {ValidationErrors} Form fields
     */

  }, {
    key: "_getDisplayedErrors",
    value: function _getDisplayedErrors(validationErrors) {
      var filteredErrors = validationErrors.clone();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = validationErrors.getErrors().keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var field = _step2.value;
          var isFieldPristine = !this._changes.hasOwnProperty(field) || Object(_common_utils__WEBPACK_IMPORTED_MODULE_10__["isEqual"])(this._changes[field], this._data[field]);

          if (this._hiddenValidationFields.includes(field) || this._partialErrorChecking && isFieldPristine) {
            filteredErrors.clearField(field);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return filteredErrors;
    }
  }, {
    key: "_setState",
    value: function _setState() {
      this._eventEmitter.trigger('update', this.getAll());
    }
    /**
     * Model records changes handler
     *
     * @param {Object} changes  Changes
     * @private
     */

  }, {
    key: "_onModelChange",
    value: function _onModelChange(changes) {
      this._data = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, this._data, changes);

      this._setState();
    }
  }, {
    key: "_getData",
    value: function _getData() {
      return Object.assign({}, this._data, this._changes);
    }
  }, {
    key: "_getChanges",
    value: function _getChanges() {
      // Send all data or just changed fields in addiction of form configuration
      if (this.submitAll) {
        return this._getData();
      }

      return this._changes;
    }
  }, {
    key: "_isDependentField",
    value: function _isDependentField(field) {
      return this._changes.hasOwnProperty(field) && Object(_common_utils__WEBPACK_IMPORTED_MODULE_10__["isEqual"])(this._changes[field], this._data[field]);
    }
  }, {
    key: "_runValidator",
    value: function () {
      var _runValidator2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee9(validator, getData, output) {
        var data, validErrors;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                data = getData();

                if (!Object(_common_utils__WEBPACK_IMPORTED_MODULE_10__["isEmpty"])(data)) {
                  _context9.next = 4;
                  break;
                }

                this[output].clear();
                return _context9.abrupt("return");

              case 4:
                _context9.prev = 4;
                _context9.next = 7;
                return validator.isValidRecord(data);

              case 7:
                validErrors = _context9.sent;
                _context9.next = 14;
                break;

              case 10:
                _context9.prev = 10;
                _context9.t0 = _context9["catch"](4);
                this[output].clear();
                throw _context9.t0;

              case 14:
                if (Object(_common_utils__WEBPACK_IMPORTED_MODULE_10__["isEqual"])(data, getData())) {
                  this[output] = validErrors;
                }

              case 15:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[4, 10]]);
      }));

      function _runValidator(_x9, _x10, _x11) {
        return _runValidator2.apply(this, arguments);
      }

      return _runValidator;
    }()
  }]);

  return FormService;
}();

/* harmony default export */ __webpack_exports__["default"] = (FormService);

/***/ }),

/***/ "./src/form/FormXhrModel.js":
/*!**********************************!*\
  !*** ./src/form/FormXhrModel.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/validation/ValidationErrors */ "./src/common/validation/ValidationErrors.js");
/* harmony import */ var _common_validation_Validator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/validation/Validator */ "./src/common/validation/Validator.js");
/* harmony import */ var _common_defaultXhr__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/defaultXhr */ "./src/common/defaultXhr.js");
/* harmony import */ var _common_Events__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../common/Events */ "./src/common/Events.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_11__);








/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */






var FormXhrModel =
/*#__PURE__*/
function (_EventsModel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(FormXhrModel, _EventsModel);

  function FormXhrModel(settings) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, FormXhrModel);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(FormXhrModel).call(this));

    if (!settings.api) {
      throw Error('Initialization problem: \'api\' must be specified.');
    }

    _this._validator = settings.validator || new _common_validation_Validator__WEBPACK_IMPORTED_MODULE_8__["default"]();
    _this._xhr = settings.xhr || _common_defaultXhr__WEBPACK_IMPORTED_MODULE_9__["default"];
    _this._apiUrl = settings.api.replace(/([^/])\?/, '$1/?') // Add "/" before "?"
    .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(FormXhrModel, [{
    key: "getData",
    value: function () {
      var _getData = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(fields) {
        var parsedUrl, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                parsedUrl = url__WEBPACK_IMPORTED_MODULE_11___default.a.parse(this._apiUrl, true);
                parsedUrl.query.fields = JSON.stringify(fields);
                delete parsedUrl.search;
                _context.next = 5;
                return this._xhr({
                  method: 'GET',
                  uri: url__WEBPACK_IMPORTED_MODULE_11___default.a.format(parsedUrl)
                });

              case 5:
                response = _context.sent;
                return _context.abrupt("return", JSON.parse(response));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getData(_x) {
        return _getData.apply(this, arguments);
      }

      return getData;
    }()
  }, {
    key: "submit",
    value: function () {
      var _submit = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(changes) {
        var body;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._xhr({
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json'
                  },
                  uri: this._apiUrl,
                  body: JSON.stringify(changes)
                });

              case 2:
                body = _context2.sent;
                body = JSON.parse(body);

                if (!body.error) {
                  _context2.next = 6;
                  break;
                }

                throw _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_7__["default"].createFromJSON(body.error);

              case 6:
                this.trigger('update', body.data);
                return _context2.abrupt("return", body.data);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function submit(_x2) {
        return _submit.apply(this, arguments);
      }

      return submit;
    }()
    /**
     * Validation check
     *
     * @param {Object}      record
     */

  }, {
    key: "isValidRecord",
    value: function isValidRecord(record) {
      return this._validator.isValidRecord(record);
    }
    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {Array}  fields   Fields list
     * @returns {Array}  Dependencies
     */

  }, {
    key: "getValidationDependency",
    value: function getValidationDependency(fields) {
      return this._validator.getValidationDependency(fields);
    }
  }]);

  return FormXhrModel;
}(_common_Events__WEBPACK_IMPORTED_MODULE_10__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (FormXhrModel);

/***/ }),

/***/ "./src/form/adapters/GridToFormCreate.js":
/*!***********************************************!*\
  !*** ./src/form/adapters/GridToFormCreate.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _common_Events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common/Events */ "./src/common/Events.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../common/utils */ "./src/common/utils.js");








/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */



var GridToFormCreate =
/*#__PURE__*/
function (_Events) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(GridToFormCreate, _Events);

  /**
   * Adapter allows to use Grid model as a model for new form record creation
   *
   * @param {AbstractGridModel}   model           Grid model
   * @param {Object}              [initialData]   Default field values
   * @constructor
   */
  function GridToFormCreate(model, initialData) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, GridToFormCreate);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(GridToFormCreate).call(this));
    _this._adapter = {
      model: model,
      initialData: initialData || {}
    };
    return _this;
  }
  /**
   * Get data
   *
   * @param {Array}     fields     Required fields
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(GridToFormCreate, [{
    key: "getData",
    value: function () {
      var _getData = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(fields) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(fields && fields.length)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", Object(_common_utils__WEBPACK_IMPORTED_MODULE_8__["pick"])(this._adapter.initialData, fields));

              case 2:
                return _context.abrupt("return", this._adapter.initialData);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getData(_x) {
        return _getData.apply(this, arguments);
      }

      return getData;
    }()
    /**
     * Create new record
     *
     * @param   {Object}      data      Record
     */

  }, {
    key: "submit",
    value: function () {
      var _submit = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(data) {
        var model;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                model = this._adapter.model;
                _context2.next = 3;
                return model.create(data);

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function submit(_x2) {
        return _submit.apply(this, arguments);
      }

      return submit;
    }()
    /**
     * Validation checking
     *
     * @param {Object}      record  Record object
     */

  }, {
    key: "isValidRecord",
    value: function () {
      var _isValidRecord = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(record) {
        var model;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                model = this._adapter.model;
                _context3.next = 3;
                return model.isValidRecord(record, null);

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function isValidRecord(_x3) {
        return _isValidRecord.apply(this, arguments);
      }

      return isValidRecord;
    }()
    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {Array}  fields
     * @returns {Array}  Dependencies
     */

  }, {
    key: "getValidationDependency",
    value: function getValidationDependency(fields) {
      return this._adapter.model.getValidationDependency(fields);
    }
  }]);

  return GridToFormCreate;
}(_common_Events__WEBPACK_IMPORTED_MODULE_7__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (GridToFormCreate);

/***/ }),

/***/ "./src/form/adapters/GridToFormUpdate.js":
/*!***********************************************!*\
  !*** ./src/form/adapters/GridToFormUpdate.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common/validation/ValidationErrors */ "./src/common/validation/ValidationErrors.js");
/* harmony import */ var _common_Events__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../common/Events */ "./src/common/Events.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../common/utils */ "./src/common/utils.js");








/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */




var GridToFormUpdate =
/*#__PURE__*/
function (_Events) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(GridToFormUpdate, _Events);

  /**
   * Adapter that allows us to use Grid model record as a form model
   *
   * @param {AbstractGridModel} model   Grid model
   * @param {number|string}     id      Record ID
   * @constructor
   */
  function GridToFormUpdate(model, id) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, GridToFormUpdate);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(GridToFormUpdate).call(this));
    _this._adapter = {
      model: model,
      id: id
    };
    _this._onUpdateHandlers = [];
    return _this;
  }
  /**
   * Subscribe to inner model event
   *
   * @param {string}      event   Event ID
   * @param {Function}    cb      CallBack function
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(GridToFormUpdate, [{
    key: "on",
    value: function on(event, cb) {
      var ctx = this;

      if (event !== 'update') {
        _common_Events__WEBPACK_IMPORTED_MODULE_8__["default"].prototype.on.call(this, event, cb);
        return;
      } // onChange filters out table events, that do not regard to our record


      function onChange(changes) {
        for (var i = 0; i < changes.length; i++) {
          if (Object(_common_utils__WEBPACK_IMPORTED_MODULE_9__["isEqual"])(changes[i][0], ctx._adapter.id)) {
            cb(changes[i][1]);
            return;
          }
        }
      }

      this._onUpdateHandlers.push({
        originalCallback: cb,
        wrappedCallback: onChange
      });

      this._adapter.model.on('update', onChange);
    }
    /**
     * Unsubscribe from inner model event
     *
     * @param {string}      event   Event ID
     * @param {Function}    cb      CallBack function
     */

  }, {
    key: "off",
    value: function off(event, cb) {
      var ctx = this;
      var newOnUpdateHandlers = [];

      if (event !== 'update') {
        _common_Events__WEBPACK_IMPORTED_MODULE_8__["default"].prototype.off.call(this, event, cb);
        return;
      }

      this._onUpdateHandlers.forEach(function (handler) {
        if (handler.originalCallback === cb) {
          ctx._adapter.model.off('update', handler.wrappedCallback);
        } else {
          newOnUpdateHandlers.push(handler);
        }
      });

      this._onUpdateHandlers = newOnUpdateHandlers;
    }
  }, {
    key: "listenerCount",
    value: function listenerCount(event) {
      return this._adapter.model.listenerCount(event);
    }
    /**
     * Get data
     *
     * @param {Array}     fields     Required fields
     */

  }, {
    key: "getData",
    value: function () {
      var _getData = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(fields) {
        var model;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                model = this._adapter.model;
                _context.next = 3;
                return model.getRecord(this._adapter.id, fields);

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getData(_x) {
        return _getData.apply(this, arguments);
      }

      return getData;
    }()
    /**
     * Apply changes
     *
     * @param   {Object}      changes     Form data
     */

  }, {
    key: "submit",
    value: function () {
      var _submit = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(changes) {
        var record, model, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                record = Object(_common_utils__WEBPACK_IMPORTED_MODULE_9__["clone"])(changes);
                model = this._adapter.model;
                _context2.next = 4;
                return model.update([[this._adapter.id, record]]);

              case 4:
                result = _context2.sent;
                result = result[0][1];

                if (!(result instanceof Error || result instanceof _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_7__["default"])) {
                  _context2.next = 8;
                  break;
                }

                throw result;

              case 8:
                return _context2.abrupt("return", result);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function submit(_x2) {
        return _submit.apply(this, arguments);
      }

      return submit;
    }()
    /**
     * Record validity check
     *
     * @param {Object}      record  Record object
     */

  }, {
    key: "isValidRecord",
    value: function () {
      var _isValidRecord = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(record) {
        var model;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                model = this._adapter.model;
                _context3.next = 3;
                return model.isValidRecord(record, this._adapter.id);

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function isValidRecord(_x3) {
        return _isValidRecord.apply(this, arguments);
      }

      return isValidRecord;
    }()
    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {Array}  fields  Fields list
     * @returns {Array}  Dependencies
     */

  }, {
    key: "getValidationDependency",
    value: function getValidationDependency(fields) {
      return this._adapter.model.getValidationDependency(fields);
    }
  }]);

  return GridToFormUpdate;
}(_common_Events__WEBPACK_IMPORTED_MODULE_8__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (GridToFormUpdate);

/***/ }),

/***/ "./src/form/connectForm.js":
/*!*********************************!*\
  !*** ./src/form/connectForm.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "@babel/runtime/helpers/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _FormService__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./FormService */ "./src/form/FormService.js");










/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */



function connectForm() {
  var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return function (Component) {
    return (
      /*#__PURE__*/
      function (_React$Component) {
        _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default()(ComponentWithFormService, _React$Component);

        function ComponentWithFormService() {
          var _this;

          _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, ComponentWithFormService);

          _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(ComponentWithFormService).call(this));
          _this.form = new _FormService__WEBPACK_IMPORTED_MODULE_10__["default"](fields);
          _this.state = _this.form.getAll();
          _this.onFormChange = _this.onFormChange.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this));
          return _this;
        }

        _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(ComponentWithFormService, [{
          key: "componentDidMount",
          value: function () {
            var _componentDidMount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
            /*#__PURE__*/
            _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
              var state;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
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
            return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(Component, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
              formData: this.state,
              formService: this.form
            }));
          }
        }]);

        return ComponentWithFormService;
      }(react__WEBPACK_IMPORTED_MODULE_9___default.a.Component)
    );
  };
}

/* harmony default export */ __webpack_exports__["default"] = (connectForm);

/***/ }),

/***/ "./src/form/mixin.js":
/*!***************************!*\
  !*** ./src/form/mixin.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils */ "./src/common/utils.js");
/* harmony import */ var _common_toPromise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/toPromise */ "./src/common/toPromise.js");
/* harmony import */ var _common_validation_Validator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/validation/Validator */ "./src/common/validation/Validator.js");
/* harmony import */ var _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/validation/ValidationErrors */ "./src/common/validation/ValidationErrors.js");
/* harmony import */ var _common_callbackify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/callbackify */ "./src/common/callbackify.js");




/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */





/**
 * Grid form mixin
 * @mixin
 */

var FormMixin = {
  getInitialState: function getInitialState() {
    this._validateForm = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["throttle"])(this._validateForm);

    if (this._handleModelChange.name.indexOf('bound ') !== 0) {
      // Support React.createClass and mixin-decorators
      this._handleModelChange = this._handleModelChange.bind(this);
      this._getData = this._getData.bind(this);
      this._getChanges = this._getChanges.bind(this);
      this.validateForm = this.validateForm.bind(this);
    }

    return {
      _formMixin: null
    };
  },
  componentWillMount: function componentWillMount() {
    this._isUnmounted = false;
  },
  componentWillUnmount: function componentWillUnmount() {
    this._isUnmounted = true;

    if (!this._isNotInitialized()) {
      this.state._formMixin.model.off('update', this._handleModelChange);
    }
  },

  /**
   * Initialize form
   *
   * @param {Object}            settings                                Configuration
   * @param {Array}             settings.fields                         Fields list, that are required to display
   * @param {FormModel}         settings.model                          Model of form
   * @param {Object}            [settings.data]                         Preset data
   * @param {Object}            [settings.changes                       Preset changes
   * @param {bool}              [settings.submitAll=false]              Send all form for validity check
   * @param {bool}              [settings.partialErrorChecking=false]   Activate partial gradual form validation
   * @param {bool}              [settings.showDependentFields=false]    Mark the fields which are involved in the group validation
   * @param {bool}              [settings.autoSubmit]                   Automatic submit before updateField
   * @param {Function}          [settings.autoSubmitHandler]            Automatic submit handler
   * @param {Validator}         [settings.warningsValidator]            Warningss validator for fields
   * @param {Function}          [cb]                                    CallBack function
   */
  initForm: Object(_common_callbackify__WEBPACK_IMPORTED_MODULE_7__["default"])(
  /*#__PURE__*/
  function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(settings) {
      var data, err;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this._initState(settings);

              if (this.state._formMixin.data) {
                _context.next = 19;
                break;
              }

              _context.prev = 2;
              _context.next = 5;
              return settings.model.getData(settings.fields);

            case 5:
              data = _context.sent;
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](2);
              err = _context.t0;

            case 11:
              if (!this._isUnmounted) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return");

            case 13:
              if (!err) {
                _context.next = 18;
                break;
              }

              this.state._formMixin.globalError = err;
              _context.next = 17;
              return Object(_common_toPromise__WEBPACK_IMPORTED_MODULE_4__["default"])(this.setState.bind(this), true)(this.state);

            case 17:
              throw err;

            case 18:
              this.state._formMixin.data = data;

            case 19:
              this.state._formMixin.model.on('update', this._handleModelChange);

              _context.next = 22;
              return Object(_common_toPromise__WEBPACK_IMPORTED_MODULE_4__["default"])(this.setState.bind(this), true)(this.state);

            case 22:
              if (settings.partialErrorChecking) {
                _context.next = 25;
                break;
              }

              _context.next = 25;
              return this.validateForm();

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 8]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), true),

  /**
   * Check is data loaded
   *
   * @returns {boolean}
   */
  isLoaded: function isLoaded() {
    return this.state && this.state._formMixin && Boolean(this.state._formMixin.data || this.state._formMixin.globalError);
  },

  /**
   * Get form changes
   *
   * @return {{}}
   */
  getChanges: function getChanges() {
    var changes = {};

    for (var field in this.state._formMixin.changes) {
      if (!this._isDependentField(field)) {
        changes[field] = this.state._formMixin.changes[field];
      }
    }

    return changes;
  },

  /**
   * Check if form field (or entire form) is changed
   *
   * @param  {string}   field  Field name
   * @return {boolean}
   */
  hasChanges: function hasChanges(field) {
    if (this._isNotInitialized()) {
      return false;
    }

    var state = this.state._formMixin;

    if (field === undefined) {
      return !Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["isEmpty"])(state.changes);
    }

    if (!state.showDependentFields && this._isDependentField(field)) {
      return false;
    }

    return state.changes.hasOwnProperty(field);
  },

  /**
   * Check if form field has validity errors
   *
   * @param  {string|string[]}   field  Field name or array of names
   * @return {boolean}
   */
  hasError: function hasError(field) {
    if (this._isNotInitialized()) {
      return false;
    }

    var state = this.state._formMixin; // Check group of fields

    if (Array.isArray(field)) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = field[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var entry = _step.value;

          if (this.hasError(entry)) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    } // If partial check is on and field is changed,
    // do not display an error


    if (state.partialErrorChecking) {
      if (!state.changes.hasOwnProperty(field) || Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["isEqual"])(state.changes[field], state.data[field])) {
        return false;
      }
    }

    return this.state._formMixin.errors.hasError(field) || this.state._formMixin.warnings.hasError(field);
  },
  clearError: function clearError(field, cb) {
    if (this._isNotInitialized()) {
      return;
    }

    if (this.state._formMixin.validating) {
      this.state._formMixin.pendingClearErrors.push(field);
    }

    if (Array.isArray(field)) {
      field.forEach(function (oneField) {
        this.state._formMixin.errors.clearField(oneField);

        this.state._formMixin.warnings.clearField(oneField);
      }, this);
    } else {
      this.state._formMixin.errors.clearField(field);

      this.state._formMixin.warnings.clearField(field);
    }

    this.setState(this.state, typeof cb === 'function' ? cb : null);
  },

  /**
   * Get form data without changes
   *
   * @return {Object|null}
   */
  getOriginalData: function getOriginalData() {
    if (this._isNotInitialized()) {
      return {};
    }

    return this.state._formMixin.data || null;
  },

  /**
   * Get form data
   *
   * @return {Object|null}
   */
  getData: function getData() {
    if (this._isNotInitialized()) {
      return {};
    }

    return Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["cloneDeep"])(this._getData());
  },

  /**
   * Get form errors
   *
   * @returns {ValidationErrors} Form errors
   */
  getValidationErrors: function getValidationErrors() {
    if (this._isNotInitialized()) {
      return new _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_6__["default"]();
    }

    var field;
    var errors = _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_6__["default"].merge(this.state._formMixin.errors, this.state._formMixin.warnings); // If gradual validation is on, we need
    // to remove unchanged records from errors object

    if (this.state._formMixin.partialErrorChecking) {
      errors = this.state._formMixin.errors.clone(); // Look through all form fields

      for (field in this.state._formMixin.data) {
        // If field is unchanged, remove errors, that regard to this field
        if (!this.state._formMixin.changes.hasOwnProperty(field) || Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["isEqual"])(this.state._formMixin.changes[field], this.state._formMixin.data[field])) {
          errors.clearField(field);
        }
      }
    }

    return errors;
  },
  getFieldErrors: function getFieldErrors(field) {
    if (this._isNotInitialized()) {
      return false;
    } // If partial check is on and field is changed,
    // do not display an error


    if (this.state._formMixin.partialErrorChecking && !this.state._formMixin.changes.hasOwnProperty(field)) {
      return null;
    }

    var errors = this.state._formMixin.errors.getFieldErrorMessages(field) || [];
    var warnings = this.state._formMixin.warnings.getFieldErrorMessages(field) || [];
    return errors.concat(warnings);
  },

  /**
   * Get global error data, if it's present
   *
   * @returns {Error|null}
   */
  getGlobalError: function getGlobalError() {
    if (this._isNotInitialized()) {
      return null;
    }

    return this.state._formMixin.globalError;
  },

  /**
   * Update form value. Is used as the Editors onChange handler.
   * Causes component redraw.
   *
   * @param {string}           field   Parameter
   * @param {*}                value   Event or data
   */
  updateField: function updateField(field, value) {
    if (this._isNotInitialized()) {
      return;
    }

    this.set(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, field, Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["parseValueFromEvent"])(value)));
  },
  validateField: function validateField(field, value, cb) {
    this.set(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, field, Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["parseValueFromEvent"])(value)), true, cb);
  },
  validateForm: function validateForm(cb) {
    this._validateForm(function (err) {
      if (typeof cb === 'function') {
        return cb(err);
      } else if (err) {
        if (!(err instanceof _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_6__["default"])) {
          console.error(err);
        }
      }
    });
  },

  /**
   * Set data in the form
   *
   * @param {Object}    data              Data
   * @param {boolean}      [validate=false]  Validate form
   * @param {Function}  [cb]              CallBack
   */
  set: function set(data, validate, cb) {
    var _this = this;

    if (!this.isLoaded()) {
      return;
    }

    if (typeof validate === 'function' && !cb) {
      cb = validate;
      validate = false;
    }

    var state = this.state._formMixin;
    state.changes = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["getRecordChanges"])(state.model, state.data, state.changes, data);

    if (this.state._formMixin.autoSubmit) {
      this.submit(function (err, result) {
        _this.state._formMixin.autoSubmitHandler(err, result);

        if (typeof cb === 'function') {
          cb(err, result);
        }
      });
      return;
    }

    if (validate) {
      this.setState(this.state, function () {
        return _this.validateForm(cb);
      });
      return;
    }

    this.setState(this.state, typeof cb === 'function' ? cb : null);
  },
  submitData: function submitData(data, cb) {
    if (this._isNotInitialized()) {
      return;
    }

    this.set(data);
    this.submit(cb);
  },

  /**
   * Send form data to the model
   *
   * @param {Function}  [cb]  CallBack function
   */
  submit: Object(_common_callbackify__WEBPACK_IMPORTED_MODULE_7__["default"])(
  /*#__PURE__*/
  _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {
    var changes, data, err, newChanges, actualChanges, validationError;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!this._isNotInitialized()) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            if (!(!this.state._formMixin.autoSubmit && this.isSubmitting())) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return");

          case 4:
            this.state._formMixin.submitting = true;
            changes = this._getChanges();
            this.state._formMixin.globalError = null;
            this.state._formMixin.partialErrorChecking = false;
            this.setState(this.state); // Send changes to model

            _context2.prev = 9;
            _context2.next = 12;
            return this.state._formMixin.model.submit(changes);

          case 12:
            data = _context2.sent;
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](9);
            err = _context2.t0;

          case 18:
            if (!this._isUnmounted) {
              _context2.next = 20;
              break;
            }

            return _context2.abrupt("return");

          case 20:
            this.state._formMixin.submitting = false;
            newChanges = this._getChanges();
            actualChanges = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["isEqual"])(changes, newChanges);
            validationError = err instanceof _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_6__["default"]; // Replacing empty error to null

            if (validationError && err.isEmpty()) {
              err = null;
            }

            if (err) {
              if (validationError) {
                if (actualChanges) {
                  this.state._formMixin.errors = err;
                }
              } else {
                this.state._formMixin.globalError = err;
              }
            } else if (actualChanges) {
              this.state._formMixin.errors = new _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_6__["default"]();
              this.state._formMixin.changes = {};
            } else {
              Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["forEach"])(changes, function (value, field) {
                if (Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["isEqual"])(value, newChanges[field])) {
                  delete this.state._formMixin.changes[field];
                }
              }, this);
            }

            _context2.next = 28;
            return Object(_common_toPromise__WEBPACK_IMPORTED_MODULE_4__["default"])(this.setState.bind(this), true)(this.state);

          case 28:
            if (!err) {
              _context2.next = 30;
              break;
            }

            throw err;

          case 30:
            return _context2.abrupt("return", data);

          case 31:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[9, 15]]);
  }))),
  clearFieldChanges: function clearFieldChanges(field, cb) {
    if (this._isNotInitialized()) {
      return;
    }

    this.state._formMixin.errors.clearField(field);

    this.state._formMixin.warnings.clearField(field);

    delete this.state._formMixin.changes[field];
    this.setState(this.state, typeof cb === 'function' ? cb : null);
  },
  clearChanges: function clearChanges(cb) {
    if (this._isNotInitialized()) {
      return;
    }

    this.state._formMixin.errors.clear();

    this.state._formMixin.warnings.clear();

    this.state._formMixin.changes = {};
    this.state._formMixin.globalError = false;
    this.state._formMixin.partialErrorChecking = this.state._formMixin.partialErrorCheckingDefault;
    this.setState(this.state, typeof cb === 'function' ? cb : null);
  },
  setPartialErrorChecking: function setPartialErrorChecking(value, cb) {
    this.state._formMixin.partialErrorChecking = value;
    this.setState(this.state, typeof cb === 'function' ? cb : null);
  },
  isSubmitting: function isSubmitting() {
    if (this._isNotInitialized()) {
      return false;
    }

    return this.state._formMixin.submitting;
  },

  /**
   * Model records changes handler
   *
   * @param {Object} changes  Changes
   * @private
   */
  _handleModelChange: function _handleModelChange(changes) {
    Object.assign(this.state._formMixin.data, Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["cloneDeep"])(changes));

    if (!this._isUnmounted) {
      this.setState(this.state);
    }
  },
  _initState: function _initState(settings) {
    if (!settings.model) {
      throw Error('You must specify the model form in this.initForm()');
    }

    this.state._formMixin = {
      data: settings.data,
      changes: settings.changes || {},
      errors: new _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_6__["default"](),
      warnings: new _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_6__["default"](),
      globalError: null,
      validating: false,
      pendingClearErrors: [],
      submitting: false,
      showDependentFields: settings.showDependentFields || false,
      warningsValidator: settings.warningsValidator || new _common_validation_Validator__WEBPACK_IMPORTED_MODULE_5__["default"](),
      partialErrorChecking: settings.partialErrorChecking,
      // Current mode
      partialErrorCheckingDefault: settings.partialErrorChecking,
      // Default mode
      model: settings.model,
      // FormModel
      fields: settings.fields,
      submitAll: settings.submitAll,
      autoSubmit: settings.autoSubmit,
      autoSubmitHandler: settings.autoSubmitHandler
    };
  },
  _isNotInitialized: function _isNotInitialized() {
    return !this.state || !this.state._formMixin;
  },
  _validateForm: function _validateForm(cb, stop) {
    if (this._isNotInitialized()) {
      return stop();
    }

    var completed = 0;
    var completeError;

    var onComplete = function (err) {
      var field;

      if (this._isUnmounted) {
        if (err) {
          console.error(err);
        }

        return;
      }

      if (err) {
        completeError = err;
      }

      if (++completed < 2) {
        // Wait two callbacks
        return;
      }

      this.state._formMixin.validating = false;

      while (field = this.state._formMixin.pendingClearErrors.pop()) {
        this.state._formMixin.warnings.clearField(field);

        this.state._formMixin.errors.clearField(field);
      }

      this.setState(this.state, function () {
        if (completeError) {
          cb(completeError);
          return;
        }

        var errorsWithPartialChecking = this.getValidationErrors();
        cb(errorsWithPartialChecking.isEmpty() ? null : errorsWithPartialChecking);
      });
    }.bind(this);

    this.state._formMixin.validating = true;

    this._runValidator(this.state._formMixin.model, this._getChanges, 'errors', onComplete);

    this._runValidator(this.state._formMixin.warningsValidator, this._getData, 'warnings', onComplete);
  },
  _runValidator: function _runValidator(validator, getData, output, cb) {
    var _this2 = this;

    var data = getData();
    validator.isValidRecord(data).then(function (validErrors) {
      if (!_this2._isUnmounted && Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["isEqual"])(data, getData())) {
        _this2.state._formMixin[output] = validErrors;
      }

      cb();
    })["catch"](function (err) {
      if (!_this2._isUnmounted && Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["isEqual"])(data, getData())) {
        _this2.state._formMixin[output].clear();
      }

      cb(err);
    });
  },
  _getData: function _getData() {
    if (!this.state._formMixin.data) {
      return null;
    }

    return Object.assign({}, this.state._formMixin.data, this.state._formMixin.changes);
  },
  _getChanges: function _getChanges() {
    // Send all data or just changed fields in addiction of form configuration
    if (this.state._formMixin.submitAll) {
      return this._getData();
    }

    return Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["clone"])(this.state._formMixin.changes);
  },
  _isDependentField: function _isDependentField(field) {
    var state = this.state._formMixin;
    return state.changes.hasOwnProperty(field) && Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["isEqual"])(state.changes[field], state.data[field]);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (FormMixin);

/***/ }),

/***/ "./src/grid/Component.js":
/*!*******************************!*\
  !*** ./src/grid/Component.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "@babel/runtime/helpers/objectSpread");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var create_react_class__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! create-react-class */ "create-react-class");
/* harmony import */ var create_react_class__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(create_react_class__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/utils */ "./src/common/utils.js");
/* harmony import */ var _mixins_columns__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mixins/columns */ "./src/grid/mixins/columns.js");
/* harmony import */ var _mixins_pagination__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mixins/pagination */ "./src/grid/mixins/pagination.js");
/* harmony import */ var _mixins_statuses__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mixins/statuses */ "./src/grid/mixins/statuses.js");
/* harmony import */ var _mixins_sorting__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mixins/sorting */ "./src/grid/mixins/sorting.js");
/* harmony import */ var _mixins_data__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./mixins/data */ "./src/grid/mixins/data.js");
/* harmony import */ var _mixins_editor__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./mixins/editor */ "./src/grid/mixins/editor.js");
/* harmony import */ var _mixins_ui__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./mixins/ui */ "./src/grid/mixins/ui.js");
/* harmony import */ var _mixins_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./mixins/select */ "./src/grid/mixins/select.js");
/* harmony import */ var _common_ThrottleError__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../common/ThrottleError */ "./src/common/ThrottleError.js");




/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * React table component
 */













var RESET_MODEL = 1 << 0;
var RESET_VIEW_COLUMNS = 1 << 1;
var RESET_SORT = 1 << 2;
var RESET_VIEW_COUNT = 1 << 3;
var RESET_SELECTED_COLUMNS = 1 << 4;
var RESET_BLACK_LIST_MODE = 1 << 5;

var propTypes = function () {
  var sortElementProp = prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.shape({
    column: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
    direction: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.any
  });
  var sortProp = prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([sortElementProp, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.arrayOf(sortElementProp)]);
  return {
    className: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
    model: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.shape({
      read: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func.isRequired,
      update: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
      isValidRecord: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
      getValidationDependency: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
      on: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
      off: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func
    }),
    cols: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,
    viewColumns: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string), prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object]),
    selected: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.array,
    // sort: PropTypes.object,
    page: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number,
    defaultViewCount: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number,
    viewCount: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number,
    viewVariants: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number),
    onChangeViewCount: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
    onChange: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
    onError: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
    onPageLoad: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
    onInit: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
    onDestroy: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
    autoSubmit: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
    height: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number,
    onSelectedChange: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
    onSorting: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
    multipleSorting: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
    selectAllStatus: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.any,
    onToggleSelected: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
    onToggleSelectAll: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
    defaultSort: function defaultSort(props, propName) {
      if (!props.defaultSort) {
        return;
      }

      for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        rest[_key - 2] = arguments[_key];
      }

      var validProp = sortProp.apply(void 0, [props, propName].concat(rest));

      if (validProp) {
        return validProp;
      }

      if (props.hasOwnProperty('sort')) {
        return Error('You can not set "defaultSort" when the "sort" prop is specified');
      }
    },
    sort: function sort(props, propName) {
      if (!props.sort) {
        return;
      }

      for (var _len2 = arguments.length, rest = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        rest[_key2 - 2] = arguments[_key2];
      }

      var validProp = sortProp.apply(void 0, [props, propName].concat(rest));

      if (validProp) {
        return validProp;
      }

      if (!props.onSorting) {
        return Error('You need to define the "onSorting" prop when "sort" is set');
      }
    },
    saveFullRecord: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
    partialErrorChecking: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
    warningsValidator: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.shape({
      isValidRecord: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
      getValidationDependency: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func
    })
  };
}();

var GridComponent = create_react_class__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default()({
  displayName: "GridComponent"
}, _mixins_columns__WEBPACK_IMPORTED_MODULE_7__["default"], _mixins_pagination__WEBPACK_IMPORTED_MODULE_8__["default"], _mixins_statuses__WEBPACK_IMPORTED_MODULE_9__["default"], _mixins_sorting__WEBPACK_IMPORTED_MODULE_10__["default"], _mixins_data__WEBPACK_IMPORTED_MODULE_11__["default"], _mixins_editor__WEBPACK_IMPORTED_MODULE_12__["default"], _mixins_ui__WEBPACK_IMPORTED_MODULE_13__["default"], _mixins_select__WEBPACK_IMPORTED_MODULE_14__["default"], {
  getDefaultProps: function getDefaultProps() {
    return {
      page: 0,
      defaultViewCount: 0,
      partialErrorChecking: false,
      selected: []
    };
  },
  getInitialState: function getInitialState() {
    this._throttledUpdateTable = Object(_common_utils__WEBPACK_IMPORTED_MODULE_6__["throttle"])(this.updateTable);
    this._validateRow = Object(_common_utils__WEBPACK_IMPORTED_MODULE_6__["throttle"])(this._validateRow);

    if (this.props.onInit) {
      this.props.onInit();
    }

    return {
      page: this.props.page,
      viewCount: this.props.defaultViewCount,
      count: 0,
      statusMap: {
        "new": 1 << 0
      },
      statuses: {},
      sort: this._getDefaultSort(),
      data: null,
      changes: {},
      warnings: {},
      errors: {},
      totals: {},
      recordsInfo: {},
      mainIds: [],
      partialErrorChecking: this.props.partialErrorChecking,
      editor: {},
      colsWithEscapeErrors: {},
      selectBlackListMode: false,
      selected: _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(this.props.selected),
      showLoader: false
    };
  },
  componentDidMount: function componentDidMount() {
    this._isMounted = true;

    if (this.props.model) {
      this.props.model.on('create', this._onRecordsCreated);
      this.props.model.on('update', this._setData);
      this.props.model.on('delete', this.updateTable);
    }

    this.updateTable();
  },
  componentWillUnmount: function componentWillUnmount() {
    this._isMounted = false;

    if (this.props.model) {
      this.props.model.off('create', this._onRecordsCreated);
      this.props.model.off('update', this._setData);
      this.props.model.off('delete', this.updateTable);
    }

    if (this.props.onDestroy) {
      this.props.onDestroy();
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var oldProps = this.props;
    var reset = 0;

    if (!Object(_common_utils__WEBPACK_IMPORTED_MODULE_6__["isEqual"])(this.props.model, nextProps.model)) {
      reset |= RESET_MODEL;
    }

    if (!Object(_common_utils__WEBPACK_IMPORTED_MODULE_6__["isEqual"])(this.props.viewColumns, nextProps.viewColumns)) {
      reset |= RESET_VIEW_COLUMNS;
    }

    if (!Object(_common_utils__WEBPACK_IMPORTED_MODULE_6__["isEqual"])(this.props.sort, nextProps.sort)) {
      reset |= RESET_SORT;
    }

    if (this.props.viewCount !== nextProps.viewCount) {
      reset |= RESET_VIEW_COUNT;
    }

    if (!Object(_common_utils__WEBPACK_IMPORTED_MODULE_6__["isEqual"])(this.props.selected, nextProps.selected) || this.props.selectBlackListMode !== nextProps.selectBlackListMode) {
      reset |= RESET_SELECTED_COLUMNS;
    }

    if (!Object(_common_utils__WEBPACK_IMPORTED_MODULE_6__["isEqual"])(this.props.blackListMode, nextProps.blackListMode)) {
      reset |= RESET_BLACK_LIST_MODE;
    }

    if (!reset) {
      return;
    }

    if (nextProps.selected) {
      this.state.selected = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(nextProps.selected);
    }

    this.setState({}, function () {
      if (reset & RESET_SORT || reset & RESET_MODEL || reset & RESET_VIEW_COUNT) {
        if (reset & RESET_MODEL) {
          this.state.data = null;

          if (oldProps.model) {
            oldProps.model.off('create', this._onRecordsCreated);
            oldProps.model.off('update', this._setData);
          }

          if (this.props.model) {
            this.props.model.on('create', this._onRecordsCreated);
            this.props.model.on('update', this._setData);
          }

          this._setPage(0);
        }

        this._throttledUpdateTable()["catch"](function (err) {
          if (!(err instanceof _common_ThrottleError__WEBPACK_IMPORTED_MODULE_15__["default"])) {
            console.error(err);
          }
        });
      } else if (reset & RESET_VIEW_COLUMNS || reset & RESET_SELECTED_COLUMNS || reset & RESET_BLACK_LIST_MODE) {
        this._renderBody();
      }
    });
  },
  renderScrollableGrid: function renderScrollableGrid(gridClassNames) {
    var _this = this;

    var header = this._formHeader();

    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: gridClassNames.join(' ')
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: "wrapper-dgrid-header"
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("table", {
      cellSpacing: "0",
      className: "dgrid-header"
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("colgroup", null, header.colGroup), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("thead", null, header.cols.map(function (row, colKey) {
      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("tr", {
        key: colKey
      }, row.map(function (col, rowKey) {
        var header = _this._getHeaderCellHTML(col.hasOwnProperty('name') ? col.name : col.id);

        var props = {
          key: rowKey,
          className: col.className,
          onClick: col.sort ? _this._sortCol.bind(_this, col.field) : _this._handleHeaderCellClick.bind(_this, col),
          colSpan: col.cols,
          rowSpan: col.rows
        };
        return typeof header === 'string' ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("th", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
          dangerouslySetInnerHTML: {
            __html: header
          }
        })) : react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("th", props, header);
      }));
    })))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      style: {
        maxHeight: this.props.height,
        height: this.props.height
      },
      className: "dgrid-body-wrapper dgrid-scrollable"
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: "dgrid-body"
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: this.state.showLoader ? 'dgrid-loader' : '',
      ref: function ref(loader) {
        return _this.loader = loader;
      }
    }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("table", {
      cellSpacing: "0",
      ref: function ref(body) {
        return _this.body = body;
      },
      onClick: this._handleBodyClick
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("colgroup", null, header.colGroup), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("tbody", {
      className: "dgrid-body-table",
      ref: function ref(tbody) {
        return _this.tBody = tbody;
      }
    })))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: "wrapper-totals"
    }, this._renderTotals(this.props.height)), this._renderPagination());
  },
  renderGrid: function renderGrid(gridClassNames) {
    var _this2 = this;

    var header = this._formHeader();

    gridClassNames = gridClassNames.concat('dgrid-not-scrollable');
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: gridClassNames.join(' ')
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: this.state.showLoader ? 'dgrid-loader' : '',
      ref: function ref(loader) {
        return _this2.loader = loader;
      }
    }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("table", {
      cellSpacing: "0",
      className: "dgrid-body-table",
      ref: function ref(body) {
        return _this2.body = body;
      },
      onClick: this._handleBodyClick
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("colgroup", null, header.colGroup), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("thead", null, header.cols.map(function (row, colKey) {
      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("tr", {
        key: colKey
      }, row.map(function (col, rowKey) {
        var header = _this2._getHeaderCellHTML(col.hasOwnProperty('name') ? col.name : col.id);

        var props = {
          key: rowKey,
          className: col.className,
          onClick: col.sort ? _this2._sortCol.bind(_this2, col.field) : _this2._handleHeaderCellClick.bind(_this2, col),
          colSpan: col.cols,
          rowSpan: col.rows
        };
        return typeof header === 'string' ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("th", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
          dangerouslySetInnerHTML: {
            __html: header
          }
        })) : react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("th", props, header);
      }));
    })), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("tbody", {
      className: "dgrid-body-table",
      ref: function ref(tbody) {
        return _this2.tBody = tbody;
      }
    }), this._renderTotals(this.props.height)), this._renderPagination());
  },
  render: function render() {
    var gridClassNames = ['data-grid'];

    if (this.props.className) {
      gridClassNames.push(this.props.className);
    }

    if (!this.props.height) {
      return this.renderGrid(gridClassNames);
    }

    return this.renderScrollableGrid(gridClassNames);
  }
}));
GridComponent.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (GridComponent);

/***/ }),

/***/ "./src/grid/export/exportGridData.js":
/*!*******************************************!*\
  !*** ./src/grid/export/exportGridData.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_ArgumentsError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/ArgumentsError */ "./src/common/ArgumentsError.js");



/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


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
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = viewColumns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var viewColumn = _step.value;
      var column = columns[viewColumn];
      formattedRecord[viewColumn] = column.render[column.render.length - 1](record);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
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
    for (var _iterator2 = viewColumns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return Object.keys(fields);
}
/**
 * @param {{}} columns
 * @param {string[]} viewColumns
 */


function assertValidViewColumns(columns, viewColumns) {
  if (!viewColumns || !viewColumns.length) {
    throw new _common_ArgumentsError__WEBPACK_IMPORTED_MODULE_2__["default"]('"viewColumns" can`t be empty');
  }

  var notExistColumns = [];
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = viewColumns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
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
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  if (notExistColumns.length) {
    throw new _common_ArgumentsError__WEBPACK_IMPORTED_MODULE_2__["default"]("You trying to get not exist columns: ".concat(notExistColumns.join(', ')));
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
  _exportGridData = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(gridModel, columns, viewColumns, exporter, settings) {
    var result, data;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
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

/* harmony default export */ __webpack_exports__["default"] = (exportGridData);

/***/ }),

/***/ "./src/grid/export/exporters/toCSV.js":
/*!********************************************!*\
  !*** ./src/grid/export/exporters/toCSV.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_toPromise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/toPromise */ "./src/common/toPromise.js");
/* harmony import */ var csv_stringify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! csv-stringify */ "csv-stringify");
/* harmony import */ var csv_stringify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(csv_stringify__WEBPACK_IMPORTED_MODULE_3__);



/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */



function toCSV(_x) {
  return _toCSV.apply(this, arguments);
}

function _toCSV() {
  _toCSV = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(data) {
    var csvData;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Object(_common_toPromise__WEBPACK_IMPORTED_MODULE_2__["default"])(csv_stringify__WEBPACK_IMPORTED_MODULE_3___default.a, true)(data.records.concat([data.totals]), {
              header: true,
              columns: data.columns
            });

          case 2:
            csvData = _context.sent;
            return _context.abrupt("return", {
              mime: 'text/csv',
              data: csvData
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _toCSV.apply(this, arguments);
}

/* harmony default export */ __webpack_exports__["default"] = (toCSV);

/***/ }),

/***/ "./src/grid/export/exporters/toJSON.js":
/*!*********************************************!*\
  !*** ./src/grid/export/exporters/toJSON.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);



/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
function toJSON(_x) {
  return _toJSON.apply(this, arguments);
}

function _toJSON() {
  _toJSON = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(data) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", {
              mime: 'application/json',
              data: {
                records: data.records,
                totals: data.totals
              }
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _toJSON.apply(this, arguments);
}

/* harmony default export */ __webpack_exports__["default"] = (toJSON);

/***/ }),

/***/ "./src/grid/mixins/columns.js":
/*!************************************!*\
  !*** ./src/grid/mixins/columns.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/utils */ "./src/common/utils.js");
/* harmony import */ var react_dom_factories__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom-factories */ "react-dom-factories");
/* harmony import */ var react_dom_factories__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom_factories__WEBPACK_IMPORTED_MODULE_3__);



/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


var GridColumnsMixin = {
  /**
   * Column visibility flag
   *
   * @param   {string}    id  Column ID
   * @returns {boolean}   Column visibility
   * @private
   */
  _isViewColumn: function _isViewColumn(id) {
    if (!this.props.viewColumns) {
      return true;
    }

    if (Array.isArray(this.props.viewColumns)) {
      return this.props.viewColumns.indexOf(id) > -1;
    }

    return this.props.viewColumns[id];
  },

  /**
   * Collect data for table header display
   *
   * @returns {Object} Formed data
   * @private
   */
  _formHeader: function _formHeader() {
    var rows = [[
      /* top */
    ], [
      /* bottom */
    ]];
    var colGroup = [];
    var lastParent = {
      name: ''
    };

    for (var columnId in this.props.cols) {
      // Skip column if it's invisible
      if (!this._isViewColumn(columnId)) {
        continue;
      }

      colGroup.push(react_dom_factories__WEBPACK_IMPORTED_MODULE_3___default.a.col({
        key: columnId,
        width: this.props.cols[columnId].width,
        className: this._getColumnClass(columnId)
      }));
      var classNames = [this._getColumnClass(columnId)];
      var addInfo = {
        id: columnId,
        name: this.props.cols[columnId].name,
        onClick: this.props.cols[columnId].onClick,
        onClickRefs: this.props.cols[columnId].onClickRefs,
        cols: 1,
        rows: 1
      };

      var sortParams = this._getSortParams(columnId);

      if (sortParams) {
        classNames.push("dgrid-".concat(sortParams.direction));
        addInfo.field = sortParams.column;
        addInfo.sort = sortParams.direction;
      }

      addInfo.className = classNames.join(' ');

      if (this.props.cols[columnId].parent) {
        if (this.props.cols[columnId].parent !== lastParent.name) {
          lastParent = rows[0][rows[0].push({
            name: this.props.cols[columnId].parent,
            cols: 1,
            rows: 1
          }) - 1];
        } else {
          lastParent.cols++;
        }

        rows[1].push(addInfo);
      } else {
        lastParent = {
          name: ''
        };
        addInfo.rows = 2;
        rows[0].push(addInfo);
      }
    }

    return {
      cols: rows,
      colGroup: colGroup
    };
  },

  /**
   * Get the names of the parameters that are required to display the grid
   *
   * @return {string[]}
   * @private
   */
  _getFieldsToRender: function _getFieldsToRender() {
    var i;
    var cols = this.props.cols;
    var columns = [];

    for (i in cols) {
      columns = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["union"])(columns, cols[i].render.slice(0, cols[i].render.length - 1));
    }

    return columns;
  },

  /**
   * Does the parameters to display grid
   *
   * @param   {string}  field
   * @return  {boolean}
   * @private
   */
  _isFieldAffectsRender: function _isFieldAffectsRender(field) {
    var i;
    var cols = this.props.cols;

    for (i in cols) {
      if (cols[i].render.indexOf(field) >= 0) {
        return true;
      }
    }

    return false;
  },

  /**
   * Get dependent columns
   *
   * @param   {string}    field
   * @return  {string[]}
   * @private
   */
  _getDependentColumns: function _getDependentColumns(field) {
    var dependentColumns = [];
    var dependencyFields = [field].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(this.props.model.getValidationDependency([field])));

    for (var _i = 0, _Object$entries = Object.entries(this.props.cols); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_Object$entries[_i], 2),
          columnName = _Object$entries$_i[0],
          render = _Object$entries$_i[1].render;

      if (render.some(function (renderField) {
        return dependencyFields.includes(renderField);
      })) {
        dependentColumns.push(columnName);
      }
    }

    return dependentColumns;
  },
  _getColumnClass: function _getColumnClass(id) {
    return this.props.cols[id].className;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (GridColumnsMixin);

/***/ }),

/***/ "./src/grid/mixins/data.js":
/*!*********************************!*\
  !*** ./src/grid/mixins/data.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/validation/ValidationErrors */ "./src/common/validation/ValidationErrors.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/utils */ "./src/common/utils.js");
/* harmony import */ var _common_ThrottleError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/ThrottleError */ "./src/common/ThrottleError.js");




/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */



var GridDataMixin = {
  /**
   * Change table record
   * This method marks changed fields and validates them
   *
   * @param {*}         recordId    Record ID
   * @param {Object}    data        Changed data
   * @param {Function}  cb          CallBack function
   */
  set: function set(recordId, data, cb) {
    //TODO cb does't used
    var row = this._getRowID(recordId);

    this._setRowChanges(row, Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["cloneDeep"])(data), cb);

    if (this.props.autoSubmit || this.props.realtime) {
      if (this.props.realtime) {
        console.warn('Deprecated: Grid prop "realtime" renamed to "autoSubmit"');
      }

      this.save(this.props.onRealtimeSubmit);
    } else if (this.props.onChange) {
      this.props.onChange(this.state.changes, this.state.data);
    }
  },

  /**
   * Get record data
   *
   * @param recordId
   * @return {Object}
   */
  getRecord: function getRecord(recordId) {
    var row = this._getRowID(recordId);

    return Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["cloneDeep"])(this._getRecordWithChanges(row));
  },

  /**
   * Get record changes object
   *
   * @param   {*} recordId Record ID
   * @return  {Object}
   */
  getRecordChanges: function getRecordChanges(recordId) {
    var row = this._getRowID(recordId);

    return this._getRecordChanges(row);
  },

  /**
   * Get record warnings object
   *
   * @param   {*} recordId  Record ID
   * @return  {ValidationErrors}
   * @private
   */
  getRecordWarnings: function getRecordWarnings(recordId) {
    var row = this._getRowID(recordId);

    return this.state.warnings[row] || new _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_3__["default"]();
  },

  /**
   * Get validation warnings
   *
   * @return {Array|null}
   */
  getWarnings: function getWarnings() {
    var result = [];

    for (var i in this.state.warnings) {
      result.push([this.state.recordsInfo[i].id, this.state.warnings[i]]);
    }

    return result.length ? result : null;
  },

  /**
   * Get record errors object
   *
   * @param   {*} recordId  Record ID
   * @return  {ValidationErrors}
   * @private
   */
  getRecordErrors: function getRecordErrors(recordId) {
    var row = this._getRowID(recordId);

    return this._getRecordErrors(row);
  },

  /**
   * Get validation errors
   *
   * @return {Array|null}
   */
  getErrors: function getErrors() {
    var result = [];

    for (var i in this.state.errors) {
      result.push([this.state.recordsInfo[i].id, this.state.errors[i]]);
    }

    return result.length ? result : null;
  },

  /**
   * Get table model
   *
   * @returns {AbstractGridModel}
   */
  getModel: function getModel() {
    return this.props.model;
  },

  /**
   * Save grid changes
   */
  save: function () {
    var _save = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
      var _this = this,
          _context;

      var errors, changes, data, unhandledErrors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _ret, errorHandler;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              errors = this.getErrors(); // Collect all valid changes

              changes = Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["reduce"])(this.state.changes, function (result, rowChanges, row) {
                if (!errors || !errors[row]) {
                  if (_this.props.saveFullRecord) {
                    result[row] = _this._getRecordWithChanges(row);
                  } else {
                    result[row] = {};
                    Object.assign(result[row], rowChanges, Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["pick"])(_this.state.data[row], _this.props.model.getValidationDependency(Object.keys(result[row]))));
                  }
                }

                return result;
              }, {}); // Cancel new record display

              this.removeRecordStatusAll('new'); // Pass changes to table model processing

              _context2.next = 5;
              return this.props.model.update(this._dataObjectToArray(changes));

            case 5:
              data = _context2.sent;

              if (this._isMounted) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return");

            case 8:
              this.state.partialErrorChecking = false;
              unhandledErrors = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 13;

              _loop = function _loop() {
                var record = _step.value;

                var row = _this._getRowID(record[0]); // Skip records that are user changed while data processing


                if (!Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["isEqual"])(_this.state.changes[row], changes[row])) {
                  return "continue";
                }

                if (record[1] instanceof Error) {
                  unhandledErrors.push(record[1]);
                  return "continue";
                } // Process validation errors


                if (record[1] instanceof _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_3__["default"]) {
                  _this.state.errors[row] = record[1];
                  return "continue";
                } // Cancel changed data status of the parameters, that are changed


                Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["forEach"])(changes[row], function (value, field) {
                  if (Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["isEqual"])(value, this.state.changes[row][field])) {
                    delete this.state.changes[row][field];
                  }
                }, _this); // Clear changed data row if it's empty

                if (Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["isEmpty"])(_this.state.changes[row])) {
                  delete _this.state.changes[row];

                  if (!_this._isMainRow(row)) {
                    _this._removeRecord(row);
                  }
                }
              };

              _iterator = data[Symbol.iterator]();

            case 16:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 23;
                break;
              }

              _ret = _loop();

              if (!(_ret === "continue")) {
                _context2.next = 20;
                break;
              }

              return _context2.abrupt("continue", 20);

            case 20:
              _iteratorNormalCompletion = true;
              _context2.next = 16;
              break;

            case 23:
              _context2.next = 29;
              break;

            case 25:
              _context2.prev = 25;
              _context2.t0 = _context2["catch"](13);
              _didIteratorError = true;
              _iteratorError = _context2.t0;

            case 29:
              _context2.prev = 29;
              _context2.prev = 30;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 32:
              _context2.prev = 32;

              if (!_didIteratorError) {
                _context2.next = 35;
                break;
              }

              throw _iteratorError;

            case 35:
              return _context2.finish(32);

            case 36:
              return _context2.finish(29);

            case 37:
              this._renderBody();

              if (this.props.onChange) {
                this.props.onChange(this.state.changes, this.state.data);
              }

              errorHandler = this.props.onError || (_context = console).error.bind(_context);
              unhandledErrors.forEach(function (error) {
                return errorHandler(error);
              });
              return _context2.abrupt("return", data);

            case 42:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee, this, [[13, 25, 29, 37], [30,, 32, 36]]);
    }));

    function save() {
      return _save.apply(this, arguments);
    }

    return save;
  }(),

  /**
   * Clear record changes
   *
   * @param {*} recordId Record ID
   */
  clearRecordChanges: function clearRecordChanges(recordId) {
    var row = this._getRowID(recordId);

    delete this.state.changes[row];
    delete this.state.warnings[row];
    delete this.state.errors[row];

    this._updateRow(row);

    if (this.props.onChange) {
      this.props.onChange(this.state.changes, this.state.data);
    }
  },

  /**
   * Clear all table changes
   */
  clearAllChanges: function clearAllChanges() {
    var i;

    for (i in this.state.data) {
      if (!this._isMainRow(i)) {
        delete this.state.data[i];
        delete this.state.recordsInfo[i];
      }
    }

    this.state.changes = {};
    this.state.statuses = {};
    this.state.warnings = {};
    this.state.errors = {};
    this.state.partialErrorChecking = this.props.partialErrorChecking;

    this._renderBody();

    if (this.props.onChange) {
      this.props.onChange(this.state.changes, this.state.data);
    }
  },

  /**
   * Reset to initial table state
   */
  reset: function reset() {
    this._setPage(0);

    if (!this._isSortingPropsMode()) {
      this._resetSorting();
    }

    this.updateTable();
  },

  /**
   * Get record changes object
   *
   * @param   {string}        row     Row ID
   * @return  {Object}
   */
  _getRecordChanges: function _getRecordChanges(row) {
    if (this.state.changes.hasOwnProperty(row)) {
      return Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["cloneDeep"])(this.state.changes[row]);
    }

    return {};
  },

  /**
   * Set record data
   *
   * @param {*}       recordId  Record ID
   * @param {Object}  data      Data
   * @private
   */
  _setRecordData: function _setRecordData(recordId, data) {
    if (!this._isRecordLoaded(recordId)) {
      return;
    } // TODO done through _dataArrayToObject


    var row = this._getRowID(recordId); // Apply and redraw all record changes


    for (var field in data) {
      this.state.data[row][field] = Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["cloneDeep"])(data[field]);

      this._renderBinds(row, field);
    }
  },

  /**
   * Table row has warning flag
   *
   * @param   {string}        row     Row ID
   * @param   {Array|string}  fields
   * @returns {boolean}
   * @private
   */
  _hasWarning: function _hasWarning(row, fields) {
    return this._checkFieldInValidation(row, fields, this.state.warnings);
  },

  /**
   * Table row has error flag
   *
   * @param   {string}        row     Row ID
   * @param   {Array|string}  fields
   * @returns {boolean}
   * @private
   */
  _hasError: function _hasError(row, fields) {
    return this._checkFieldInValidation(row, fields, this.state.errors);
  },

  /**
   * Table row has error in "validation" object
   *
   * @param   {string}        row
   * @param   {Array|string}  fields
   * @param   {Validation}    validation
   * @returns {boolean}
   * @private
   */
  _checkFieldInValidation: function _checkFieldInValidation(row, fields, validation) {
    var i;

    if (!validation[row]) {
      return false;
    }

    if (this.state.partialErrorChecking && !this.state.changes.hasOwnProperty(row)) {
      return false;
    }

    if (!Array.isArray(fields)) {
      fields = [fields];
    }

    for (i = 0; i < fields.length; i++) {
      if (validation[row].hasError(fields[i])) {
        return true;
      }
    }

    return false;
  },

  /**
   * Table row changed flag
   *
   * @param   {string}        row         Row ID
   * @param   {Array|string}  [fields]
   * @return  {boolean}
   * @private
   */
  _isChanged: function _isChanged(row, fields) {
    var i;

    if (!this.state.changes[row]) {
      return false;
    }

    if (fields) {
      if (!Array.isArray(fields)) {
        fields = [fields];
      }

      for (i = 0; i < fields.length; i++) {
        if (this.state.changes[row].hasOwnProperty(fields[i])) {
          return true;
        }
      }

      return false;
    }

    return true;
  },

  /**
   * Get table row errors object
   *
   * @param   {string} row  Row ID
   * @return  {ValidationErrors}
   * @private
   */
  _getRecordErrors: function _getRecordErrors(row) {
    return this.state.errors[row] || new _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_3__["default"]();
  },

  /**
   * Pass changes to the table
   * This method marks changed fields
   *
   * @param {string}      row         Row ID
   * @param {Object}      data        Changed data
   * @private
   */
  _setRowChanges: function _setRowChanges(row, data) {
    var changes = this.state.changes;

    if (!changes[row]) {
      changes[row] = {};
    }

    changes[row] = Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["getRecordChanges"])(this.props.model, this.state.data[row], changes[row], data);

    if (Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["isEmpty"])(changes[row])) {
      delete changes[row];
    }

    for (var _i = 0, _Object$keys = Object.keys(data); _i < _Object$keys.length; _i++) {
      var column = _Object$keys[_i];

      this._renderBinds(row, column);
    }

    if (this.props.onChange) {
      this.props.onChange(this.state.changes, this.state.data);
    }
  },

  /**
   * Get table record with changes
   *
   * @param {string} row Row ID
   * @returns {Object} Required table data record
   * @private
   */
  _getRecordWithChanges: function _getRecordWithChanges(row) {
    if (this.state.data[row]) {
      return Object.assign({}, this.state.data[row], this.state.changes[row]);
    }

    return null;
  },

  /**
   * Set table data
   *
   * @param {Array}  changes  Changes
   * @private
   */
  _setData: function () {
    var _setData2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(changes) {
      var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, id, data;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // Apply all changes
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context3.prev = 3;
              _iterator2 = changes[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context3.next = 20;
                break;
              }

              _step2$value = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_step2.value, 2), id = _step2$value[0], data = _step2$value[1];

              // Firstly we update the state
              this._setRecordData(id, data); // Then we validate the updated data in state


              _context3.prev = 8;
              _context3.next = 11;
              return this._checkWarnings(id);

            case 11:
              _context3.next = 17;
              break;

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](8);

              if (_context3.t0 instanceof _common_ThrottleError__WEBPACK_IMPORTED_MODULE_5__["default"]) {
                _context3.next = 17;
                break;
              }

              throw _context3.t0;

            case 17:
              _iteratorNormalCompletion2 = true;
              _context3.next = 5;
              break;

            case 20:
              _context3.next = 26;
              break;

            case 22:
              _context3.prev = 22;
              _context3.t1 = _context3["catch"](3);
              _didIteratorError2 = true;
              _iteratorError2 = _context3.t1;

            case 26:
              _context3.prev = 26;
              _context3.prev = 27;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 29:
              _context3.prev = 29;

              if (!_didIteratorError2) {
                _context3.next = 32;
                break;
              }

              throw _iteratorError2;

            case 32:
              return _context3.finish(29);

            case 33:
              return _context3.finish(26);

            case 34:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2, this, [[3, 22, 26, 34], [8, 13], [27,, 29, 33]]);
    }));

    function _setData(_x) {
      return _setData2.apply(this, arguments);
    }

    return _setData;
  }(),

  /**
   * Get record field title that changes column Editor
   *
   * @param       {string}        id  Column ID
   * @returns     {Array|string}     Fields that change Editor
   * @private
   */
  _getBindParam: function _getBindParam(id) {
    return this.props.cols[id].editorField || id;
  },

  /**
   * This method converts data array to the object with keys presented as record ID hash
   *
   * @param   {Array}    arr     Data array
   * @returns {Object}    Object result
   * @private
   */
  _dataArrayToObject: function _dataArrayToObject(arr) {
    var i;
    var records = {};
    var info = {};
    var row;

    for (i = 0; i < arr.length; i++) {
      row = Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["toEncodedString"])(arr[i][0]);
      records[row] = arr[i][1];
      info[row] = {
        id: arr[i][0],
        index: i // Sort index

      };
    }

    return {
      records: records,
      info: info
    };
  },

  /**
   * This method converts data object to the array with keys presented as record ID hash
   *
   * @param   {Object}  obj     Data object
   * @returns {Array}   Array result
   * @private
   */
  _dataObjectToArray: function _dataObjectToArray(obj) {
    var i;
    var arr = [];

    for (i in obj) {
      arr.push([this.state.recordsInfo[i].id, Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["clone"])(obj[i])]);
    }

    return arr;
  },

  /**
   * Is main table row flag
   *
   * @param   {string}    row     Row ID
   * @return  {boolean}
   * @private
   */
  _isMainRow: function _isMainRow(row) {
    return this.state.mainIds.indexOf(row) >= 0;
  },
  _isRecordLoaded: function _isRecordLoaded(recordId) {
    // TODO Can be optimized
    var row = Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["toEncodedString"])(recordId);
    return this.state.data.hasOwnProperty(row);
  },

  /**
   * Get table row ID having record ID
   *
   * @param   {*}       recordId    Record ID
   * @return  {string}  Row ID
   * @private
   */
  _getRowID: function _getRowID(recordId) {
    var row = Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["toEncodedString"])(recordId);

    if (!this.state.data.hasOwnProperty(row)) {
      throw Error('Record with the ID is not contained in the table.');
    }

    return row;
  },

  /**
   * Load model data
   *
   * @param {Object}      settings    Request parameters
   * @private
   */
  _loadData: function () {
    var _loadData2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(settings) {
      var data;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return this.props.model.read(settings);

            case 3:
              data = _context4.sent;
              _context4.next = 10;
              break;

            case 6:
              _context4.prev = 6;
              _context4.t0 = _context4["catch"](0);

              if (_context4.t0 && this.props.onError) {
                this.props.onError(_context4.t0);
              }

              throw _context4.t0;

            case 10:
              if (this.props.onPageLoad) {
                this.props.onPageLoad(data);
              }

              return _context4.abrupt("return", data);

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee3, this, [[0, 6]]);
    }));

    function _loadData(_x2) {
      return _loadData2.apply(this, arguments);
    }

    return _loadData;
  }(),

  /**
   * Find record IDs that need to be displayed additionally
   *
   * @return {Array} Additional IDs array
   * @private
   */
  _getAdditionalIds: function _getAdditionalIds() {
    var additionalIds = this._getRecordsWithStatus();

    var id;

    for (var row in this.state.changes) {
      id = this.state.recordsInfo[row].id;

      if (additionalIds.indexOf(id) < 0) {
        additionalIds.push(id);
      }
    }

    return additionalIds;
  },
  _removeRecord: function _removeRecord(rowId, cb) {
    var touchedChanges = this.state.changes[rowId];

    this._removeTR(rowId); // this.unselectRecord(recordId, true); // TODO Make unselectRecord by rowId method


    delete this.state.data[rowId];
    delete this.state.recordsInfo[rowId];
    delete this.state.changes[rowId];
    delete this.state.warnings[rowId];
    delete this.state.errors[rowId];
    delete this.state.editor[rowId];
    this.setState(this.state, cb ? cb.bind(this) : null);

    if (touchedChanges && this.props.onChange) {
      this.props.onChange(this.state.changes, this.state.data);
    }
  },
  _checkWarnings: function () {
    var _checkWarnings2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee4(row) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee4$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (this.props.warningsValidator) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return");

            case 2:
              return _context5.abrupt("return", this._checkValidatorErrors(row, this.props.warningsValidator, this._getRecordWithChanges, this.state.warnings));

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee4, this);
    }));

    function _checkWarnings(_x3) {
      return _checkWarnings2.apply(this, arguments);
    }

    return _checkWarnings;
  }(),
  _validateRow: function () {
    var _validateRow2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee5(row) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee5$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this._checkValidatorErrors(row, this.props.model, this._getRecordChanges, this.state.errors);

            case 2:
              return _context6.abrupt("return", _context6.sent);

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee5, this);
    }));

    function _validateRow(_x4) {
      return _validateRow2.apply(this, arguments);
    }

    return _validateRow;
  }(),

  /**
   * Check errors in "validator" object
   *
   * @param {string}        row         Row ID
   * @param {Validator}     validator   Validator object
   * @param {Function}      getData     Data provider function
   * @param {{}}            result      Validation result object
   * @private
   */
  _checkValidatorErrors: function () {
    var _checkValidatorErrors2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee6(row, validator, getData, result) {
      var recordId, record, validErrors;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee6$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              recordId = this.state.recordsInfo[row].id;
              record = getData(row);
              _context7.next = 4;
              return validator.isValidRecord(record, recordId);

            case 4:
              validErrors = _context7.sent;

              if (!Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["isEqual"])(record, getData(row))) {
                _context7.next = 9;
                break;
              }

              if (validErrors.isEmpty()) {
                delete result[row];
              } else {
                result[row] = validErrors;
              }

              _context7.next = 9;
              return this._updateRow(row);

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee6, this);
    }));

    function _checkValidatorErrors(_x5, _x6, _x7, _x8) {
      return _checkValidatorErrors2.apply(this, arguments);
    }

    return _checkValidatorErrors;
  }(),

  /**
   * Handler for "create" event of GridModel
   *
   * @param {*[]|*} recordIds
   * @return {void}
   * @private
   */
  _onRecordsCreated: function _onRecordsCreated(recordIds) {
    var _this2 = this;

    if (!Array.isArray(recordIds)) {
      Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["warn"])('Not array recordsIds in "create" event is deprecated');
      recordIds = [recordIds];
    }

    this.updateTable().then(Promise.all(recordIds.map(
    /*#__PURE__*/
    function () {
      var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee7(recordId) {
        var rowId;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (_this2._isRecordLoaded(recordId)) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return");

              case 2:
                rowId = _this2._getRowID(recordId);
                _context8.prev = 3;
                _context8.next = 6;
                return _this2._checkWarnings(rowId);

              case 6:
                _context8.next = 12;
                break;

              case 8:
                _context8.prev = 8;
                _context8.t0 = _context8["catch"](3);

                if (_context8.t0 instanceof _common_ThrottleError__WEBPACK_IMPORTED_MODULE_5__["default"]) {
                  _context8.next = 12;
                  break;
                }

                throw _context8.t0;

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee7, null, [[3, 8]]);
      }));

      return function (_x9) {
        return _ref.apply(this, arguments);
      };
    }())));
  }
};
/* harmony default export */ __webpack_exports__["default"] = (GridDataMixin);

/***/ }),

/***/ "./src/grid/mixins/editor.js":
/*!***********************************!*\
  !*** ./src/grid/mixins/editor.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/utils */ "./src/common/utils.js");
/* harmony import */ var _common_ThrottleError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/ThrottleError */ "./src/common/ThrottleError.js");




/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
 // eslint-disable-line no-unused-vars




var findDOMNode = react_dom__WEBPACK_IMPORTED_MODULE_4___default.a.findDOMNode;
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;
var GridEditorMixin = {
  /**
   * Display Editor in a table cell
   *
   * @param {HTMLElement} element     Cell DOM element
   * @param {string}      row         Row ID
   * @param {string}      column      Column ID
   * @private
   */
  _renderEditor: function _renderEditor(element, row, column) {
    var _this = this;

    var binds = this._getBindParam(column);

    var record = this._getRecordWithChanges(row);

    var value = Object(_common_utils__WEBPACK_IMPORTED_MODULE_5__["at"])(record, binds);
    var focusDone = false;

    if (!Array.isArray(binds)) {
      value = value[0];
    } // Prevent recreate of the opened Editor


    if (this._isEditorVisible(row, column)) {
      return;
    }

    var editorContext = {
      updateField: function updateField(field, nextValue) {
        var data = {};
        data[field] = nextValue;

        _this._setRowChanges(row, data);
      }
    };
    var props = {
      onChange: function onChange(values) {
        _this._onChangeEditor(row, column, values, editorContext, element);
      },
      onFocus: function onFocus() {
        _this._onFocusEditor(row, column);
      },
      onBlur: function onBlur() {
        // Remove Editor
        if (focusDone) {
          _this._unmountEditor(element, row, column);

          _this._onBlurEditor(row);
        }
      },
      onKeyUp: function onKeyUp(e) {
        if (focusDone && [ENTER_KEY, ESCAPE_KEY].includes(e.keyCode)) {
          if (e.keyCode === ESCAPE_KEY) {
            _this._setRowChanges(row, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, column, value));
          }

          _this._unmountEditor(element, row, column);

          _this._onBlurEditor(row);
        }
      },
      value: value
    };
    editorContext.props = props; // Display Editor

    var Component = this.props.cols[column].editor.call(editorContext, record, this);

    if (!Component) {
      return;
    }

    this.state.editor["".concat(row, "_").concat(column)] = react_dom__WEBPACK_IMPORTED_MODULE_4___default.a.render(Component, element, function () {
      element.classList.add('dgrid-input-wrapper');

      if (typeof this.focus === 'function') {
        this.focus();
      } else {
        findDOMNode(this).focus();
      }

      focusDone = true;
    });
  },
  _unmountEditor: function _unmountEditor(element, row, column) {
    react_dom__WEBPACK_IMPORTED_MODULE_4___default.a.unmountComponentAtNode(element);
    delete this.state.editor["".concat(row, "_").concat(column)];
    element.classList.remove('dgrid-input-wrapper');
    var selected = this.isSelected(this.state.recordsInfo[row].id);

    this._renderCell(row, column, selected);
  },
  _onChangeEditor: function _onChangeEditor(row, column, values, editorContext, element) {
    var binds = this._getBindParam(column);

    values = Object(_common_utils__WEBPACK_IMPORTED_MODULE_5__["cloneDeep"])(Object(_common_utils__WEBPACK_IMPORTED_MODULE_5__["parseValueFromEvent"])(values));

    var record = this._getRecordWithChanges(row);

    var context = Object(_common_utils__WEBPACK_IMPORTED_MODULE_5__["cloneDeep"])(editorContext);
    context.props.value = values;
    var Component = this.props.cols[column].editor.call(context, record, this);
    this.state.editor["".concat(row, "_").concat(column)] = react_dom__WEBPACK_IMPORTED_MODULE_4___default.a.render(Component, element);

    if (!Array.isArray(binds)) {
      binds = [binds];
      values = [values];
    }

    this._setRowChanges(row, Object(_common_utils__WEBPACK_IMPORTED_MODULE_5__["zipObject"])(binds, values));
  },
  _onFocusEditor: function _onFocusEditor(row, column) {
    if (!this.state.errors[row]) {
      return;
    }

    var binds = this._getBindParam(column);

    if (!Array.isArray(binds)) {
      binds = [binds];
    }

    binds.forEach(function (field) {
      this.state.errors[row].clearField(field);
    }, this);

    if (this.state.errors[row].isEmpty()) {
      delete this.state.errors[row];
    }
  },
  _onBlurEditor: function () {
    var _onBlurEditor2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(row) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return this._checkWarnings(row);

            case 3:
              _context.next = 9;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context["catch"](0);

              if (_context.t0 instanceof _common_ThrottleError__WEBPACK_IMPORTED_MODULE_6__["default"]) {
                _context.next = 9;
                break;
              }

              throw _context.t0;

            case 9:
              if (!(this.props.autoSubmit || this.props.realtime)) {
                _context.next = 14;
                break;
              }

              if (this.props.realtime) {
                console.warn('Deprecated: Grid prop "realtime" renamed to "autoSubmit"');
              }

              this.save(this.props.onRealtimeSubmit);
              _context.next = 23;
              break;

            case 14:
              _context.prev = 14;
              _context.next = 17;
              return this._validateRow(row);

            case 17:
              _context.next = 23;
              break;

            case 19:
              _context.prev = 19;
              _context.t1 = _context["catch"](14);

              if (_context.t1 instanceof _common_ThrottleError__WEBPACK_IMPORTED_MODULE_6__["default"]) {
                _context.next = 23;
                break;
              }

              throw _context.t1;

            case 23:
              if (this.props.onChange) {
                this.props.onChange(this.state.changes, this.state.data);
              }

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 5], [14, 19]]);
    }));

    function _onBlurEditor(_x) {
      return _onBlurEditor2.apply(this, arguments);
    }

    return _onBlurEditor;
  }(),
  _isEditorVisible: function _isEditorVisible(row, column) {
    return Boolean(this.state.editor["".concat(row, "_").concat(column)]);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (GridEditorMixin);

/***/ }),

/***/ "./src/grid/mixins/pagination.js":
/*!***************************************!*\
  !*** ./src/grid/mixins/pagination.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var GridPaginationMixin = {
  /**
   * Change event handler of displayed rows count in a table
   *
   * @param {Event} event
   */
  handleChangeViewCount: function handleChangeViewCount(event) {
    var count = this.props.viewVariants[event.target.value];

    if (this._isViewCountPropsMode()) {
      this.props.onChangeViewCount(count);
      return;
    }

    this.setViewCount(count);
  },

  /**
   * Move to first page event handler
   *
   * @param {Event} event
   */
  handleFirstPage: function handleFirstPage(event) {
    event.preventDefault();
    this.setPage(0);
  },

  /**
   * Move to last page event handler
   *
   * @param {Event} event
   */
  handleLastPage: function handleLastPage(event) {
    event.preventDefault();
    this.setPage(this.getPagesCount() - 1);
  },

  /**
   * Move to previous page event handler
   *
   * @param {Event} event
   */
  handlePrevPage: function handlePrevPage(event) {
    event.preventDefault();
    this.setPage(this.state.page - 1);
  },

  /**
   * Move to next page event handler
   *
   * @param {Event} event
   */
  handleNextPage: function handleNextPage(event) {
    event.preventDefault();
    this.setPage(this.state.page + 1);
  },

  /**
   * Refresh table handler
   *
   */
  handleRefreshTable: function handleRefreshTable(event) {
    event.preventDefault();
    this.updateTable();
  },

  /**
   * Get current page index number
   *
   * @return {number}
   */
  getCurrentPage: function getCurrentPage() {
    return this.state.page;
  },
  getCountRecords: function getCountRecords() {
    return this.state.count;
  },

  /**
   * Move to other page
   *
   * @param {number}  page     Page index number
   */
  setPage: function setPage(page) {
    this._setPage(page);

    this.updateTable();
  },

  /**
   * Set displayed elements count
   *
   * @param {number} viewCount
   */
  setViewCount: function setViewCount(viewCount) {
    if (this._isViewCountPropsMode()) {
      throw Error('You can not use function "setViewCount" when set prop "viewCount"');
    }

    this.state.viewCount = viewCount;
    this.state.page = this._checkPage(this.state.page, viewCount, this.state.count);
    this.updateTable();
  },

  /**
   * Get pages count
   *
   * @return {number}
   */
  getPagesCount: function getPagesCount() {
    var viewCount = this.getViewCount();
    return viewCount ? Math.ceil(this.state.count / viewCount) : 1;
  },
  getViewCount: function getViewCount() {
    if (this._isViewCountPropsMode()) {
      return this.props.viewCount;
    }

    return this.state.viewCount;
  },
  _setPage: function _setPage(page) {
    this.state.page = this._checkPage(page, this.state.viewCount, this.state.count);
  },
  _checkPage: function _checkPage(page, view, count) {
    if (page * view >= count) {
      page = view ? Math.ceil(count / view) - 1 : 0;
    }

    return Math.max(0, page);
  },
  _isViewCountPropsMode: function _isViewCountPropsMode() {
    return this.props.hasOwnProperty('viewCount');
  },
  _renderPagination: function _renderPagination() {
    var viewCount = this.getViewCount();
    return Boolean(viewCount) && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dgrid-footer"
    }, Boolean(this.props.viewVariants) && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: "0",
      className: "dgrid-pagination-page-size"
    }, " Page Size "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: "1",
      className: "dgrid-pagination-view-variants"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      className: "dgrid-pagination-view-variants-select",
      value: this.props.viewVariants.indexOf(viewCount),
      onChange: this.handleChangeViewCount
    }, this.props.viewVariants.map(function (option, key) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: key,
        value: key
      }, option);
    }, this)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#",
      className: "btn-first-page",
      onClick: this.handleFirstPage
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#",
      className: "btn-prev-page",
      onClick: this.handlePrevPage
    }), Boolean(this.state.count) && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.state.page * viewCount + 1, ' - ', Math.min((this.state.page + 1) * viewCount, this.state.count), ' of ', this.state.count), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#",
      className: "btn-next-page",
      onClick: this.handleNextPage
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#",
      className: "btn-last-page",
      onClick: this.handleLastPage
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#",
      className: "btn-refresh-page",
      onClick: this.handleRefreshTable
    }));
  }
};
/* harmony default export */ __webpack_exports__["default"] = (GridPaginationMixin);

/***/ }),

/***/ "./src/grid/mixins/select.js":
/*!***********************************!*\
  !*** ./src/grid/mixins/select.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/utils */ "./src/common/utils.js");
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Grid mixin, responsible for rows Select
 */

var GridSelectMixin = {
  /**
   * Select only these records
   *
   * @param {Array}   selectedIds       Record IDs
   * @param {boolean} [blackListMode]   Is black list mode
   */
  setSelectedRecords: function setSelectedRecords(selectedIds, blackListMode) {
    this.state.selected = Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["clone"])(selectedIds);

    if (typeof blackListMode === 'boolean') {
      this.state.selectBlackListMode = blackListMode;
    }

    this.forceUpdate();

    this._renderBody();

    this._emitChangeSelectedNum();
  },

  /**
   * Select a record
   *
   * @param {*}    recordId       Record ID
   * @param {boolean}             [ignoreBlackList=false]     Ignore BlackList mode
   */
  selectRecord: function selectRecord(recordId, ignoreBlackList) {
    var _this = this;

    var row = Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["toEncodedString"])(recordId);

    if (this.state.selectBlackListMode && !ignoreBlackList) {
      return this.unselectRecord(recordId, true);
    }

    if (Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["indexOf"])(this.state.selected, recordId) < 0) {
      this.state.selected.push(recordId);

      if (this.state.selected.length === this.state.count) {
        if (this.state.selectBlackListMode) {
          this.unselectAll();
        } else {
          this.selectAll();
        }

        return;
      }
    }

    this._updateRow(row).then(function () {
      _this._emitChangeSelectedNum();
    });
  },

  /**
   * Unselect record
   *
   * @param {number|string}   recordId                    Record ID
   * @param {boolean}         [ignoreBlackList=false]     Ignore BlackList mode
   */
  unselectRecord: function unselectRecord(recordId, ignoreBlackList) {
    var _this2 = this;

    var row = Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["toEncodedString"])(recordId);

    if (this.state.selectBlackListMode && !ignoreBlackList) {
      return this.selectRecord(recordId, true);
    }

    var pos = Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["indexOf"])(this.state.selected, recordId);

    if (pos >= 0) {
      this.state.selected.splice(pos, 1);
    }

    this._updateRow(row).then(function () {
      _this2._emitChangeSelectedNum();
    });
  },

  /**
   * Is selected row flag in accordance with
   * current select mode (whitelist/blacklist).
   *
   * @param   {number|string}     recordId    Record ID
   * @returns {boolean}           Is selected row flag
   */
  isSelected: function isSelected(recordId) {
    var selected = Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["indexOf"])(this.state.selected, recordId) >= 0;

    if (this.state.selectBlackListMode) {
      return !selected;
    }

    return selected;
  },

  /**
   * Switch "select"
   *
   * @param {*}   recordId  Record ID
   */
  toggleSelected: function toggleSelected(recordId) {
    if (this.props.onToggleSelected) {
      return this.props.onToggleSelected(recordId);
    }

    if (this.isSelected(recordId)) {
      this.unselectRecord(recordId);
    } else {
      this.selectRecord(recordId);
    }
  },

  /**
   * Switch records selection mode
   */
  toggleSelectAll: function toggleSelectAll() {
    if (this.props.onToggleSelectAll) {
      return this.props.onToggleSelectAll();
    }

    if (this.state.selectBlackListMode) {
      this.unselectAll();
    } else {
      this.selectAll();
    }
  },

  /**
   * Select all records
   * Switches records selection mode to "blacklist"
   */
  selectAll: function selectAll() {
    this.state.selectBlackListMode = true;
    this.state.selected = [];

    this._renderBody();

    this._emitChangeSelectedNum();
  },

  /**
   * Unselect all records status
   * Switches records selection mode to "whitelist"
   */
  unselectAll: function unselectAll() {
    this.state.selectBlackListMode = false;
    this.state.selected = [];

    this._renderBody();

    this._emitChangeSelectedNum();
  },

  /**
   * Get current records selection mode
   *
   * @returns {boolean} Records selection mode. true - Blacklist; false - Whitelist
   */
  isSelectBlackMode: function isSelectBlackMode() {
    return this.state.selectBlackListMode;
  },

  /**
   * Get all selected records
   *
   * @returns {Array}   Record IDs array
   */
  getAllSelected: function getAllSelected() {
    return Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["clone"])(this.state.selected);
  },
  getSelectAllStatus: function getSelectAllStatus() {
    return this.props.selectAllStatus;
  },

  /**
   * Trigger selected records count change handler
   *
   * @private
   */
  _emitChangeSelectedNum: function _emitChangeSelectedNum() {
    if (this.props.onSelectedChange) {
      var selectedCount = this.state.selected.length;

      if (this.state.selectBlackListMode) {
        selectedCount = this.getCountRecords() - selectedCount;
      }

      this.props.onSelectedChange(this.getAllSelected(), selectedCount);
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (GridSelectMixin);

/***/ }),

/***/ "./src/grid/mixins/sorting.js":
/*!************************************!*\
  !*** ./src/grid/mixins/sorting.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/utils */ "./src/common/utils.js");
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var GridSortingMixin = {
  /**
   * Sort by column
   *
   * @param {string} column
   * @param {string} direction
   */
  sort: function sort(column, direction) {
    if (this._isSortingPropsMode()) {
      throw Error('You can not use function "sort" when set prop "sort"');
    }

    var sort = {
      column: column,
      direction: direction
    };

    if (this.props.multipleSorting) {
      this.state.sort.push(sort);
    } else {
      this.state.sort = sort;
    }

    this.setPage(0);

    if (this.props.onSorting) {
      this.props.onSorting(this.state.sort, column, direction);
    }
  },

  /**
   * Get sort direction
   *
   * @return {object|object[]}
   */
  getSortDirection: function getSortDirection() {
    if (this._isSortingPropsMode()) {
      return this.props.sort;
    }

    return this.state.sort;
  },

  /**
   * Reset to default sort parameters
   */
  resetSorting: function resetSorting() {
    if (this._isSortingPropsMode()) {
      throw Error('You can not use function "resetSorting" when set prop "sort"');
    }

    this._resetSorting();

    this.forceUpdate();
  },

  /**
   * Reset to default sort parameters
   * @private
   */
  _resetSorting: function _resetSorting() {
    var sort = this._getDefaultSort();

    if (this._isSortingPropsMode()) {
      this.onSorting(sort);
      return;
    }

    this.state.sort = sort;
  },

  /**
   * Use column name for table sort
   *
   * @param {string} column  Column name
   * @private
   */
  _sortCol: function _sortCol(column) {
    var newOrder;
    var cycle = this.props.cols[column].sortCycle;
    var newSorts = Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["clone"])(this.getSortDirection());
    var sortElement = {
      column: column
    };
    var currentSortIndex;
    var currentSort;

    if (this.props.multipleSorting) {
      // Find an element among the other sorts
      currentSortIndex = Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["findIndex"])(newSorts, function (sort) {
        return sort.column === column;
      });

      if (currentSortIndex >= 0) {
        currentSort = newSorts[currentSortIndex]; // Determine the direction of sorting

        if (currentSortIndex < newSorts.length - 1) {
          newOrder = cycle[0];
        } else {
          // If the item is the last one, select the next direction of sorting
          newOrder = cycle[(cycle.indexOf(currentSort.direction) + 1) % cycle.length];
        }

        if (newOrder === 'default') {
          // Remove item from the sorts
          newSorts.splice(currentSortIndex, 1);
        } else if (currentSortIndex === newSorts.length - 1) {
          // Set new direction, if the last element
          currentSort.direction = newOrder;
        } else {
          // Move the item to the end, if it is already in sorts
          newSorts.splice(currentSortIndex, 1);
          sortElement.direction = newOrder;
          newSorts.push(sortElement);
        }
      } else {
        // Add new element
        sortElement.direction = newOrder = cycle[0];
        newSorts.push(sortElement);
      }
    } else {
      if (newSorts && newSorts.column === column) {
        // Select the next direction of sorting
        newOrder = cycle[(cycle.indexOf(newSorts.direction) + 1) % cycle.length];
      } else {
        newOrder = cycle[0];
      }

      if (newOrder === 'default') {
        newSorts = null;
      } else {
        sortElement.direction = newOrder;
        newSorts = sortElement;
      }
    }

    if (this.props.onSorting) {
      this.props.onSorting(newSorts, column, newOrder);
    }

    if (!this._isSortingPropsMode()) {
      this.state.sort = newSorts;
      this.setPage(0);
    }
  },

  /**
   * Get initial sort state
   *
   * @returns {Array} Initial sort state
   * @private
   */
  _getDefaultSort: function _getDefaultSort() {
    if (this.props.defaultSort) {
      return Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["cloneDeep"])(this.props.defaultSort);
    }

    return null;
  },

  /**
   * Get current mode and column sort parameter
   *
   * @param   column                                  Column ID
   * @returns {{field: {string}, sort: {string}}|{}}  Sort parameter and mode
   * @private
   */
  _getSortParams: function _getSortParams(column) {
    var params = {
      column: column
    };
    var sorts = this.getSortDirection();
    var sortIndex;

    if (!this.props.cols[column].sortCycle) {
      return null;
    }

    if (!sorts) {
      params.direction = 'default';
      return params;
    }

    if (this.props.multipleSorting) {
      sortIndex = Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["findIndex"])(sorts, function (sort) {
        return sort.column === params.column;
      });

      if (sortIndex < 0 || sortIndex < sorts.length - 1) {
        params.direction = 'default';
      } else {
        params.direction = sorts[sortIndex].direction;
      }

      return params;
    }

    if (sorts.column === column) {
      params.direction = sorts.direction;
    } else {
      params.direction = 'default';
    }

    return params;
  },

  /**
   * Does sorting using props
   *
   * @return {boolean}
   * @private
   */
  _isSortingPropsMode: function _isSortingPropsMode() {
    return this.props.hasOwnProperty('sort');
  },

  /**
   * Convert sorting to array
   *
   * @return {Object[]|Object} sorts
   * @private
   */
  _sortingToArray: function _sortingToArray() {
    function toArray(sort) {
      return [sort.column, sort.direction];
    }

    var direction = this.getSortDirection();

    if (!direction) {
      return null;
    }

    if (this.props.multipleSorting) {
      if (!direction.length) {
        return null;
      }

      return direction.map(toArray);
    }

    return [toArray(direction)];
  }
};
/* harmony default export */ __webpack_exports__["default"] = (GridSortingMixin);

/***/ }),

/***/ "./src/grid/mixins/statuses.js":
/*!*************************************!*\
  !*** ./src/grid/mixins/statuses.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/utils */ "./src/common/utils.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


/**
 * Grid mixin, responsible for row statuses processing
 */

var GridStatusesMixin = {
  /**
   * Add record status
   *
   * @param {*}    recordId    Record ID
   * @param {string}           status      Record status
   */
  addRecordStatus: function addRecordStatus(recordId, status) {
    var row = Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["toEncodedString"])(recordId); // If list does not contain the record, mark its status as empty

    if (!this.state.statuses.hasOwnProperty(row)) {
      this.state.statuses[row] = {
        id: recordId,
        sum: 0
      };
    }

    this.state.statuses[row].sum |= this._getStatusBit(status);
    var elem = Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["findDOMNode"])(this.body).querySelector("tr[key=\"".concat(row, "\"]"));

    if (elem) {
      elem.classList.add(status);
    } else {
      this.updateTable();
    }
  },

  /**
   * Add status to records group
   *
   * @param {Array}      recordIds   Record IDs array
   * @param {string}     status      Status
   */
  addRecordStatusGroup: function addRecordStatusGroup(recordIds, status) {
    var bit = this._getStatusBit(status);

    var needTableUpdate;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = recordIds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
        var row = Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["toEncodedString"])(id);

        if (!this.state.statuses.hasOwnProperty(row)) {
          this.state.statuses[row] = {
            id: id,
            sum: 0
          };
        }

        this.state.statuses[row].sum |= bit;

        if (this.state.data[row]) {
          this._updateRow(row);

          continue;
        }

        needTableUpdate = true;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (needTableUpdate) {
      this.updateTable();
    }
  },

  /**
   * Remove record status
   *
   * @param {*}       recordId    Record ID
   * @param {string}  status      Record status
   */
  removeRecordStatus: function removeRecordStatus(recordId, status) {
    var bit = this._getStatusBit(status);

    var rowId = Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["toEncodedString"])(recordId); // Cancel method execution if record has no statuses

    if (!this.state.statuses[rowId]) {
      return;
    } // Remove status if record has it


    if (this.state.statuses[rowId].sum & bit) {
      this.state.statuses[rowId].sum ^= bit;

      if (!this.state.statuses[rowId].sum) {
        // Remove table record if it's extra
        if (!this._isMainRow(rowId)) {
          this._removeRecord(rowId);
        }

        delete this.state.statuses[rowId];
      }
    } // Remove element's class


    var elem = Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["findDOMNode"])(this.body).querySelector("tr[key=\"".concat(rowId, "\"]"));

    if (elem) {
      elem.classList.remove(status);
    }
  },

  /**
   * Check record status presence
   *
   * @param   {*}       recordId    Record ID
   * @param   {number}  status      Record status
   * @returns {boolean} Record has status flag
   */
  hasRecordStatus: function hasRecordStatus(recordId, status) {
    var row = Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["toEncodedString"])(recordId);

    if (this.state.statuses[row]) {
      return (this.state.statuses[row].sum & this._getStatusBit(status)) > 0;
    }

    return false;
  },

  /**
   * Get all record IDs that have the status
   *
   * @param {number}  status  Status
   * @returns {Array} Record IDs array
   */
  getAllWithStatus: function getAllWithStatus(status) {
    var i;
    var records = [];

    var bit = this._getStatusBit(status);

    for (i in this.state.statuses) {
      if (this.state.statuses[i].sum & bit) {
        records.push(this.state.statuses[i].id);
      }
    }

    return records;
  },

  /**
   * Remove records status
   *
   * @param {string}      status  Status
   */
  removeRecordStatusAll: function removeRecordStatusAll(status) {
    var i;

    var bit = this._getStatusBit(status);

    for (i in this.state.statuses) {
      if (this.state.statuses[i].sum & bit) {
        this.state.statuses[i].sum ^= bit;
      }

      if (!this.state.statuses[i].sum) {
        if (!this._isMainRow(i) && !this._isChanged(i)) {
          this._removeRecord(i);
        }

        delete this.state.statuses[i];
      }
    }

    var elem = Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["findDOMNode"])(this.body).querySelector(".dgrid-body tr.".concat(status));

    if (elem) {
      elem.classList.remove(status);
    }
  },

  /**
   * Get all status names that are applied to the row
   *
   * @param   {string}    row    Row ID
   * @return  {Array}  Status names array
   * @private
   */
  _getRowStatusNames: function _getRowStatusNames(row) {
    var names = [];
    var statuses = this.state.statuses[row] && this.state.statuses[row].sum;

    if (!statuses) {
      return [];
    }

    for (var i in this.state.statusMap) {
      if (statuses & this.state.statusMap[i]) {
        names.push(i);
      }
    }

    return names;
  },

  /**
   * Get status as a bit using its text name
   *
   * @param       {string}    statusName  Status name
   * @return      {number}    Bit
   * @private
   */
  _getStatusBit: function _getStatusBit(statusName) {
    var status;
    var offset;

    if (this.state.statusMap.hasOwnProperty(statusName)) {
      status = this.state.statusMap[statusName];
    } else {
      // TODO offset stored in the state, I remove the utils.size
      offset = Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["size"])(this.state.statusMap);

      if (offset > 30) {
        throw Error('Status quantity exceeds 30');
      }

      status = this.state.statusMap[statusName] = 1 << offset;
    }

    return status;
  },

  /**
   * Get record IDs that have a status
   *
   * @return {Array}
   * @private
   */
  _getRecordsWithStatus: function _getRecordsWithStatus() {
    var ids = [];
    var i;

    for (i in this.state.statuses) {
      ids.push(this.state.statuses[i].id);
    }

    return ids;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (GridStatusesMixin);

/***/ }),

/***/ "./src/grid/mixins/ui.js":
/*!*******************************!*\
  !*** ./src/grid/mixins/ui.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "@babel/runtime/helpers/typeof");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_toPromise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/toPromise */ "./src/common/toPromise.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/utils */ "./src/common/utils.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _common_ThrottleError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common/ThrottleError */ "./src/common/ThrottleError.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_8__);




/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */






var GridUIMixin = {
  /**
   * Table content click event handler
   *
   * @param {Event} event
   */
  _handleBodyClick: function _handleBodyClick(event) {
    var target = event.target;
    var refParent = Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["parents"])(target, '[ref]')[0];
    var element;

    if (target.classList.contains('dgrid-cell')) {
      element = event.target;
    } else {
      element = Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["parents"])(target, 'td.dgrid-cell')[0];
    }

    if (element && !(refParent && refParent.hasAttribute('disabled'))) {
      this._handleCellClick(event, element, (refParent || event.target).getAttribute('ref'));
    }
  },

  /**
   * Cell click handler
   *
   * @param {Event}           event       Event object
   * @param {HTMLElement}     element     Cell DOM element
   * @param {string}          ref         Click handler name in the table configuration
   */
  _handleCellClick: function _handleCellClick(event, element, ref) {
    var colId = element.getAttribute('key');
    var row = element.parentNode.getAttribute('key');
    var columnConfig = this.props.cols[colId];
    var recordId = this.state.recordsInfo[row].id;

    var record = this._getRecordWithChanges(row); // Trigger click handler on the table configuration


    if (ref) {
      columnConfig.onClickRefs[ref](event, recordId, record, this);
    } else if (columnConfig.onClick) {
      columnConfig.onClick(event, recordId, record, this);
    } // Open cell editor


    if (this.props.cols[colId].editor) {
      this._renderEditor(element, row, colId);
    }
  },
  // TODO Deprecated
  _handleHeaderCellClick: function _handleHeaderCellClick(col, event) {
    var target = event.target;
    var refParent = Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["parents"])(target, '[ref]')[0];
    var ref = (refParent || target).getAttribute('ref');
    var handler;

    if (ref && col.onClickRefs) {
      handler = col.onClickRefs[ref];

      if (handler) {
        return handler(event, this);
      }
    }

    if (col.onClick) {
      col.onClick(event, this);
    }
  },

  /**
   * Fetch server data
   */
  updateTable: function () {
    var _updateTable = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
      var viewCount, obj, page, data, extra, recordIds;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.setState({
                showLoader: true
              });

              if (this.props.model) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              viewCount = this.getViewCount();
              _context.prev = 4;
              _context.next = 7;
              return this._loadData({
                limit: viewCount,
                offset: this.state.page * viewCount,
                sort: this._sortingToArray(),
                fields: this._getFieldsToRender(),
                extra: this._getAdditionalIds()
              });

            case 7:
              obj = _context.sent;
              _context.next = 15;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](4);

              if (_context.t0 instanceof _common_ThrottleError__WEBPACK_IMPORTED_MODULE_7__["default"]) {
                _context.next = 14;
                break;
              }

              throw _context.t0;

            case 14:
              return _context.abrupt("return");

            case 15:
              if (this._isMounted) {
                _context.next = 17;
                break;
              }

              return _context.abrupt("return");

            case 17:
              if (!(this.getViewCount() && !obj.hasOwnProperty('count'))) {
                _context.next = 19;
                break;
              }

              throw new Error('Incorrect response from GridModel. "response.count" not defined');

            case 19:
              // If required page is not included in the range of existing pages,
              // request existing in a moment page
              page = this._checkPage(this.state.page, this.getViewCount(), obj.count);

              if (!(page !== this.state.page)) {
                _context.next = 24;
                break;
              }

              this.state.page = page;
              this.updateTable();
              return _context.abrupt("return");

            case 24:
              data = this._dataArrayToObject(obj.records);
              extra = this._dataArrayToObject(obj.extraRecords || []);
              recordIds = Object.keys(data.records).concat(Object.keys(extra.records));
              _context.next = 29;
              return Object(_common_toPromise__WEBPACK_IMPORTED_MODULE_3__["default"])(this.setState.bind(this), true)({
                data: Object.assign({}, data.records, extra.records),
                mainIds: Object.keys(data.records),
                count: obj.count,
                totals: obj.totals,
                recordsInfo: Object.assign({}, extra.info, data.info),
                errors: Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["pick"])(this.state.errors, recordIds),
                changes: Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["pick"])(this.state.changes, recordIds),
                statuses: Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["pick"])(this.state.statuses, recordIds)
              });

            case 29:
              this._renderBody();

              this.setState({
                showLoader: false
              });

            case 31:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[4, 10]]);
    }));

    function updateTable() {
      return _updateTable.apply(this, arguments);
    }

    return updateTable;
  }(),
  _getHeaderCellHTML: function _getHeaderCellHTML(columnName) {
    var cellHtml = typeof columnName === 'function' ? columnName(this) : columnName;

    if (cellHtml === undefined) {
      return '';
    }

    return cellHtml;
  },
  _escapeRecord: function _escapeRecord(columnId, record) {
    var field;
    var type;
    var i;
    var escapedRecord = {};
    var column = this.props.cols[columnId];
    var needEscaping = !column.hasOwnProperty('escape') || column.escape;
    var fields = column.render.slice(0, -1);

    for (i = 0; i < fields.length; i++) {
      field = fields[i];
      type = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(record[field]);

      if (needEscaping) {
        if (type === 'string') {
          escapedRecord[field] = Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["escape"])(record[field]);
          continue;
        }

        if (type === 'object' && record[field] && !this.state.colsWithEscapeErrors[columnId]) {
          this.state.colsWithEscapeErrors[columnId] = true;
          console.error("UIKernel.Grid warning: " + "You send record with fields of Object type in escaped column \"".concat(columnId, "\". ") + "To use Objects, set column config \"escape\" to false, " + "and escape \"".concat(columnId, "\" field in render function by yourself"));
        }
      }

      escapedRecord[field] = record[field];
    }

    return escapedRecord;
  },

  /**
   * Get table cell HTML
   *
   * @param   {number}   columnId       Column ID
   * @param   {Object}   record         Table record (initial record + changes)
   * @param   {boolean}  selected       "Selected" row status
   * @param   {Object}   initialRecord  Initial record
   * @returns {string}   Table cell HTML
   * @private
   */
  _getCellHTML: function _getCellHTML(columnId, record, selected, initialRecord) {
    var render = Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["last"])(this.props.cols[columnId].render);
    var cellHtml = render(this._escapeRecord(columnId, record), selected, this._escapeRecord(columnId, initialRecord), this);
    return "".concat(Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(cellHtml) ? cellHtml : '');
  },

  /**
   * Get table row HTML
   *
   * @param       {number}    rowId         Row ID
   * @param       {string}    className   <TR> class attribute
   * @returns     {string}    Table row HTML
   * @private
   */
  _getRowHTML: function _getRowHTML(rowId, className) {
    var colId;

    var record = this._getRecordWithChanges(rowId);

    var initialRecord = this.state.data[rowId] || null;
    var selected = this.isSelected(this.state.recordsInfo[rowId].id);
    var gridRowClass = classnames__WEBPACK_IMPORTED_MODULE_8___default()(className, this._getRowStatusNames(rowId).join(' '), {
      'dgrid__row_selected': selected
    });
    var html = "<tr key=\"".concat(rowId, "\" class=\"").concat(gridRowClass, "\">");

    for (var _i = 0, _Object$keys = Object.keys(this.props.cols); _i < _Object$keys.length; _i++) {
      colId = _Object$keys[_i];

      if (this._isViewColumn(colId)) {
        var gridCellClass = classnames__WEBPACK_IMPORTED_MODULE_8___default()(this._getColumnClass(colId), {
          'dgrid-cell': true,
          'dgrid-changed': this._isChanged(rowId, this._getBindParam(colId)),
          'dgrid-error': this._hasError(rowId, this._getBindParam(colId)),
          'dgrid-warning': this._hasWarning(rowId, this._getBindParam(colId))
        });
        html += "\n          <td key=\"".concat(colId, "\" class=\"").concat(gridCellClass, "\">\n            ").concat(this._getCellHTML(colId, record, selected, initialRecord), "\n          </td>");
      }
    }

    return "".concat(html, "</tr>");
  },

  /**
   * Redraw table content totally
   *
   * @private
   */
  _renderBody: function _renderBody() {
    if (!this.state.data) {
      return;
    }

    var i;
    var row;
    var htmlExtra = '';
    var htmlBody = '';
    var sorted = Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["pairs"])(this.state.recordsInfo).sort(function (a, b) {
      return a[1].index - b[1].index;
    });

    for (i = 0; i < sorted.length; i++) {
      row = sorted[i][0];

      if (this._isMainRow(row)) {
        htmlBody += this._getRowHTML(row);
      } else if (this._isChanged(row) || this._getRowStatusNames(row).length) {
        htmlExtra += this._getRowHTML(row, 'others');
      }
    }

    this.tBody.innerHTML = htmlExtra + htmlBody;
  },

  /**
   * Display model changes
   *
   * @param {string} row      Row ID
   * @param {string} param    Model parameter
   * @private
   */
  _renderBinds: function _renderBinds(row, param) {
    // If parameter does not affect on the redraw, do nothing
    if (!this._isFieldAffectsRender(param)) {
      return;
    }

    var selected = this.isSelected(this.state.recordsInfo[row].id); // Update column dependencies

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this._getDependentColumns(param)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var column = _step.value;

        if (this._isViewColumn(column) && !this._isEditorVisible(row, column)) {
          this._renderCell(row, column, selected);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  },
  _removeTR: function _removeTR(rowId) {
    Object(react_dom__WEBPACK_IMPORTED_MODULE_5__["findDOMNode"])(this.body).removeRow(rowId);
  },
  _renderTotals: function _renderTotals(isScrollable) {
    var totalsDisplayed = false;
    var i;
    var className;
    var totalsRowHTML = '';

    var header = this._formHeader(); // If data for result line display exists, form it


    if (this.state.totals) {
      for (var _i2 = 0, _Object$keys2 = Object.keys(this.props.cols); _i2 < _Object$keys2.length; _i2++) {
        i = _Object$keys2[_i2];

        if (!this._isViewColumn(i)) {
          continue;
        }

        className = this.props.cols[i].className;

        if (className) {
          totalsRowHTML += "<td class=\"".concat(className, "\">");
        } else {
          totalsRowHTML += '<td>';
        }

        if (this.state.totals.hasOwnProperty(i)) {
          totalsRowHTML += this._getCellHTML(i, this.state.totals, false, this.state.totals);
          totalsDisplayed = true;
        }

        totalsRowHTML += '</td>';
      }
    }

    if (!totalsDisplayed) {
      return null;
    }

    if (isScrollable) {
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("table", {
        cellSpacing: "0",
        className: "dgrid-totals"
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("colgroup", null, header.colGroup), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("tr", {
        dangerouslySetInnerHTML: {
          __html: totalsRowHTML
        }
      }));
    }

    return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("tfoot", {
      className: "dgrid-totals"
    }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("tr", {
      dangerouslySetInnerHTML: {
        __html: totalsRowHTML
      }
    }));
  },
  _renderCell: function _renderCell(rowId, column, isSelected) {
    var _cell$classList;

    var cell = Object(react_dom__WEBPACK_IMPORTED_MODULE_5__["findDOMNode"])(this.body).querySelector("tr[key=\"".concat(rowId, "\"] td[key=").concat(column, "]"));
    var initialRecord = this.state.data[rowId] || null;

    var cellHTML = this._getCellHTML(column, this._getRecordWithChanges(rowId), isSelected, initialRecord);

    try {
      cell.innerHTML = cellHTML;
    } catch (e) {// Sometimes it is possible a situation when rerendering of the cell is called in the middle of performing of an
      // event in that cell which may cause an error like "DOMException: The node to be removed is no longer a child
      // of this node", so just ignore it
    }

    cell.classList.remove('dgrid-changed', 'dgrid-error', 'dgrid-warning');
    var cellClassList = [];

    if (this._isChanged(rowId, this._getBindParam(column))) {
      cellClassList.push('dgrid-changed');
    }

    if (this._hasError(rowId, this._getBindParam(column))) {
      cellClassList.push('dgrid-error');
    }

    if (this._hasWarning(rowId, this._getBindParam(column))) {
      cellClassList.push('dgrid-warning');
    }

    (_cell$classList = cell.classList).add.apply(_cell$classList, cellClassList);
  },
  _updateRow: function () {
    var _updateRow2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(row) {
      var selected, viewColumns, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, viewColumn;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.state.data) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              if (!this.state.data[row]) {
                _context2.next = 26;
                break;
              }

              selected = this.isSelected(this.state.recordsInfo[row].id);
              viewColumns = Object.keys(this.props.cols).filter(this._isViewColumn);
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context2.prev = 8;

              for (_iterator2 = viewColumns[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                viewColumn = _step2.value;

                if (!this._isEditorVisible(row, viewColumn)) {
                  this._renderCell(row, viewColumn, selected);
                }
              }

              _context2.next = 16;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](8);
              _didIteratorError2 = true;
              _iteratorError2 = _context2.t0;

            case 16:
              _context2.prev = 16;
              _context2.prev = 17;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 19:
              _context2.prev = 19;

              if (!_didIteratorError2) {
                _context2.next = 22;
                break;
              }

              throw _iteratorError2;

            case 22:
              return _context2.finish(19);

            case 23:
              return _context2.finish(16);

            case 24:
              _context2.next = 28;
              break;

            case 26:
              _context2.next = 28;
              return this.updateTable();

            case 28:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[8, 12, 16, 24], [17,, 19, 23]]);
    }));

    function _updateRow(_x) {
      return _updateRow2.apply(this, arguments);
    }

    return _updateRow;
  }()
};
/* harmony default export */ __webpack_exports__["default"] = (GridUIMixin);

/***/ }),

/***/ "./src/grid/models/AbstractGridModel.js":
/*!**********************************************!*\
  !*** ./src/grid/models/AbstractGridModel.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/validation/ValidationErrors */ "./src/common/validation/ValidationErrors.js");
/* harmony import */ var _common_Events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/Events */ "./src/common/Events.js");






/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


/**
 * Grid model abstraction
 *
 * @constructor
 * @extends EventsModel
 */

var AbstractGridModel =
/*#__PURE__*/
function (_EventsModel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(AbstractGridModel, _EventsModel);

  function AbstractGridModel() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AbstractGridModel);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(AbstractGridModel).call(this));
  }
  /**
   * Add a record
   *
   * @param {Object}      record  Record object
   * @abstract
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AbstractGridModel, [{
    key: "create",
    value: function create()
    /*record*/
    {
      return Promise.resolve();
    }
    /**
     * Get records list
     *
     * @param {Object}      settings                Request
     * @param {Array}       settings.fields         Fields
     * @param {number}      [settings.limit]        Limit
     * @param {number}      [settings.offset]       Offset
     * @param {Object}      [settings.filters]      Filter values object
     * @param {Array}       [settings.sort]         Sort parameters
     * @param {Array}       [settings.extra]        Record IDs, we need to get for sure
     * @abstract
     */

  }, {
    key: "read",
    value: function read()
    /*settings*/
    {
      return Promise.resolve({
        records: [],
        // Primary records
        ids: [],
        // Extra records
        extraRecords: 0 // In all records count

      });
    }
    /**
     * Get the particular record
     *
     * @param {*}         id      Record ID
     * @param {Array}     fields  Required fields
     * @abstract
     */

  }, {
    key: "getRecord",
    value: function getRecord()
    /*id, fields*/
    {
      return Promise.resolve();
    }
    /**
     * Apply record changes
     *
     * @param {Array}       changes     Changes array
     * @abstract
     */

  }, {
    key: "update",
    value: function update()
    /*changes*/
    {
      return Promise.resolve([]);
    }
    /**
     * Validation check
     *
     * @param {Object}      record
     * @param {*|null}      recordId
     * @abstract
     */

  }, {
    key: "isValidRecord",
    value: function isValidRecord()
    /*record, recordId*/
    {
      return Promise.resolve(new _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_5__["default"]());
    }
    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {Array}  fields   Fields list
     * @returns {Array}  Dependencies
     * @abstract
     */

  }, {
    key: "getValidationDependency",
    value: function getValidationDependency() {
      return [];
    }
  }]);

  return AbstractGridModel;
}(_common_Events__WEBPACK_IMPORTED_MODULE_6__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (AbstractGridModel);

/***/ }),

/***/ "./src/grid/models/GridCollectionModel.js":
/*!************************************************!*\
  !*** ./src/grid/models/GridCollectionModel.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _common_validation_Validator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../common/validation/Validator */ "./src/common/validation/Validator.js");
/* harmony import */ var _AbstractGridModel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./AbstractGridModel */ "./src/grid/models/AbstractGridModel.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../common/utils */ "./src/common/utils.js");










/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */




var GridCollectionModel =
/*#__PURE__*/
function (_AbstractGridModel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default()(GridCollectionModel, _AbstractGridModel);

  /**
   * Specifies a grid model that will work with array data passed to it as a parameter.
   *
   * @param {Object}    [options]
   * @param {Object[]}  [options.data]              Data array
   * @param {Function}  [options.filtersHandler]
   * @param {Validator} [options.validator]
   * @param {string[]}  [options.requiredFields]
   * @param {bool}      [options.validateOnCreate]
   * @constructor
   */
  function GridCollectionModel() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, GridCollectionModel);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(GridCollectionModel).call(this));
    _this._data = Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["cloneDeep"])(options.data) || [];
    _this._id = 1;
    _this._filtersHandler = options.filtersHandler;

    if (options.validation) {
      Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["warn"])('Property "validation" is deprecated, use "validator" instead');
    }

    _this._validator = options.validator || options.validation || new _common_validation_Validator__WEBPACK_IMPORTED_MODULE_9__["default"]();
    _this._requiredFields = options.requiredFields || [];
    return _this;
  }
  /**
   * Set data array in model
   *
   * @param {Object[]} data
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(GridCollectionModel, [{
    key: "setData",
    value: function setData(data) {
      var currentData = this._data.reduce(function (result, _ref) {
        var _ref2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_ref, 2),
            recordId = _ref2[0],
            record = _ref2[1];

        result[JSON.stringify(recordId)] = record;
        return result;
      }, {});

      var createdRecordsIds = [];
      var updatedRecords = [];
      var recordIds = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_step.value, 2),
              recordId = _step$value[0],
              record = _step$value[1];

          var id = JSON.stringify(recordId);
          recordIds.push(id);

          if (!currentData[id]) {
            createdRecordsIds.push(recordId);
            continue;
          }

          if (!Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["isEqual"])(record, currentData[id])) {
            updatedRecords.push(record);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var deletedRecordsIds = Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["without"])(Object.keys(currentData), recordIds).map(JSON.parse);
      this._data = Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["cloneDeep"])(data);

      if (createdRecordsIds.length) {
        this.trigger('create', [createdRecordsIds]);
      }

      if (deletedRecordsIds.length) {
        this.trigger('delete', deletedRecordsIds);
      }

      if (updatedRecords.length) {
        this.trigger('update', updatedRecords);
      }
    }
  }, {
    key: "getData",
    value: function getData() {
      return this._data;
    }
    /**
     * Remove field by record id from data
     *
     * @param   {Number}  recordId   record id for remove
     * @returns {Number}  recordId   return id of deleted record
     */

  }, {
    key: "delete",
    value: function () {
      var _delete2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(recordId) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._data = this._data.filter(function (record) {
                  return record[0] !== recordId;
                });
                this.trigger('delete', recordId);
                return _context.abrupt("return", recordId);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _delete(_x) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
    /**
     * Add a record to local collection
     *
     * @param {Object}      record  Record object
     */

  }, {
    key: "create",
    value: function () {
      var _create2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(record) {
        var id, clonedRecord, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, field, validationErrors;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = this._getID();
                clonedRecord = Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["clone"])(record); // Create record with definite id

                if (Array.isArray(clonedRecord) && clonedRecord.length === 2) {
                  id = clonedRecord[0];
                  clonedRecord = clonedRecord[1];
                }

                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 6;

                for (_iterator2 = this._requiredFields[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  field = _step2.value;

                  if (!clonedRecord.hasOwnProperty(field)) {
                    clonedRecord[field] = null;
                  }
                }

                _context2.next = 14;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](6);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t0;

              case 14:
                _context2.prev = 14;
                _context2.prev = 15;

                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }

              case 17:
                _context2.prev = 17;

                if (!_didIteratorError2) {
                  _context2.next = 20;
                  break;
                }

                throw _iteratorError2;

              case 20:
                return _context2.finish(17);

              case 21:
                return _context2.finish(14);

              case 22:
                _context2.next = 24;
                return this.isValidRecord(clonedRecord);

              case 24:
                validationErrors = _context2.sent;

                if (validationErrors.isEmpty()) {
                  _context2.next = 27;
                  break;
                }

                throw validationErrors;

              case 27:
                return _context2.abrupt("return", this._create(clonedRecord, id));

              case 28:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[6, 10, 14, 22], [15,, 17, 21]]);
      }));

      function create(_x2) {
        return _create2.apply(this, arguments);
      }

      return create;
    }()
    /**
     * Get records list
     *
     * @param {Object}      settings                Request
     * @param {string[]}    settings.fields         Fields
     * @param {number}      [settings.limit]        Limit
     * @param {number}      [settings.offset=0]     Offset
     * @param {Object}      [settings.filters]      Filter values object
     * @param {Array}       [settings.sort]         Sort parameters
     * @param {Array}       [settings.ids]          Record IDs, we need to get for sure
     */

  }, {
    key: "read",
    value: function read(settings) {
      var data = Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["cloneDeep"])(this._data);
      var result = {}; // Get extra records

      if (settings.extra && settings.extra.length > 0) {
        result.extraRecords = data.filter(function (record) {
          return settings.extra.indexOf(record[0]) >= 0;
        });
      } // Delete unnecessary fields


      if (settings.fields) {
        Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["forEach"])(result.extraRecords, function (record) {
          Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["forEach"])(record[1], function (value, key) {
            if (settings.fields.indexOf(key) === -1) {
              delete record[1][key];
            }
          });
        });
      } // Sorting


      if (settings.sort && settings.sort.length > 0) {
        var sortField = settings.sort[0][0];
        var sortMode = settings.sort[0][1];
        data = data.sort(function (prev, next) {
          if (prev[1][sortField] < next[1][sortField]) {
            return sortMode === 'asc' ? -1 : 1;
          } else if (prev[1][sortField] > next[1][sortField]) {
            return sortMode === 'asc' ? 1 : -1;
          } else {
            return 0;
          }
        });
      } // Apply filters


      if (this._filtersHandler && settings.filters) {
        data = Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["cloneDeep"])(this._filtersHandler(data, settings.filters));
      }

      result.count = data.length; // Offset and limit

      if (settings.offset || settings.limit) {
        var start = settings.offset || 0;
        var end = settings.offset + settings.limit || data.length;
        data = data.slice(start, end);
      } // Delete unnecessary fields


      if (settings.fields) {
        Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["forEach"])(data, function (record) {
          Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["forEach"])(record[1], function (value, key) {
            if (settings.fields.indexOf(key) === -1) {
              delete record[1][key];
            }
          });
        });
      }

      result.records = data;
      return Promise.resolve(result);
    }
    /**
     * Get the particular record
     *
     * @param {number|string}   id      Record ID
     * @param {Array}           fields  Required fields
     */

  }, {
    key: "getRecord",
    value: function getRecord(id, fields) {
      var record = Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["cloneDeep"])(this._getRecordByID(id));

      if (!record) {
        return Promise.reject(new Error('Record not found.'));
      }

      var returnRecord = record[1]; // Deleting unused fields

      if (fields) {
        Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["forEach"])(returnRecord, function (value, key) {
          if (fields.indexOf(key) === -1) {
            delete returnRecord[key];
          }
        });
      }

      return Promise.resolve(returnRecord);
    }
    /**
     * Apply record changes
     *
     * @param {Array}       changes     Changes array
     * @abstract
     */

  }, {
    key: "update",
    value: function () {
      var _update = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee4(changes) {
        var _this2 = this;

        var appliedChanges, result, _i, _appliedChanges, _appliedChanges$_i, recordId, _changes;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (changes.length) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", []);

              case 2:
                appliedChanges = [];
                _context4.next = 5;
                return Promise.all(changes.map(
                /*#__PURE__*/
                function () {
                  var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
                  /*#__PURE__*/
                  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(_ref3) {
                    var _ref5, recordId, changes, validErrors;

                    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _ref5 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_ref3, 2), recordId = _ref5[0], changes = _ref5[1];
                            _context3.next = 3;
                            return _this2.isValidRecord(changes);

                          case 3:
                            validErrors = _context3.sent;

                            if (validErrors.isEmpty()) {
                              _context3.next = 6;
                              break;
                            }

                            return _context3.abrupt("return", [recordId, validErrors]);

                          case 6:
                            appliedChanges.push([recordId, changes]);
                            return _context3.abrupt("return", [recordId, changes]);

                          case 8:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x4) {
                    return _ref4.apply(this, arguments);
                  };
                }()));

              case 5:
                result = _context4.sent;

                if (appliedChanges.length) {
                  // Apply changes
                  for (_i = 0, _appliedChanges = appliedChanges; _i < _appliedChanges.length; _i++) {
                    _appliedChanges$_i = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_appliedChanges[_i], 2), recordId = _appliedChanges$_i[0], _changes = _appliedChanges$_i[1];
                    Object.assign(this._getRecordByID(recordId)[1], _changes);
                  }

                  this.trigger('update', appliedChanges);
                }

                return _context4.abrupt("return", result);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function update(_x3) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
    /**
     * Validation check
     *
     * @param {Object}      record
     */

  }, {
    key: "isValidRecord",
    value: function isValidRecord(record) {
      return this._validator.isValidRecord(record);
    }
    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {Array}  fields   Fields list
     * @returns {Array}  Dependencies
     */

  }, {
    key: "getValidationDependency",
    value: function getValidationDependency(fields) {
      return this._validator.getValidationDependency(fields);
    }
  }, {
    key: "_getID",
    value: function _getID() {
      while (this._getRecordByID(this._id)) {
        this._id++;
      }

      return this._id++;
    }
  }, {
    key: "_getRecordByID",
    value: function _getRecordByID(id) {
      return Object(_common_utils__WEBPACK_IMPORTED_MODULE_11__["find"])(this._data, function (record) {
        return record[0] === id;
      });
    }
  }, {
    key: "_create",
    value: function _create(record, id) {
      this._data = [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(this._data), [[id, record]]);
      this.trigger('create', [id]);
      return id;
    }
  }]);

  return GridCollectionModel;
}(_AbstractGridModel__WEBPACK_IMPORTED_MODULE_10__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (GridCollectionModel);

/***/ }),

/***/ "./src/grid/models/GridExpressApi.js":
/*!*******************************************!*\
  !*** ./src/grid/models/GridExpressApi.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "@babel/runtime/helpers/objectSpread");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../common/validation/ValidationErrors */ "./src/common/validation/ValidationErrors.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../common/utils */ "./src/common/utils.js");
/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! multer */ "multer");
/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(multer__WEBPACK_IMPORTED_MODULE_10__);








/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */




var DEFAULT_MAX_FILE_SIZE = 104857600; // 100 MB

/**
 * Form Express API for Grid model interaction
 *
 * @return {GridExpressApi}
 * @constructor
 */

var GridExpressApi =
/*#__PURE__*/
function () {
  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(GridExpressApi, null, [{
    key: "create",
    value: function create(multipartFormData, maxFileSize) {
      return new GridExpressApi(multipartFormData, maxFileSize);
    }
  }]);

  function GridExpressApi() {
    var _this = this;

    var multipartFormData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var maxFileSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_MAX_FILE_SIZE;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default()(this, GridExpressApi);

    var upload = multer__WEBPACK_IMPORTED_MODULE_10___default()({
      limits: {
        fileSize: maxFileSize
      }
    });
    this.middlewares = {
      readGet: [Object(_common_utils__WEBPACK_IMPORTED_MODULE_9__["asyncHandler"])(
      /*#__PURE__*/
      function () {
        var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
        /*#__PURE__*/
        _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee(req, res, next) {
          var settings;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  settings = {};

                  if (req.query.limit) {
                    settings.limit = parseInt(req.query.limit);
                  }

                  if (req.query.offset) {
                    settings.offset = parseInt(req.query.offset);
                  }

                  if (req.query.sort) {
                    settings.sort = JSON.parse(req.query.sort);
                  }

                  if (req.query.fields) {
                    settings.fields = JSON.parse(req.query.fields);
                  }

                  if (req.query.extra) {
                    settings.extra = JSON.parse(req.query.extra);
                  }

                  if (req.query.filters) {
                    settings.filters = JSON.parse(req.query.filters);
                  }

                  _context.next = 9;
                  return _this._commonReadMiddleware(req, res, next, settings);

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }())],
      readPost: [Object(_common_utils__WEBPACK_IMPORTED_MODULE_9__["asyncHandler"])(
      /*#__PURE__*/
      function () {
        var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
        /*#__PURE__*/
        _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee2(req, res, next) {
          var settings;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  settings = {};

                  if (req.body.limit) {
                    settings.limit = parseInt(req.body.limit);
                  }

                  if (req.body.offset) {
                    settings.offset = parseInt(req.body.offset);
                  }

                  if (req.body.sort) {
                    settings.sort = req.body.sort;
                  }

                  if (req.body.fields) {
                    settings.fields = req.body.fields;
                  }

                  if (req.body.extra) {
                    settings.extra = req.body.extra;
                  }

                  if (req.body.filters) {
                    settings.filters = req.body.filters;
                  }

                  _context2.next = 9;
                  return _this._commonReadMiddleware(req, res, next, settings);

                case 9:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x4, _x5, _x6) {
          return _ref2.apply(this, arguments);
        };
      }())],
      validate: [Object(_common_utils__WEBPACK_IMPORTED_MODULE_9__["asyncHandler"])(
      /*#__PURE__*/
      function () {
        var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
        /*#__PURE__*/
        _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee3(req, res, next) {
          var model, result, errors;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  model = _this._getModel(req, res);
                  result = _this._result('validate');
                  _context3.prev = 2;
                  _context3.next = 5;
                  return model.isValidRecord(req.body.record, req.body.id);

                case 5:
                  errors = _context3.sent;
                  result(null, errors, req, res, next);
                  _context3.next = 12;
                  break;

                case 9:
                  _context3.prev = 9;
                  _context3.t0 = _context3["catch"](2);
                  result(_context3.t0, null, req, res, next);

                case 12:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, null, [[2, 9]]);
        }));

        return function (_x7, _x8, _x9) {
          return _ref3.apply(this, arguments);
        };
      }())],
      getRecord: [Object(_common_utils__WEBPACK_IMPORTED_MODULE_9__["asyncHandler"])(
      /*#__PURE__*/
      function () {
        var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
        /*#__PURE__*/
        _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee4(req, res, next) {
          var cols, recordId, model, result, response;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  cols = req.query.cols ? JSON.parse(req.query.cols) : null;
                  recordId = req.params.recordId ? JSON.parse(req.params.recordId) : null;
                  model = _this._getModel(req, res);
                  result = _this._result('getRecord');
                  _context4.prev = 4;
                  _context4.next = 7;
                  return model.getRecord(recordId, cols);

                case 7:
                  response = _context4.sent;
                  result(null, response, req, res, next);
                  _context4.next = 14;
                  break;

                case 11:
                  _context4.prev = 11;
                  _context4.t0 = _context4["catch"](4);
                  result(_context4.t0, null, req, res, next);

                case 14:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, null, [[4, 11]]);
        }));

        return function (_x10, _x11, _x12) {
          return _ref4.apply(this, arguments);
        };
      }())],
      update: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(multipartFormData ? [upload.any()] : []), [Object(_common_utils__WEBPACK_IMPORTED_MODULE_9__["asyncHandler"])(
      /*#__PURE__*/
      function () {
        var _ref5 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
        /*#__PURE__*/
        _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee5(req, res, next) {
          var model, result, body, filesByRecordId, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, fieldname, buffer, _parseJson, recordId, field, data;

          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  model = _this._getModel(req, res);
                  result = _this._result('update');
                  body = req.body;

                  if (!multipartFormData) {
                    _context5.next = 25;
                    break;
                  }

                  filesByRecordId = {};
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context5.prev = 8;

                  for (_iterator = req.files[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _step$value = _step.value, fieldname = _step$value.fieldname, buffer = _step$value.buffer;
                    _parseJson = Object(_common_utils__WEBPACK_IMPORTED_MODULE_9__["parseJson"])(decodeURI(fieldname), 'Incorrect name for field containing file data'), recordId = _parseJson.recordId, field = _parseJson.field;

                    if (!filesByRecordId[recordId]) {
                      filesByRecordId[recordId] = {};
                    }

                    filesByRecordId[recordId][field] = buffer;
                  }

                  _context5.next = 16;
                  break;

                case 12:
                  _context5.prev = 12;
                  _context5.t0 = _context5["catch"](8);
                  _didIteratorError = true;
                  _iteratorError = _context5.t0;

                case 16:
                  _context5.prev = 16;
                  _context5.prev = 17;

                  if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                  }

                case 19:
                  _context5.prev = 19;

                  if (!_didIteratorError) {
                    _context5.next = 22;
                    break;
                  }

                  throw _iteratorError;

                case 22:
                  return _context5.finish(19);

                case 23:
                  return _context5.finish(16);

                case 24:
                  body = Object(_common_utils__WEBPACK_IMPORTED_MODULE_9__["parseJson"])(body.rest, 'Incorrect "rest" json').map(function (_ref6) {
                    var _ref7 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_ref6, 2),
                        recordId = _ref7[0],
                        record = _ref7[1];

                    return [recordId, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, record, filesByRecordId[recordId])];
                  });

                case 25:
                  _context5.prev = 25;
                  _context5.next = 28;
                  return model.update(body);

                case 28:
                  data = _context5.sent;
                  result(null, data, req, res, next);
                  _context5.next = 35;
                  break;

                case 32:
                  _context5.prev = 32;
                  _context5.t1 = _context5["catch"](25);
                  result(_context5.t1, null, req, res, next);

                case 35:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, null, [[8, 12, 16, 24], [17,, 19, 23], [25, 32]]);
        }));

        return function (_x13, _x14, _x15) {
          return _ref5.apply(this, arguments);
        };
      }())]),
      create: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(multipartFormData ? [upload.any()] : []), [Object(_common_utils__WEBPACK_IMPORTED_MODULE_9__["asyncHandler"])(
      /*#__PURE__*/
      function () {
        var _ref8 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
        /*#__PURE__*/
        _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee6(req, res, next) {
          var model, result, body, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, fieldname, buffer, data;

          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  model = _this._getModel(req, res);
                  result = _this._result('create');
                  body = req.body;

                  if (!multipartFormData) {
                    _context6.next = 24;
                    break;
                  }

                  body = Object(_common_utils__WEBPACK_IMPORTED_MODULE_9__["parseJson"])(body.rest);
                  _iteratorNormalCompletion2 = true;
                  _didIteratorError2 = false;
                  _iteratorError2 = undefined;
                  _context6.prev = 8;

                  for (_iterator2 = req.files[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    _step2$value = _step2.value, fieldname = _step2$value.fieldname, buffer = _step2$value.buffer;
                    body[JSON.parse(decodeURI(fieldname))] = buffer;
                  }

                  _context6.next = 16;
                  break;

                case 12:
                  _context6.prev = 12;
                  _context6.t0 = _context6["catch"](8);
                  _didIteratorError2 = true;
                  _iteratorError2 = _context6.t0;

                case 16:
                  _context6.prev = 16;
                  _context6.prev = 17;

                  if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                    _iterator2["return"]();
                  }

                case 19:
                  _context6.prev = 19;

                  if (!_didIteratorError2) {
                    _context6.next = 22;
                    break;
                  }

                  throw _iteratorError2;

                case 22:
                  return _context6.finish(19);

                case 23:
                  return _context6.finish(16);

                case 24:
                  _context6.prev = 24;
                  _context6.next = 27;
                  return model.create(body);

                case 27:
                  data = _context6.sent;
                  result(null, data, req, res, next);
                  _context6.next = 34;
                  break;

                case 31:
                  _context6.prev = 31;
                  _context6.t1 = _context6["catch"](24);
                  result(_context6.t1, null, req, res, next);

                case 34:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, null, [[8, 12, 16, 24], [17,, 19, 23], [24, 31]]);
        }));

        return function (_x16, _x17, _x18) {
          return _ref8.apply(this, arguments);
        };
      }())])
    };
  }
  /**
   * Specify Grid model
   *
   * @param   {Function|AbstractGridModel}  model   Grid model
   * @return  {GridExpressApi}
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(GridExpressApi, [{
    key: "model",
    value: function model(_model) {
      if (typeof _model === 'function') {
        this._getModel = _model;
      } else {
        this._getModel = function () {
          return _model;
        };
      }

      return this;
    }
  }, {
    key: "getRouter",
    value: function getRouter() {
      var _this2 = this;

      return new express__WEBPACK_IMPORTED_MODULE_7___default.a.Router().get('/', this.middlewares.readGet).post('/read', this.middlewares.readPost).post('/validation', this.middlewares.validate).get('/:recordId', this.middlewares.getRecord).put('/', this.middlewares.update).post('/', this.middlewares.create).use(function (err, req, res, next) {
        _this2._result()(err, null, req, res, next);
      });
    }
  }, {
    key: "read",
    value: function read(middlewares) {
      this._addMidelwares('readGet', middlewares);

      this._addMidelwares('readPost', middlewares);

      return this;
    }
  }, {
    key: "validate",
    value: function validate(middlewares) {
      return this._addMidelwares('validate', middlewares);
    }
  }, {
    key: "getRecord",
    value: function getRecord(middlewares) {
      return this._addMidelwares('getRecord', middlewares);
    }
  }, {
    key: "update",
    value: function update(middlewares) {
      return this._addMidelwares('update', middlewares);
    }
  }, {
    key: "create",
    value: function create(middlewares) {
      return this._addMidelwares('create', middlewares);
    }
  }, {
    key: "_addMidelwares",
    value: function _addMidelwares(method, middlewares) {
      if (!Array.isArray(middlewares)) {
        middlewares = [middlewares];
      }

      this.middlewares[method] = middlewares.concat(this.middlewares[method]);
      return this;
    } // Default implementation

  }, {
    key: "_getModel",
    value: function _getModel() {
      throw new Error('Model is not defined.');
    }
  }, {
    key: "_result",
    value: function _result(method) {
      if (method === 'update') {
        return function (err, data, req, res, next) {
          if (err) {
            return send(err, null, req, res, next);
          }

          data = data.reduce(function (result, record) {
            if (!record) {
              return result;
            }

            if (record[1] instanceof Error) {
              result.errors.push(record);
            } else if (record[1] instanceof _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_8__["default"]) {
              result.validation.push(record);
            } else {
              result.changes.push(record);
            }

            return result;
          }, {
            changes: [],
            errors: [],
            validation: []
          });
          send(null, data, req, res, next);
        };
      }

      if (method === 'create') {
        return function (err, data, req, res, next) {
          if (err) {
            if (!(err instanceof _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_8__["default"])) {
              return send(err, null, req, res, next);
            }

            return send(null, {
              data: null,
              error: err
            }, req, res, next);
          }

          return send(null, {
            data: data,
            error: null
          }, req, res, next);
        };
      }

      return send;

      function send(err, data, req, res, next) {
        if (err) {
          next(err);
        } else {
          res.json(data);
        }
      }
    }
  }, {
    key: "_commonReadMiddleware",
    value: function () {
      var _commonReadMiddleware2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee7(req, res, next, settings) {
        var model, result, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                model = this._getModel(req, res);
                result = this._result('read');
                _context7.prev = 2;
                _context7.next = 5;
                return model.read(settings);

              case 5:
                response = _context7.sent;
                result(null, response, req, res, next);
                _context7.next = 12;
                break;

              case 9:
                _context7.prev = 9;
                _context7.t0 = _context7["catch"](2);
                result(_context7.t0, null, req, res, next);

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[2, 9]]);
      }));

      function _commonReadMiddleware(_x19, _x20, _x21, _x22) {
        return _commonReadMiddleware2.apply(this, arguments);
      }

      return _commonReadMiddleware;
    }()
  }]);

  return GridExpressApi;
}();

/* harmony default export */ __webpack_exports__["default"] = (GridExpressApi);

/***/ }),

/***/ "./src/grid/models/GridXhrModel.js":
/*!*****************************************!*\
  !*** ./src/grid/models/GridXhrModel.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "@babel/runtime/helpers/objectSpread");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../common/validation/ValidationErrors */ "./src/common/validation/ValidationErrors.js");
/* harmony import */ var _common_validation_Validator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../common/validation/Validator */ "./src/common/validation/Validator.js");
/* harmony import */ var _common_defaultXhr__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../common/defaultXhr */ "./src/common/defaultXhr.js");
/* harmony import */ var _AbstractGridModel__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./AbstractGridModel */ "./src/grid/models/AbstractGridModel.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_15__);












/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */





var MAX_URI_LENGTH = 2048;
/**
 * Grid model, that works with API via XHR
 *
 * @param {Object}    settings                                 Model settings
 * @param {string}    settings.api                             API address
 * @param {Validator} [settings.validator]                     General validator
 * @param {Function}  [settings.xhr]                           XHR interface
 * @param {boolean}   [settings.validateOnClient=false]        Don't send validation request to server
 * @param {boolean}   [settings.multipartFormData=false] Send form data with enctype='multipart/form-data'
 * @constructor
 */

var GridXhrModel =
/*#__PURE__*/
function (_AbstractGridModel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_10___default()(GridXhrModel, _AbstractGridModel);

  function GridXhrModel(_ref) {
    var _this;

    var api = _ref.api,
        validator = _ref.validator,
        xhr = _ref.xhr,
        validateOnClient = _ref.validateOnClient,
        multipartFormData = _ref.multipartFormData;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default()(this, GridXhrModel);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(GridXhrModel).call(this));

    if (!api) {
      throw new Error('Initialization problem: \'api\' must be specified.');
    }

    _this._validator = validator || new _common_validation_Validator__WEBPACK_IMPORTED_MODULE_12__["default"]();
    _this._xhr = xhr || _common_defaultXhr__WEBPACK_IMPORTED_MODULE_13__["default"];
    _this._validateOnClient = validateOnClient || false;
    _this._multipartFormDataEncoded = multipartFormData || false;
    _this._apiUrl = api.replace(/([^/])\?/, '$1/?') // Add "/" before "?"
    .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end

    return _this;
  }
  /**
   * Add a record
   *
   * @param {Object}      record  Record object
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(GridXhrModel, [{
    key: "create",
    value: function () {
      var _create = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee(record) {
        var formData, ordinaryData, _i, _Object$entries, _Object$entries$_i, prop, value, body;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                formData = new FormData();

                if (this._multipartFormDataEncoded) {
                  ordinaryData = {};

                  for (_i = 0, _Object$entries = Object.entries(record); _i < _Object$entries.length; _i++) {
                    _Object$entries$_i = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_4___default()(_Object$entries[_i], 2), prop = _Object$entries$_i[0], value = _Object$entries$_i[1];

                    if (value instanceof File) {
                      formData.append(JSON.stringify(prop), value);
                    } else {
                      ordinaryData[prop] = value;
                    }
                  }

                  formData.append('rest', JSON.stringify(ordinaryData));
                }

                _context.next = 4;
                return this._xhr(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
                  method: 'POST',
                  uri: this._apiUrl,
                  body: this._multipartFormDataEncoded ? formData : JSON.stringify(record)
                }, !this._multipartFormDataEncoded && {
                  headers: {
                    'Content-type': 'application/json'
                  }
                }));

              case 4:
                body = _context.sent;
                body = JSON.parse(body);

                if (!body.error) {
                  _context.next = 8;
                  break;
                }

                throw _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_11__["default"].createFromJSON(body.error);

              case 8:
                this.trigger('create', [body.data]);
                return _context.abrupt("return", body.data);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
    /**
     * Get records list
     *
     * @param {Object}      settings                Request
     * @param {Array}       settings.fields         Fields
     * @param {number}      [settings.limit]        Limit
     * @param {number}      [settings.offset=0]     Offset
     * @param {Object}      [settings.filters]      Filter values object
     * @param {Array}       [settings.sort]         Sort parameters
     * @param {Array}       [settings.extra]        Record IDs, we need to get for sure
     */

  }, {
    key: "read",
    value: function () {
      var _read = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee2(settings) {
        var queryUrl, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                queryUrl = this._getQueryUrl(settings);

                if (!(url__WEBPACK_IMPORTED_MODULE_15___default.a.format(queryUrl).length > MAX_URI_LENGTH)) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 4;
                return this._readPostRequest(settings);

              case 4:
                return _context2.abrupt("return", _context2.sent);

              case 5:
                _context2.next = 7;
                return this._xhr({
                  method: 'GET',
                  uri: url__WEBPACK_IMPORTED_MODULE_15___default.a.format(queryUrl)
                });

              case 7:
                response = _context2.sent;
                return _context2.abrupt("return", JSON.parse(response));

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function read(_x2) {
        return _read.apply(this, arguments);
      }

      return read;
    }()
    /**
     * Get the particular record
     *
     * @param {number|string}   id      Record ID
     * @param {Array}           fields  Required fields
     */

  }, {
    key: "getRecord",
    value: function () {
      var _getRecord = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee3(id, fields) {
        var parsedUrl, body;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                parsedUrl = url__WEBPACK_IMPORTED_MODULE_15___default.a.parse(this._apiUrl, true);
                parsedUrl.query.cols = JSON.stringify(fields); // TODO rename cols to fields

                parsedUrl.pathname = url__WEBPACK_IMPORTED_MODULE_15___default.a.resolve(parsedUrl.pathname, JSON.stringify(id));
                delete parsedUrl.search;
                _context3.next = 6;
                return this._xhr({
                  method: 'GET',
                  uri: url__WEBPACK_IMPORTED_MODULE_15___default.a.format(parsedUrl)
                });

              case 6:
                body = _context3.sent;
                return _context3.abrupt("return", JSON.parse(body));

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getRecord(_x3, _x4) {
        return _getRecord.apply(this, arguments);
      }

      return getRecord;
    }()
    /**
     * Apply record changes
     *
     * @param {[]}       changes     Changes array
     * @abstract
     */

  }, {
    key: "update",
    value: function () {
      var _update = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee4(changes) {
        var formDataChanges, ordinaryRecordChanges, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, body, res, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, error, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _error;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                formDataChanges = new FormData();

                if (!this._multipartFormDataEncoded) {
                  _context4.next = 24;
                  break;
                }

                ordinaryRecordChanges = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context4.prev = 6;

                _loop = function _loop() {
                  var _step$value = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_4___default()(_step.value, 2),
                      recordId = _step$value[0],
                      record = _step$value[1];

                  var fileFieldNames = [];

                  for (var _i2 = 0, _Object$keys = Object.keys(record); _i2 < _Object$keys.length; _i2++) {
                    var field = _Object$keys[_i2];

                    if (record[field] instanceof File) {
                      formDataChanges.append(JSON.stringify({
                        recordId: recordId,
                        field: field
                      }), record[field]);
                      fileFieldNames.push(field);
                    }
                  }

                  var filteredRecord = Object.keys(record).filter(function (key) {
                    return !fileFieldNames.includes(key);
                  }).reduce(function (agr, key) {
                    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, agr, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, key, record[key]));
                  }, {});
                  ordinaryRecordChanges.push([recordId, filteredRecord]);
                };

                for (_iterator = changes[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  _loop();
                }

                _context4.next = 15;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](6);
                _didIteratorError = true;
                _iteratorError = _context4.t0;

              case 15:
                _context4.prev = 15;
                _context4.prev = 16;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 18:
                _context4.prev = 18;

                if (!_didIteratorError) {
                  _context4.next = 21;
                  break;
                }

                throw _iteratorError;

              case 21:
                return _context4.finish(18);

              case 22:
                return _context4.finish(15);

              case 23:
                formDataChanges.append('rest', JSON.stringify(ordinaryRecordChanges));

              case 24:
                _context4.next = 26;
                return this._xhr(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
                  method: 'PUT'
                }, !this._multipartFormDataEncoded && {
                  headers: {
                    'Content-type': 'application/json'
                  }
                }, {
                  uri: this._apiUrl,
                  body: this._multipartFormDataEncoded ? formDataChanges : JSON.stringify(changes)
                }));

              case 26:
                body = _context4.sent;
                body = JSON.parse(body);
                res = [];

                if (body.changes && body.changes.length) {
                  this.trigger('update', body.changes);
                  res.push.apply(res, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(body.changes));
                }

                if (!(body.validation && body.validation.length)) {
                  _context4.next = 50;
                  break;
                }

                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context4.prev = 34;

                for (_iterator2 = body.validation[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  error = _step2.value;

                  if (error && error[1]) {
                    error[1] = _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_11__["default"].createFromJSON(error[1]);
                    res.push(error);
                  }
                }

                _context4.next = 42;
                break;

              case 38:
                _context4.prev = 38;
                _context4.t1 = _context4["catch"](34);
                _didIteratorError2 = true;
                _iteratorError2 = _context4.t1;

              case 42:
                _context4.prev = 42;
                _context4.prev = 43;

                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }

              case 45:
                _context4.prev = 45;

                if (!_didIteratorError2) {
                  _context4.next = 48;
                  break;
                }

                throw _iteratorError2;

              case 48:
                return _context4.finish(45);

              case 49:
                return _context4.finish(42);

              case 50:
                if (!(body.errors && body.errors.length)) {
                  _context4.next = 70;
                  break;
                }

                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context4.prev = 54;

                for (_iterator3 = body.errors[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  _error = _step3.value;

                  if (_error && _error[1]) {
                    _error[1] = Object.assign(new Error(), _error[1]); // Note, that Object spread operator won't work here

                    res.push(_error);
                  }
                }

                _context4.next = 62;
                break;

              case 58:
                _context4.prev = 58;
                _context4.t2 = _context4["catch"](54);
                _didIteratorError3 = true;
                _iteratorError3 = _context4.t2;

              case 62:
                _context4.prev = 62;
                _context4.prev = 63;

                if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                  _iterator3["return"]();
                }

              case 65:
                _context4.prev = 65;

                if (!_didIteratorError3) {
                  _context4.next = 68;
                  break;
                }

                throw _iteratorError3;

              case 68:
                return _context4.finish(65);

              case 69:
                return _context4.finish(62);

              case 70:
                return _context4.abrupt("return", res);

              case 71:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[6, 11, 15, 23], [16,, 18, 22], [34, 38, 42, 50], [43,, 45, 49], [54, 58, 62, 70], [63,, 65, 69]]);
      }));

      function update(_x5) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
    /**
     * Validation check
     *
     * @param {{[string]: *}} record
     * @param {Promise<*>}    recordId
     */

  }, {
    key: "isValidRecord",
    value: function () {
      var _isValidRecord = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee5(record, recordId) {
        var parsedUrl, response, validationErrors;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this._validateOnClient) {
                  _context5.next = 4;
                  break;
                }

                _context5.next = 3;
                return this._validator.isValidRecord(record);

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 4:
                parsedUrl = url__WEBPACK_IMPORTED_MODULE_15___default.a.parse(this._apiUrl, true);
                parsedUrl.pathname = url__WEBPACK_IMPORTED_MODULE_15___default.a.resolve(parsedUrl.pathname, 'validation');
                _context5.prev = 6;
                _context5.next = 9;
                return this._xhr({
                  method: 'POST',
                  uri: url__WEBPACK_IMPORTED_MODULE_15___default.a.format(parsedUrl),
                  body: {
                    record: record,
                    id: recordId
                  },
                  json: true
                });

              case 9:
                response = _context5.sent;
                _context5.next = 21;
                break;

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](6);

                if (!(_context5.t0.statusCode === 413)) {
                  _context5.next = 20;
                  break;
                }

                _context5.next = 17;
                return this._validator.isValidRecord(record);

              case 17:
                validationErrors = _context5.sent;

                if (validationErrors.isEmpty()) {
                  _context5.next = 20;
                  break;
                }

                return _context5.abrupt("return", validationErrors);

              case 20:
                throw _context5.t0;

              case 21:
                return _context5.abrupt("return", _common_validation_ValidationErrors__WEBPACK_IMPORTED_MODULE_11__["default"].createFromJSON(response));

              case 22:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[6, 12]]);
      }));

      function isValidRecord(_x6, _x7) {
        return _isValidRecord.apply(this, arguments);
      }

      return isValidRecord;
    }()
    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {string[]}  fields   Fields list
     * @returns {string[]}  Dependencies
     */

  }, {
    key: "getValidationDependency",
    value: function getValidationDependency(fields) {
      return this._validator.getValidationDependency(fields);
    }
  }, {
    key: "_getQueryUrl",
    value: function _getQueryUrl(settings) {
      var parsedUrl = url__WEBPACK_IMPORTED_MODULE_15___default.a.parse(this._apiUrl, true);
      parsedUrl.query.fields = JSON.stringify(settings.fields);
      parsedUrl.query.offset = settings.offset || 0;

      if (settings.limit) {
        parsedUrl.query.limit = settings.limit;
      }

      if (settings.filters) {
        parsedUrl.query.filters = JSON.stringify(settings.filters);
      }

      if (settings.sort) {
        parsedUrl.query.sort = JSON.stringify(settings.sort);
      }

      if (settings.extra) {
        parsedUrl.query.extra = JSON.stringify(settings.extra);
      }

      delete parsedUrl.search;
      return parsedUrl;
    }
  }, {
    key: "_readPostRequest",
    value: function () {
      var _readPostRequest2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee6(settings) {
        var requestBody, parsedUrl;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                requestBody = {};
                requestBody.fields = settings.fields;
                requestBody.offset = settings.offset || 0;

                if (settings.limit) {
                  requestBody.limit = settings.limit;
                }

                if (settings.filters) {
                  requestBody.filters = settings.filters;
                }

                if (settings.sort) {
                  requestBody.sort = settings.sort;
                }

                if (settings.extra) {
                  requestBody.extra = settings.extra;
                }

                parsedUrl = url__WEBPACK_IMPORTED_MODULE_15___default.a.parse(this._apiUrl, true);
                parsedUrl.pathname = url__WEBPACK_IMPORTED_MODULE_15___default.a.resolve(parsedUrl.pathname, 'read');
                _context6.next = 11;
                return this._xhr({
                  method: 'POST',
                  json: true,
                  uri: url__WEBPACK_IMPORTED_MODULE_15___default.a.format(parsedUrl),
                  body: requestBody
                });

              case 11:
                return _context6.abrupt("return", _context6.sent);

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _readPostRequest(_x8) {
        return _readPostRequest2.apply(this, arguments);
      }

      return _readPostRequest;
    }()
  }]);

  return GridXhrModel;
}(_AbstractGridModel__WEBPACK_IMPORTED_MODULE_14__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (GridXhrModel);

/***/ }),

/***/ "./src/grid/models/applyGridFilters.js":
/*!*********************************************!*\
  !*** ./src/grid/models/applyGridFilters.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "@babel/runtime/helpers/objectSpread");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/utils */ "./src/common/utils.js");




/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Defines filter values while reading Grid model data
 *
 * @param {AbstractGridModel} model       Grid model
 * @param {Object}            filters     Filter values
 */

function applyGridFilters(model, filters) {
  return Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["decorate"])(model, {
    read: function () {
      var _read = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(options) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options.filters = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, filters, options.filters);
                _context.next = 3;
                return model.read(options);

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function read(_x) {
        return _read.apply(this, arguments);
      }

      return read;
    }()
  });
}

/* harmony default export */ __webpack_exports__["default"] = (applyGridFilters);

/***/ }),

/***/ "./src/list/AbstractListModel.js":
/*!***************************************!*\
  !*** ./src/list/AbstractListModel.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);



/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Abstract List model
 */
var AbstractListModel =
/*#__PURE__*/
function () {
  function AbstractListModel() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AbstractListModel);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AbstractListModel, [{
    key: "read",

    /**
     * Get data
     *
     * @param {string}    search  Search query
     * @abstract
     */
    value: function read()
    /*search*/
    {
      return Promise.resolve([]);
    }
    /**
     * Get option name using ID
     *
     * @param {*}         id  Option ID
     * @abstract
     */

  }, {
    key: "getLabel",
    value: function getLabel()
    /*id*/
    {
      return Promise.resolve('');
    }
  }]);

  return AbstractListModel;
}();

/* harmony default export */ __webpack_exports__["default"] = (AbstractListModel);

/***/ }),

/***/ "./src/list/ListExpressApi.js":
/*!************************************!*\
  !*** ./src/list/ListExpressApi.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/utils */ "./src/common/utils.js");





/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


/**
 * Form Express API for List model interaction
 *
 * @return {ListExpressApi}
 * @constructor
 */

var ListExpressApi =
/*#__PURE__*/
function () {
  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ListExpressApi, null, [{
    key: "create",
    value: function create() {
      return new ListExpressApi();
    }
  }]);

  function ListExpressApi() {
    var _this = this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ListExpressApi);

    this.middlewares = {
      read: [Object(_common_utils__WEBPACK_IMPORTED_MODULE_5__["asyncHandler"])(
      /*#__PURE__*/
      function () {
        var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
        /*#__PURE__*/
        _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res, next) {
          var model, response;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  model = _this._getModel(req, res);
                  _context.prev = 1;
                  _context.next = 4;
                  return model.read(req.query.v);

                case 4:
                  response = _context.sent;

                  _this._result(null, response, req, res, next);

                  _context.next = 11;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](1);

                  _this._result(_context.t0, null, req, res, next);

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[1, 8]]);
        }));

        return function (_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }())],
      getLabel: [Object(_common_utils__WEBPACK_IMPORTED_MODULE_5__["asyncHandler"])(
      /*#__PURE__*/
      function () {
        var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
        /*#__PURE__*/
        _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(req, res, next) {
          var id, model, response;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  id = JSON.parse(req.params.id);
                  model = _this._getModel(req, res);
                  _context2.prev = 2;
                  _context2.next = 5;
                  return model.getLabel(id);

                case 5:
                  response = _context2.sent;

                  _this._result(null, response, req, res, next);

                  _context2.next = 12;
                  break;

                case 9:
                  _context2.prev = 9;
                  _context2.t0 = _context2["catch"](2);

                  _this._result(_context2.t0, null, req, res, next);

                case 12:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, null, [[2, 9]]);
        }));

        return function (_x4, _x5, _x6) {
          return _ref2.apply(this, arguments);
        };
      }())]
    };
  }
  /**
   * Specify List model
   *
   * @param   {Function|AbstractListModel}  model  List model
   * @return {ListExpressApi}
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ListExpressApi, [{
    key: "model",
    value: function model(_model) {
      if (typeof _model === 'function') {
        this._getModel = _model;
      } else {
        this._getModel = function () {
          return _model;
        };
      }

      return this;
    }
  }, {
    key: "getRouter",
    value: function getRouter() {
      return new express__WEBPACK_IMPORTED_MODULE_4___default.a.Router().get('/', this.middlewares.read).get('/label/:id', this.middlewares.getLabel);
    }
  }, {
    key: "read",
    value: function read(middlewares) {
      if (!Array.isArray(middlewares)) {
        middlewares = [middlewares];
      }

      this.middlewares.read = middlewares.concat(this.middlewares.read);
      return this;
    }
  }, {
    key: "getLabel",
    value: function getLabel(middlewares) {
      if (!Array.isArray(middlewares)) {
        middlewares = [middlewares];
      }

      this.middlewares.getLabel = middlewares.concat(this.middlewares.getLabel);
      return this;
    } // Default implementation

  }, {
    key: "_getModel",
    value: function _getModel() {
      throw Error('Model is not defined.');
    }
  }, {
    key: "_result",
    value: function _result(err, data, req, res, next) {
      if (err) {
        next(err);
      } else {
        if (typeof data === 'number') {
          data = data.toString();
        }

        res.json(data);
      }
    }
  }]);

  return ListExpressApi;
}();

/* harmony default export */ __webpack_exports__["default"] = (ListExpressApi);

/***/ }),

/***/ "./src/list/ListXhrModel.js":
/*!**********************************!*\
  !*** ./src/list/ListXhrModel.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_defaultXhr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/defaultXhr */ "./src/common/defaultXhr.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_5__);





/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ListXMLHttpRequestModel =
/*#__PURE__*/
function () {
  /**
   * Simple list client model which works via XMLHttpRequest
   *
   * @param {string}    apiURL  API address for list model interaction
   * @param {Function}  [xhr]   XHR wrapper
   * @constructor
   */
  function ListXMLHttpRequestModel(apiURL, xhr) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ListXMLHttpRequestModel);

    this._apiURL = apiURL;
    this._xhr = xhr || _common_defaultXhr__WEBPACK_IMPORTED_MODULE_4__["default"];
    this._apiUrl = apiURL.replace(/([^/])\?/, '$1/?') // Add "/" before "?"
    .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end
  }
  /**
   * Get model data
   *
   * @param {string}    search  List search query
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ListXMLHttpRequestModel, [{
    key: "read",
    value: function () {
      var _read = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(search) {
        var parsedUrl, body;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                parsedUrl = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(this._apiUrl, true);
                delete parsedUrl.search;

                if (search) {
                  parsedUrl.query.v = search;
                }

                _context.next = 5;
                return this._xhr({
                  method: 'GET',
                  headers: {
                    'Content-type': 'application/json'
                  },
                  uri: url__WEBPACK_IMPORTED_MODULE_5___default.a.format(parsedUrl)
                });

              case 5:
                body = _context.sent;
                return _context.abrupt("return", JSON.parse(body));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function read(_x) {
        return _read.apply(this, arguments);
      }

      return read;
    }()
    /**
     * Get option name using ID
     *
     * @param {*}         id  Option ID
     */

  }, {
    key: "getLabel",
    value: function () {
      var _getLabel = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(id) {
        var parsedUrl, body;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                parsedUrl = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(this._apiUrl, true);
                parsedUrl.pathname = url__WEBPACK_IMPORTED_MODULE_5___default.a.resolve(parsedUrl.pathname, "label/".concat(JSON.stringify(id)));
                _context2.next = 4;
                return this._xhr({
                  method: 'GET',
                  headers: {
                    'Content-type': 'application/json'
                  },
                  uri: url__WEBPACK_IMPORTED_MODULE_5___default.a.format(parsedUrl)
                });

              case 4:
                body = _context2.sent;
                body = JSON.parse(body);
                return _context2.abrupt("return", body);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getLabel(_x2) {
        return _getLabel.apply(this, arguments);
      }

      return getLabel;
    }()
  }]);

  return ListXMLHttpRequestModel;
}();

/* harmony default export */ __webpack_exports__["default"] = (ListXMLHttpRequestModel);

/***/ }),

/***/ "./src/node.js":
/*!*********************!*\
  !*** ./src/node.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./browser */ "./src/browser.js");
/* harmony import */ var _grid_models_GridExpressApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid/models/GridExpressApi */ "./src/grid/models/GridExpressApi.js");
/* harmony import */ var _list_ListExpressApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./list/ListExpressApi */ "./src/list/ListExpressApi.js");
/* harmony import */ var _form_FormExpressApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./form/FormExpressApi */ "./src/form/FormExpressApi.js");
/* harmony import */ var _grid_export_exporters_toCSV__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./grid/export/exporters/toCSV */ "./src/grid/export/exporters/toCSV.js");
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */





_browser__WEBPACK_IMPORTED_MODULE_0__["default"].gridExpressApi = _grid_models_GridExpressApi__WEBPACK_IMPORTED_MODULE_1__["default"].create;
_browser__WEBPACK_IMPORTED_MODULE_0__["default"].listExpressApi = _list_ListExpressApi__WEBPACK_IMPORTED_MODULE_2__["default"].create;
_browser__WEBPACK_IMPORTED_MODULE_0__["default"].formExpressApi = _form_FormExpressApi__WEBPACK_IMPORTED_MODULE_3__["default"].create;
_browser__WEBPACK_IMPORTED_MODULE_0__["default"].toCSV = _grid_export_exporters_toCSV__WEBPACK_IMPORTED_MODULE_4__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_browser__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "@babel/polyfill/browser":
/*!******************************************!*\
  !*** external "@babel/polyfill/browser" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/polyfill/browser");

/***/ }),

/***/ "@babel/runtime/helpers/assertThisInitialized":
/*!***************************************************************!*\
  !*** external "@babel/runtime/helpers/assertThisInitialized" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/assertThisInitialized");

/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "@babel/runtime/helpers/classCallCheck":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/classCallCheck" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),

/***/ "@babel/runtime/helpers/createClass":
/*!*****************************************************!*\
  !*** external "@babel/runtime/helpers/createClass" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),

/***/ "@babel/runtime/helpers/extends":
/*!*************************************************!*\
  !*** external "@babel/runtime/helpers/extends" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/extends");

/***/ }),

/***/ "@babel/runtime/helpers/getPrototypeOf":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/getPrototypeOf" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/getPrototypeOf");

/***/ }),

/***/ "@babel/runtime/helpers/inherits":
/*!**************************************************!*\
  !*** external "@babel/runtime/helpers/inherits" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/inherits");

/***/ }),

/***/ "@babel/runtime/helpers/objectSpread":
/*!******************************************************!*\
  !*** external "@babel/runtime/helpers/objectSpread" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectSpread");

/***/ }),

/***/ "@babel/runtime/helpers/objectWithoutProperties":
/*!*****************************************************************!*\
  !*** external "@babel/runtime/helpers/objectWithoutProperties" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectWithoutProperties");

/***/ }),

/***/ "@babel/runtime/helpers/possibleConstructorReturn":
/*!*******************************************************************!*\
  !*** external "@babel/runtime/helpers/possibleConstructorReturn" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/possibleConstructorReturn");

/***/ }),

/***/ "@babel/runtime/helpers/slicedToArray":
/*!*******************************************************!*\
  !*** external "@babel/runtime/helpers/slicedToArray" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/slicedToArray");

/***/ }),

/***/ "@babel/runtime/helpers/toConsumableArray":
/*!***********************************************************!*\
  !*** external "@babel/runtime/helpers/toConsumableArray" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/toConsumableArray");

/***/ }),

/***/ "@babel/runtime/helpers/typeof":
/*!************************************************!*\
  !*** external "@babel/runtime/helpers/typeof" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/typeof");

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ "create-react-class":
/*!*************************************!*\
  !*** external "create-react-class" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("create-react-class");

/***/ }),

/***/ "csv-stringify":
/*!********************************!*\
  !*** external "csv-stringify" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("csv-stringify");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-datepicker":
/*!***********************************!*\
  !*** external "react-datepicker" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-datepicker");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),

/***/ "react-dom-factories":
/*!**************************************!*\
  !*** external "react-dom-factories" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom-factories");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "xhr":
/*!**********************!*\
  !*** external "xhr" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("xhr");

/***/ })

/******/ });
});