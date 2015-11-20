---
title: Grid Component
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

## Properties
---

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
| string | className | Class name |
| Object \| Object[] | defaultSort | Default sorting |
| Object \| Object[] | sort | Sorting |
| Function | onSorting | Sorting handler |

---

## Methods

### set

{% highlight javascript %}
set(recordId, Object data, function callback)
{% endhighlight %}

Change table record

---

### getRecord

{% highlight javascript %}
getRecord(recordId)
{% endhighlight %}

Get record data

---

### getRecordChanges

{% highlight javascript %}
getRecordChanges(recordId)
{% endhighlight %}

Get record changes object

---

### getErrors

{% highlight javascript %}
getErrors()
{% endhighlight %}

Get validation errors

---

### getModel

{% highlight javascript %}
getModel(recordId)
{% endhighlight %}

Get table model

---

### save

{% highlight javascript %}
save([function callback])
{% endhighlight %}

Save grid changes

---

### clearRecordChanges

{% highlight javascript %}
clearRecordChanges(recordId)
{% endhighlight %}

Clear record changes

---

### clearAllChanges

{% highlight javascript %}
clearAllChanges()
{% endhighlight %}

Clear all table changes

---

### reset

{% highlight javascript %}
reset()
{% endhighlight %}

Reset to initial table state

---

### handleChangeViewCount

{% highlight javascript %}
handleChangeViewCount(event)
{% endhighlight %}

Change event handler of displayed rows count in a table

---

### handleFirstPage

{% highlight javascript %}
handleFirstPage(event)
{% endhighlight %}

Move to first page event handler

---

### handleLastPage

{% highlight javascript %}
handleLastPage(event)
{% endhighlight %}

Move to last page event handler

---

### handlePrevPage

{% highlight javascript %}
handlePrevPage(event)
{% endhighlight %}

Move to previous page event handler

---

### handleNextPage

{% highlight javascript %}
handleNextPage(event)
{% endhighlight %}

Move to next page event handler

---

### getCurrentPage

{% highlight javascript %}
getCurrentPage()
{% endhighlight %}

Get current page index number

---

### getCountRecords

{% highlight javascript %}
getCountRecords()
{% endhighlight %}

Get records number

---

### setPage

{% highlight javascript %}
setPage(page)
{% endhighlight %}

Move to another page

---

### setViewCount

{% highlight javascript %}
setViewCount(viewCount)
{% endhighlight %}

Set displayed elements count

---

### getPagesCount

{% highlight javascript %}
getPagesCount()
{% endhighlight %}

Get pages count

---

### sort

{% highlight javascript %}
sort(string column, string direction)
{% endhighlight %}

Sort by column

---

### getSortDirection

{% highlight javascript %}
getSortDirection()
{% endhighlight %}

Get sort direction

---

### resetSorting:

{% highlight javascript %}
resetSorting()
{% endhighlight %}

Reset to default sort parameters

---

### addRecordStatus

{% highlight javascript %}
addRecordStatus(recordId, string status)
{% endhighlight %}

Add record status

---

### addRecordStatusGroup

{% highlight javascript %}
addRecordStatusGroup(Array group, string status)
{% endhighlight %}

Add status to records group

---

### removeRecordStatus

{% highlight javascript %}
removeRecordStatus(recordId, string status)
{% endhighlight %}

Remove record status

---

### isStatus

{% highlight javascript %}
isStatus(recordId, string status)
{% endhighlight %}

Check record status presence

---

### getAllWithStatus

{% highlight javascript %}
getAllWithStatus(string status)
{% endhighlight %}

Get all record IDs that have the status

---

### removeRecordStatusAll

{% highlight javascript %}
removeRecordStatusAll(string status)
{% endhighlight %}

Remove records status

---

### updateTable

{% highlight javascript %}
updateTable([function callback])
{% endhighlight %}

Fetch server data

---

## Columns structure description

Columns list is specified as an object with column string IDs as keys and column configuration objects as values.

{% highlight javascript %}
{
  {string}: {                       // Column ID
    name: {string},                 // Column tag <th> content
    parent: {string},               // Group name, column belongs to

    width: {string},                // Column width. Example: '70px'

    sortField: {string},            // Sorting parameter
    sortCycle: {string[]},          // Sorting modes sequence

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
