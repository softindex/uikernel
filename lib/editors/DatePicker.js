"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const react_1 = __importDefault(require("react"));
const react_datepicker_1 = __importDefault(require("react-datepicker"));
const DEFAULT_PROPS = {
    textFormat: 'yyyy-MM-dd',
    todayButton: 'Today'
};
class DatePickerEditor extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.onChange = (date) => {
            var _a;
            const formatedDate = date ? (0, date_fns_1.format)(date, (_a = this.props.format) !== null && _a !== void 0 ? _a : '') : date;
            this.props.onChange(formatedDate);
        };
    }
    parseDate(value) {
        if (!value) {
            return null;
        }
        return typeof value === 'string' ? (0, date_fns_1.parseISO)(value) : value;
    }
    render() {
        const { textFormat, value, min, max, onBlur, endDate, startDate, ...otherProps } = this.props;
        return (react_1.default.createElement(react_datepicker_1.default, { ...otherProps, dateFormat: textFormat, selected: this.parseDate(value), onChange: this.onChange, minDate: this.parseDate(min), maxDate: this.parseDate(max), startDate: this.parseDate(startDate), endDate: this.parseDate(endDate), onCalendarClose: onBlur }));
    }
}
DatePickerEditor.defaultProps = DEFAULT_PROPS;
exports.default = DatePickerEditor;
//# sourceMappingURL=DatePicker.js.map