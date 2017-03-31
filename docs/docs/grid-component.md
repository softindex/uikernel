---
title: Grid Component
id: grid-component
prev: list-express-api.html
next: grid-columns.html
---

Grid is a simple component for managing:

* [Sorting and pagination](/examples/sorting-and-pagination/){:target="_blank"}
* [Table cells inplace-editing](/examples/editing-grid-data/){:target="_blank"}
* [Bulk operations](/examples/bulk-operations/){:target="_blank"}
* Record selection
* Automatic synchronization of multiple forms and grids with a shared model
* and more

---

## Properties

| Type                | Name                      | Description                                     |
|---------------------|---------------------------|-------------------------------------------------|
| string | **model**  | Model name                |                                                 |
| Object | **cols**   | Columns list              |                                                 |
| string[] \| Object  | viewColumns               | Visible columns list                            |
| string              | height                    | Table height if you need grid to be scrollable  |
| boolean             | saveFullRecord            | Pass all record fields (not just changed) flag  |
| boolean             | autoSubmit                | Grid dynamic save flag                          |
| number              | defaultViewCount          | Default records count per page                  |
| number              | viewCount                 | Records count per page                          |
| number[]            | viewVariants              | Records count choices per page                  |
| Function            | onChangeViewCount         | Records count per page change handler           |
| Function            | onSelectedChange          | Custom records selection change handler         |
| boolean             | multipleSorting           | Multiple sorting flag                           |
| string              | className                 | Class name                                      |
| Object \| Object[]  | defaultSort               | Default sorting                                 |
| Object \| Object[]  | sort                      | Sorting                                         |
| Function            | onSorting                 | Sorting handler                                 |
| Function            | onPageLoad                | Page load handler                               |
| Function            | onError                   | Error handler                                   |
| boolean             | partialErrorChecking=false| Activate partial gradual grid validation        |

---

## Methods

### set

{% highlight javascript %}
set(recordId, Object data, function callback)
{% endhighlight %}

Change grid record

---

### getRecord

{% highlight javascript %}
getRecord(recordId)
{% endhighlight %}

Get a record

---

### getRecordChanges

{% highlight javascript %}
getRecordChanges(recordId)
{% endhighlight %}

Get record changes object

---

### getRecordErrors

{% highlight javascript %}
getRecordChanges(recordId)
{% endhighlight %}

Get record errors object

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

Get grid model

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

Clear all grid changes

---

### reset

{% highlight javascript %}
reset()
{% endhighlight %}

Reset grid state to its initial state

---

### handleChangeViewCount

{% highlight javascript %}
handleChangeViewCount(event)
{% endhighlight %}

Change event handler of displayed rows count in a grid

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

### hasRecordStatus

{% highlight javascript %}
hasRecordStatus(recordId, string status)
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

### setSelectedRecords

{% highlight javascript %}
setSelectedRecords(Array selectedIds, [boolean blackListMode])
{% endhighlight %}

Select only specific records

---

### selectRecord

{% highlight javascript %}
selectRecord(recordId, ignoreBlackList)
{% endhighlight %}

Select a record

---

### unselectRecord

{% highlight javascript %}
unselectRecord(recordId, ignoreBlackList)
{% endhighlight %}

Unselect a record

---

### isSelected

{% highlight javascript %}
isSelected(recordId)
{% endhighlight %}

Check if a record is selected

---

### toggleSelected

{% highlight javascript %}
toggleSelected(recordId)
{% endhighlight %}

Switch "select"

---

### toggleSelectAll

{% highlight javascript %}
toggleSelectAll()
{% endhighlight %}

Switch records selection mode

---

### selectAll

{% highlight javascript %}
selectAll()
{% endhighlight %}

Select all records

---

### unselectAll

{% highlight javascript %}
unselectAll()
{% endhighlight %}

Unselect all records. Switches records selection mode to "whitelist"

---

### isSelectBlackMode

{% highlight javascript %}
isSelectBlackMode()
{% endhighlight %}

Get current records selection mode

---

### getAllSelected

{% highlight javascript %}
getAllSelected()
{% endhighlight %}

Get all selected records

---

### updateTable

{% highlight javascript %}
updateTable([function callback])
{% endhighlight %}

Fetch server data

---
