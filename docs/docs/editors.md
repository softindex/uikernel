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

| Type                         | Name           | Description |
|------------------------------|----------------|--------------|
| Any                          | **value**      | Field value |
| Function                     | **onChange**   | Selection change handler |
| Boolean                      | disabled=false | Disabled flag |
| [ListModel](list-model.html) | model          | Data model instance - object with methods which return necessary data |
| Function                     | onChangeLabel  | Label change handler |
| Array                        | options        | Options in a [[id, option], ...] or string [ ] format |

---
>If you pass Select the `options` prop, you don't need to pass it the `model` prop, and vice versa.

>Passed model is expected to be compatible with [List Model Interface](list-model.html).
 It should have method `read` which is expected to return promise resolving with options list(array)
 in format [[id1, label1], ...] or [label1, label2, ...],  where
  - `id` - List item id, which can be any serializable value
  - `label` - String value of the list item label

## <span id="DatePicker">DatePicker</span>
DatePicker is a ReactJS component that allows the user to select a date.

[Example](datepicker.html){:target="_blank"}

### DatePicker Properties

| Type                         | Name         | Description  |
|------------------------------|--------------|--------------|
| String \|\| Date \|\| Number | **value**    | Field value  |
| Function                     | **onChange** | Value change handler |
| String                       | format       | Inner field value format |
| String                       | textFormat   | Displayed field value format |
| Date                         | min          | Minimum date value |
| Date                         | max          | Maximum date value |
| Function                     | onBlur       | Element lost focus handler |
| Boolean                      | show         | Show on init flag |

Here `format` and `textFormat` property can be combinations of the following:
- d - day of month (no leading zero)
- dd - day of month (two digit)
- o - day of year (no leading zeros)
- oo - day of year (three digit)
- D - day name short
- DD - day name long
- m - month of year (no leading zero)
- mm - month of year (two digit)
- M - month name short
- MM - month name long
- y - year (two digit)
- yy - year (four digit)
- @ - Unix timestamp (ms since 01/01/1970)
- ! - Windows ticks (100ms since 01/01/0001)
- '...' - literal text
- '' - single quote
- anything else - literal text

E.g.:
- "yy-mm-dd"    will match "1997-01-26"
- "dd.mm.y" will match "01.26.97"
- "m/dd/yy" will match "1/26/1997"
- "DD, MM d, yy" will match "Sunday, January 26, 1997"

---

## <span id="SuggestBox">SuggestBox</span>
SuggestBox is a ReactJS component that can be used to quickly create a drop-down list with support for searching and scrolling.

[Example](suggest-box.html){:target="_blank"}

### SuggestBox Properties

| Type                         | Name               | Description                                                           |
|------------------------------|--------------------|-----------------------------------------------------------------------|
|                              | **value**          | Field value                                                           |
| Function                     | **onChange**       | Selection change handler                                              |
| Boolean                      | disabled           | Disabled flag                                                         |
| [ListModel](list-model.html) | model              | Data model instance - object with methods which return necessary data |
| Function                     | onLabelChange      | Label change handler                                                  |
| Function                     | onMetadataChange   | Meta data change handler, called with onLabelChange                   |
| String                       | label              | Text label                                                            |
| String                       | defaultLabel       | Default text label                                                    |
| React Element                | notFoundElement    | Element to be displayed when there are no search results              |
| React Element                | loadingElement     | Element to be displayed when list items are loading                   |

> Passed model is expected to be compatible with [List Model Interface](list-model.html).
  It should have methods `read` and `getLabel`.
  - Method `read` is expected to return a Promise resolving with an Array in format
    \[{"id": "List item id", "label": "List item label", "metadata":{}, "type": "subitem"}, ...\].
    Where
    - `id` - List item id, which can be any serializable value
    - `label` - String value of the list item label
    - `metadata` - Object with any additional data needed for your code which will get it in onMetadataChange callback w
    - `type` = "group" or "subitem" which means that the label will be displayed as a group headline
      or a subitem of the last group headline respectively.
  - Method `getLabel` is expected to return a Promise resolving with a string value which matches specified id

---

## <span id="Number">Number</span>
Number unlike `<input type =" number "/>` returns a numeric value instead of a string. Usage of this editor will allow
you to avoid problems with the validation of numbers. That's why we advise to use it for work with numbers.

### Number Properties

| Type     | Name         | Description          |
|----------|--------------|----------------------|
| Any      | **value**    | Field value          |
| Function | **onChange** | Value change handler |

---
