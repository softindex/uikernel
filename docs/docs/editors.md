---
title: Editors
id: editors
prev: server-model.html
next: labels.html
---

UIKernel provides the following editors:

* [Select](#Select)
* [DatePicker](#DatePicker)
* [SuggestBox](#SuggestBox)
* [Number](#Number)

---

## <span id="Select">Select</span>
Select is a simple component for ReactJS. It is used to create a drop-down list.

[Example](select.html){:target="_blank"}

### Select Properties

| Type     | Name   | Description |
|----------|--------|--------------|
| | **value** | Field value |
| function | **onChange** | Selection change handler |
| boolean | disabled=false | Disabled flag |
| [ListModel](list-model.html) | model | Model object should have 'read' method |
| function | onChangeLabel | Label change handler |
| Array | options | Options in a [[id, option], ...] or string[] format |

---
>If you pass Select the options prop, you don't need to pass it the model prop, and vice versa.

## <span id="DatePicker">DatePicker</span>
DatePicker is a ReactJS component that allows the user to select a date.

[Example](datepicker.html){:target="_blank"}

### DatePicker Properties

| Type     | Name   | Description |
|----------|--------|--------------|
|  | **value** | Field value |
| function | **onChange** | Value change handler |
| string | format | Inner field value format |
| Date | min | Minimum date value |
| Date | max | Maximum date value |
| function | onBlur | Element lost focus handler |
| function | onFocus | Element focus handler |
| boolean | show | Show on init flag |
| string | textFormat | Displayed field value format |


---

## <span id="SuggestBox">SuggestBox</span>
SuggestBox is a ReactJS component that can be used to quickly create a drop-down list with support for searching and scrolling.

[Example](suggest-box.html){:target="_blank"}

### SuggestBox Properties

| Type                         | Name               | Description                                               |
|------------------------------|--------------------|-----------------------------------------------------------|
|                              | **value**          | Field value                                               |
| function                     | **onChange**       | Selection change handler                                  |
| number                       | debounce           | Search timeout, ms                                        |
| boolean                      | disabled           | Disabled flag                                             |
| [ListModel](list-model.html) | model              | Model object should have the 'read' method                |
| function                     | onBlur             | Element lost focus value                                  |
| function                     | onChangeLabel      | Label change handler                                      |
| function                     | onMetadataChange   | Meta data change handler                                  |
| boolean                      | select             | Select button visibility flag                             |
| string                       | label              | Text label                                                |
| string                       | defaultLabel       | Default text label                                        |
| element                      | notFoundElement    | Element to be displayed when there are no search results  |
| element                      | loadingElement     | Element to be displayed when list items are loading       |

---

## <span id="Number">Number</span>
Number unlike `<input type =" number "/>` returns a numeric value instead of a string. Usage of this editor will allow
you to avoid problems with the validation of numbers. That's why we advise to use it for work with numbers.

### Number Properties

| Type     | Name         | Description          |
|----------|--------------|----------------------|
|          | **value**    | Field value          |
| function | **onChange** | Value change handler |

---
