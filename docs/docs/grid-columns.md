---
title: Grid Columns
id: grid-columns
prev: grid-component.html
next: grid-interface.html
---

Columns configuration Object is used by [Grid Component](/docs/grid-component.html) as follows:

`columns.js`
{% highlight javascript %}
const columns = {
  name: {
    name: 'Name', // columns title
    sortCycle: ['asc', 'desc', 'default'],
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['name', record => record.name]
  },
  //...some other columns
};
{% endhighlight %}

`SomeComponent.jsx`
{% highlight html tabsize=2 %}
//...inside render method:
<UIKernel.Grid
  model={model}
  cols={columns}
/>
{% endhighlight %}

### Columns configuration Object structure
Columns list is specified as an object with column string IDs as keys and column configuration objects as values.

{% highlight javascript %}
{
  {string}: {                       // Column ID
    name: <string>,                 // Column's <th> tag content
    parent: {string},               // Group name that the column belongs to

    width: {string},                // Column width. E.g.: '70px'

    sortField: {string},            // Field name to be sorted by
    sortCycle: {string[]},          // Sorting modes sequence

    editorField: {string|string[]}, // Editable fields

    /**
     * Function should return React component for editing value of the `editorField`.
     *
     * @param   {Object}           record    Record content
     * @param   {Object}           grid      Grid context(this)
     * @return  {ReactComponent}
    **/
    editor: function (record, grid) { ... },

    render: [
      {string}, ...,                // Fields, used for rendering

      /**
       * Cell rendering function, the last element of the array
       *
       * @param    {Object}   record         Record data (initial data + changes)
       * @param    {bool}     selected       "Selected" row status (check out details in description of Grid Component)
       * @param    {Object}   initialRecord  Initial record data (without changes)
       * @return   {string}                  Cell content (string with HTML markup)
      **/
      function () { }
    ],

    /**
     * Table cell onClick handler.
     *
     * @param    {Event}    e          Event
     * @param    {Any}      recordId   Record ID
     * @param    {Object}   record     Record data
     * @param    {Object}   grid       Grid context(this)
    **/
    onClick: function () { },

    onClickRefs: {
      /**
       * Cell ref onClick handler.
       *
       * @param    {Event}    e          Event
       * @param    {Any}      recordId   Record ID
       * @param    {Object}   record     Record data
       * @param    {Object}   grid       Grid context(this)
      **/
      someRef1: function () {...},
      someRef2: function () {...},
      ...
    }
  }, ...
}
{% endhighlight %}

**Notes:**

- `sortCycle` is an array of string values,
  which must be one of the "asc", "desc" or "default", where
  "asc" stands for "ascending",
  "desc" stands for "descending",
  "default" means unsorted values(in order that data is passed from the model).
  If you omit sortCycle property, sorting for the corresponding column
  will be unavailable for the user. Else if you include the `sortCycle` property
  and pass an array there, the corresponding column will be available
  for toggling sorting there: when the user will click on the column name
  there will be toggled the sorting in the way of next sortCycle's array item
- If you include the `editor` property, there will be available
  editing of fields in cells in the corresponding column for the user else
  cells in the corresponding column will be unavailable for editing.
- `parent` - Common headline for several columns. If specify this
  property with the same value for several columns than headline
  (<th> content) will be united into one with the value
  specified in the field. E.g. you can add common headline 'Full name' for columns
  name and surname, so that the columns will be separate,
  but will have the common headline.
- `sortField` - name of the sorting field(in model) for this column.
  By default sortField==Column ID, but if there is several fields in one column
  or the 'column id' doesn't match any fields in model
  you should specify which field the column will be sorted by.
  E.g.: column 'Full name' consists of fields `name` and `surname`,
  so you can specify that the column should be sorted by the `surname` field.
- `editorField` - name of the field(in model) which will be
   edited in cells of this column. By default editorField==ColumnID,
 but if there is several fields in one column or the ColumnID
   doesn't match any field in model you should use this property.
-  To use `onClickRefs`, corresponding HTML tags must have ref="someRef" attributes
   in markup returned by `render` functions. Check out [usage example here](/docs/removing-records.html).
