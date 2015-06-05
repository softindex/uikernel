---
title: Grid
id: grid-component
prev: list-express-api.html
next: grid-interface.html
---

Grid is a simple component for managing:

* [Sorting and pagination](/examples/sorting-and-pagination/){:target="_blank"};
* [Table cells inplace-editing](/examples/editing-grid-data/){:target="_blank"};
* [Bulk operations](/examples/bulk-operations/){:target="_blank"};
* Record selection;
* Automatically syncs multiple forms and grids with a shared model;
* and more

---

## GridComponent props

| Type     | Name   | Description |
|----------|--------|--------------|
| string | model | Model name |
| Object | cols | Columns list |
| string[] | viewColumns | Visible columns list |
| string | height | Table height if you need grid to be scrollable |
| boolean | saveFullRecord | Pass all record fields (not just changed) flag |
| boolean | realtime | Grid dynamic save flag |
| number | viewCount | One page records count |
| number[] | viewVariants | One page records count choices |
| Function | onSelectedChange | Custom records selection change handler |
| boolean | multipleSorting | Multiple sorting flag |

---

## Columns structure description

Columns list is specified as an object with column string IDs as keys and column configuration objects as values.

{% highlight javascript tabsize=2 %}
{
  {string}: {                       // Column ID
    name: {string},                 // Column tag <th> content
    parent: {string},               // Group name, column belongs to

    width: {string},                // Column width. Example: '70px'

    sortField: {string},            // Sorting parameter
    sortCycle: {string[]},          // Sorting modes sequence
    sortDefault: {string},          // Is default sorted column flag

    editorField: {string|string[]}, // Editable fields

    /**
     * Function returns editor React component.
     *
     * @param   {Object}           props    Default props
     * @return  {ReactComponent}
    **/
    editor: function (props) { },

    render: [
      {string}, ...,                // Fields, used for rendering

      /**
       * Cell rendering function.
       *
       * @param    {any}      recordId  Record ID
       * @param    {Object}   record    Record content
       * @return   {string}             Cell content
      **/
      function () { }
    ],

    /**
     * Table cell onClick handler.
     *
     * @param    {Event}    e          Event
     * @param    {any}      recordId   Record ID
     * @param    {Object}   grid       Grid context
    **/
    onClick: function () { },

    onClickRefs: {
      /**
       * Cell ref onClick handler.
       *
       * @param    {Event}    e          Event
       * @param    {any}      recordId   Record ID
       * @param    {Object}   grid       Grid context
      **/
      test: function () {...},
      ...
    }
  }, ...
}
{% endhighlight %}
