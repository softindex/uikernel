---
title: Editors
id: editors
prev: creating-records.html
next: labels.html
---

### The list of complex editors props.

* [Select](#Select)
* [DatePicker](#DatePicker)
* [SuggestBox](#SuggestBox)

---

## <span id="Select">Select</span>

| Type     | Name   | Description |
|----------|--------|--------------|
| boolean | disabled=false | Disabled flag |
| [ListModel](list-model.html) | model | Model object should have 'read' method |
| function | onChange | Selection change handler |
| function | onChangeLabel | Label change handler |
| Array | options | Options in a [[id, option], ...] format |
| | value | Field value |

---


## <span id="DatePicker">DatePicker</span>

| Type     | Name   | Description |
|----------|--------|--------------|
| string | className | Custom class names |
| string | format | Inner field value format |
| string | id | Input id |
| Date | min | Minimum date value |
| Date | max | Maximum date value |
| function | onBlur | Element lost focus handler |
| function | onChange | Value change handler |
| function | onFocus | Element focus handler |
| boolean | show | Show on init flag |
| string | textFormat | Displayed field value format |
|  | value | Field value |

---

## <span id="SuggestBox">SuggestBox</span>
[Example](suggest-box.html)

| Type     | Name   | Description |
|----------|--------|--------------|
| number | debounce | Search timeout, ms |
| boolean | disabled | Disabled flag |
| [ListModel](list-model.html) | model | Model object should have 'read' mathod |
| function | onBlur | Element lost focus value |
| function | onChange | Selection change handler |
| function | onChangeLabel | Label change handler |
| boolean | select | Select button visibility flag |
|  | value | Field value |

---
