"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCorrectNumber = exports.keys = exports.parents = exports.toEncodedString = exports.warn = exports.getStack = exports.getRecordChanges = exports.equalMapToArray = exports.isEmpty = exports.isEqual = exports.forEach = exports.parseValueFromEvent = exports.indexOf = exports.isIntersection = void 0;
const omitBy_1 = __importDefault(require("lodash/omitBy"));
const pick_1 = __importDefault(require("lodash/pick"));
function isIntersection(values, searchValues) {
    if (values.length > searchValues.length) {
        return isIntersection(searchValues, values);
    }
    const searchValuesSet = new Set(searchValues);
    return values.some((value) => searchValuesSet.has(value));
}
exports.isIntersection = isIntersection;
function indexOf(array, item) {
    for (let i = 0; i < array.length; i++) {
        if (isEqual(array[i], item)) {
            return i;
        }
    }
    return -1;
}
exports.indexOf = indexOf;
function parseValueFromEvent(eventOrValue) {
    var _a;
    const target = eventOrValue &&
        typeof eventOrValue === 'object' &&
        'target' in eventOrValue &&
        typeof eventOrValue.target === 'object'
        ? eventOrValue.target
        : undefined;
    if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        switch (target.type) {
            case 'checkbox':
                return target.checked;
            case 'file':
                return (_a = target.files) === null || _a === void 0 ? void 0 : _a[0];
        }
        return target.value;
    }
    return eventOrValue;
}
exports.parseValueFromEvent = parseValueFromEvent;
function forEach(obj, func) {
    for (const prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            func(obj[prop], prop);
        }
    }
}
exports.forEach = forEach;
function isEqual(a, b) {
    if (a === null ||
        b === null ||
        a === undefined ||
        b === undefined ||
        typeof a === 'function' ||
        typeof b === 'function' ||
        a instanceof RegExp ||
        b instanceof RegExp) {
        return String(a) === String(b);
    }
    if (a === b || a.valueOf() === b.valueOf() || (a !== a && b !== b)) {
        return true;
    }
    if ((Array.isArray(a) && (!Array.isArray(b) || a.length !== b.length)) ||
        typeof a !== 'object' ||
        typeof b !== 'object' ||
        a.constructor !== b.constructor) {
        return false;
    }
    if (typeof File === 'function' && (a instanceof File || b instanceof File)) {
        return a instanceof File && b instanceof File && a.size === b.size && a.name === b.name;
    }
    if (a instanceof Set || a instanceof Map || b instanceof Set || b instanceof Map) {
        if ((a instanceof Set && b instanceof Set) || (a instanceof Map && b instanceof Map)) {
            return isEqual([...a], [...b]);
        }
        return false;
    }
    const keys = Object.keys(a);
    return (Object.keys(b).every((key) => keys.includes(key)) &&
        keys.every((key) => isEqual(a[key], b[key])));
}
exports.isEqual = isEqual;
function isEmpty(value) {
    if (!value) {
        return true;
    }
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }
    if (typeof value === 'string') {
        return value.trim().length === 0;
    }
    return false;
}
exports.isEmpty = isEmpty;
function equalMapToArray(map) {
    const result = [];
    for (const [recordId, value] of map) {
        result.push([recordId, { ...value }]);
    }
    return result;
}
exports.equalMapToArray = equalMapToArray;
function getRecordChanges(getValidationDependency, data, changes, newChanges) {
    let result = { ...changes, ...newChanges };
    result = (0, omitBy_1.default)(result, (value, fieldName) => isEqual(data[fieldName], value));
    return { ...result, ...(0, pick_1.default)(data, getValidationDependency(keys(result))) };
}
exports.getRecordChanges = getRecordChanges;
function getStack(deep = 0) {
    let stack = '';
    const stackTraceLimitDefault = Error.stackTraceLimit;
    Error.stackTraceLimit = deep + 12;
    try {
        throw new Error();
    }
    catch (error) {
        if (error.stack) {
            stack = error.stack
                .split('\n')
                .slice(2 + deep)
                .join('\n');
        }
    }
    Error.stackTraceLimit = stackTraceLimitDefault;
    return stack;
}
exports.getStack = getStack;
function warn(message) {
    console.warn(message, '\n', getStack(1));
}
exports.warn = warn;
function toEncodedString(value) {
    return encodeURIComponent(typeof value === 'string' ? value : JSON.stringify(value));
}
exports.toEncodedString = toEncodedString;
function parents(element, selector) {
    let parentElement = element.parentElement;
    const result = [];
    while (parentElement) {
        if (parentElement.matches(selector)) {
            result.push(parentElement);
        }
        parentElement = parentElement.parentElement;
    }
    return result;
}
exports.parents = parents;
function keys(obj) {
    return Object.keys(obj);
}
exports.keys = keys;
function isCorrectNumber(value) {
    return !isNaN(value) && isFinite(value);
}
exports.isCorrectNumber = isCorrectNumber;
//# sourceMappingURL=utils.js.map