---
title: Grid Component
id: grid-component
prev: list-express-api.html
next: grid-columns.html
---

Grid is a simple React component with huge capabilities
which helps to create data driven spreadsheets with capabilities of:

* [Sorting and pagination](/examples/sorting-and-pagination/){:target="_blank"}
* [Table cells inplace-editing](/examples/editing-grid-data/){:target="_blank"}
* [Record selection and Bulk operations](/examples/bulk-operations/){:target="_blank"}
* [Automatic synchronization of multiple forms and grids with a shared data model](/docs/data-binding.html)
* and more

---

{% highlight html tabsize=2 %}
  <UIKernel.Grid
    ref={(grid) => this.grid = grid}
    model={model}
    cols={columns}
    viewColumns={viewColumns}
    height={height}
    saveFullRecord={saveFullRecord}
    autoSubmit={autoSubmit}
    defaultViewCount={defaultViewCount}
    viewCount={viewCount}
    viewVariants={viewVariants}
    onChangeViewCount={onChangeViewCount}
    onSelectedChange={onSelectedChange}
    className={className}
    multipleSorting={multipleSorting}
    defaultSort={defaultSort}
    sort={sort}
    onSorting={onSorting}
    onPageLoad={onPageLoad}
    onError={onError}
    partialErrorChecking={partialErrorChecking}
  />
{% endhighlight %}

---

## [Properties](#properties)

| Type                                                              | Name                       | Description                                                 |
|-------------------------------------------------------------------|----------------------------|-------------------------------------------------------------|
| [GridModel](/docs/grid-interface.html)                            | model                      | *Required*. Grid model instance                             |
| Object                                                            | cols                       | *Required*. Grid columns configuration. [Check out description here](/docs/grid-columns.html) |
| <span style="white-space:nowrap;"> String [ ] \|\| Object </span> | viewColumns                | *Optional*. Visible columns list                            |
| String                                                            | height                     | *Optional*. Table height if you need grid to be scrollable  |
| Boolean                                                           | saveFullRecord=false       | *Optional*. Pass all record fields (not just changed) flag  |
| Boolean                                                           | autoSubmit                 | *Optional*. Submit changed(in inplace editor) grid records on blur event |
| Number                                                            | defaultViewCount=0         | *Optional*. Default records count per page (which can be further changed by grid methods)                 |
| Number                                                            | viewCount                  | *Optional*. Static records count per page. Locks records count per page preventing further changes by grid methods |
| Number [ ]                                                        | viewVariants               | *Optional*. Records count per page options                  |
| Function                                                          | onChangeViewCount          | *Optional*. Records count per page change handler           |
| Function                                                          | onSelectedChange           | *Optional*. Custom records selection(by checkboxes in grid) change handler         |
| String                                                            | className                  | *Optional*. HTML 'class' attribute                                      |
| Boolean                                                           | multipleSorting=false      | *Optional*. Multiple sorting flag. If `true` - it will be available to sort by multiple rules.                           |
| <span style="white-space:nowrap;"> Object \|\| Object [ ] </span> | defaultSort                | *Optional*. Default sorting direction(which can be further changed by grid methods). Should be an Object (or Arry of such objects) with fields `column` and `direction`(one of 'asc'/'desc'), e.g.: {column: "age", direction: "asc"} |
| <span style="white-space:nowrap;"> Object \|\| Object [ ] </span> | sort                       | *Optional*. Static sorting direction. Locks sorting in only this way preventing further changes by grid methods. Should be an Object (or Arry of such objects) with fields `column` and `direction`(one of 'asc'/'desc'), e.g.: {column: "age", direction: "asc"}. If an array is passed, the sorting will be performed by all specified rules one by one(rule with smaller index has bigger priority).  |
| Function                                                          | onSorting                  | *Optional*. Sorting changes handler(is called when way of sorting is changed)                                |
| Function                                                          | onPageLoad                 | *Optional*. Page load handler(is called when grid data for displaying a new page is loaded)                               |
| Function                                                          | onError                    | *Optional*. Errors handler. If it is omitted then appeared errors will be thrown(e.g. when grid data couldn't be loaded because of network error)                     |
| Boolean                                                           | partialErrorChecking=false | *Optional*. Activate partial gradual grid validation(if true - fields validation will be called on blur event in inplace editors of the grid, else fields validation will be called in `grid.save()` method) |

**`onChangeViewCount` arguments:**

| Type       | Name        | Description                              |
|------------|-------------|------------------------------------------|
| Number     | count       | New value of the records count per page  |

**`onSelectedChange` arguments:**

| Type       | Name        | Description                                  |
|------------|-------------|----------------------------------------------|
| Any[]      | selectedIds | New value of currently selected records ids  |
| Number     | count       | New amount of currently selected records     |

**`onSorting` arguments:**

| Type                                                                         | Name        | Description                                  |
|------------------------------------------------------------------------------|-------------|---------------------------------------------------------------------------------------|
| <span style="white-space:nowrap;"> Object \|\| Object [ ]  \|\| null </span> | sortState   | New sorting rules state. `null` if no sorting rules is set, else returns `object` if `props.multipleSorting` isn't set else returns `object[]` with sorting rules; the object will consist of fields "column" and "direction".    |
| String                                                                       | column      | New selected for sorting column name         |
| String                                                                       | direction   | New selected for sorting direction           |

**`onPageLoad` arguments:**

| Type       | Name        | Description                                                         |
|------------|-------------|---------------------------------------------------------------------|
| Any        | data        | New data which was successfully loaded from the `props.model.read`  |

**`onError` arguments:**

| Type       | Name        | Description                                                             |
|------------|-------------|-------------------------------------------------------------------------|
| Any        | error       | Error which was caught while fetching data from the `props.model.read`  |

---

## Methods

- [set](/docs/grid-component.html#set)
- [getRecord](/docs/grid-component.html#getrecord)
- [getRecordChanges](/docs/grid-component.html#getrecordchanges)
- [getRecordErrors](/docs/grid-component.html#getrecorderrors)
- [getErrors](/docs/grid-component.html#geterrors)
- [getModel](/docs/grid-component.html#getmodel)
- [async save](/docs/grid-component.html#async-save)
- [clearRecordChanges](/docs/grid-component.html#clearrecordchanges)
- [clearAllChanges](/docs/grid-component.html#clearallchanges)
- [reset](/docs/grid-component.html#reset)
- [handleChangeViewCount](/docs/grid-component.html#handlechangeviewcount)
- [handleFirstPage](/docs/grid-component.html#handlefirstpage)
- [handleLastPage](/docs/grid-component.html#handlelastpage)
- [handlePrevPage](/docs/grid-component.html#handleprevpage)
- [handleNextPage](/docs/grid-component.html#handlenextoage)
- [getCurrentPage](/docs/grid-component.html#getcurrentoage)
- [getCountRecords](/docs/grid-component.html#getcountrecords)
- [setPage](/docs/grid-component.html#setpage)
- [setViewCount](/docs/grid-component.html#setviewcount)
- [getPagesCount](/docs/grid-component.html#getpagescount)
- [sort](/docs/grid-component.html#sort)
- [getSortDirection](/docs/grid-component.html#getsortdirection)
- [resetSorting](/docs/grid-component.html#resetsorting)
- [addRecordStatus](/docs/grid-component.html#addrecordstatus)
- [addRecordStatusGroup](/docs/grid-component.html#addrecordstatusgroup)
- [removeRecordStatus](/docs/grid-component.html#removerecordstatus)
- [hasRecordStatus](/docs/grid-component.html#hasrecordstatus)
- [getAllWithStatus](/docs/grid-component.html#getallwithstatus)
- [removeRecordStatusAll](/docs/grid-component.html#removerecordstatusall)
- [setSelectedRecords](/docs/grid-component.html#setselectedrecords)
- [selectRecord](/docs/grid-component.html#selectrecord)
- [unselectRecord](/docs/grid-component.html#unselectrecord)
- [isSelected](/docs/grid-component.html#isselected)
- [toggleSelected](/docs/grid-component.html#toggleselected)
- [toggleSelectAll](/docs/grid-component.html#toggleselectall)
- [selectAll](/docs/grid-component.html#selectall)
- [unselectAll](/docs/grid-component.html#unselectall)
- [isSelectBlackMode](/docs/grid-component.html#isselectblackmode)
- [getAllSelected](/docs/grid-component.html#getallselected)
- [async updateTable](/docs/grid-component.html#async-updatetable )

### set

{% highlight javascript %}
  grid.set(recordId, data);
{% endhighlight %}

Change grid record. The method marks changed fields and validates them.
If `autoSubmit` is turned on, method `grid.save()` will be called.

**Parameters**:

| Type     | Name           | Description                                                                                |
|----------|----------------|--------------------------------------------------------------------------------------------|
| Any      | recordId       | *Required*. ID of the record that is to be updated                                         |
| Object   | data           | *Required*. Data to be set. Expected object structure: {field1: 'value1', ..., fieldN: 'valueN'} |

---

### getRecord

{% highlight javascript %}
  const gridRecord = grid.getRecord(recordId);
{% endhighlight %}

Get record data by `recordId`. If the record has changes the result data will contain these changes too.

**Parameters**:

| Type     | Name           | Description                                        |
|----------|----------------|----------------------------------------------------|
| Any      | recordId       | *Required*. ID of the record to get data of        |

**Returns**: *Object* with record data which has the following structure:
             `{field1: 'value1', ..., fieldN: 'valueN'}`.

---

### getRecordChanges

{% highlight javascript %}
  const recordChanges = grid.getRecordChanges(recordId);
{% endhighlight %}

Get record changes by `recordId`. If the record has no changes an empty object will be returned.

**Parameters**:

| Type     | Name           | Description                                        |
|----------|----------------|----------------------------------------------------|
| Any      | recordId       | *Required*. ID of the record to get changes of        |

**Returns**: *Object* with record changes which has the following structure:
             `{field1: 'changes1', ..., fieldN: 'changesN'}`.

---

### getRecordErrors

{% highlight javascript %}
  const recErrors = grid.getRecordErrors(recordId);
{% endhighlight %}

Get validation errors of the record with specified `recordId`.

**Parameters**:

| Type     | Name           | Description                                        |
|----------|----------------|----------------------------------------------------|
| Any      | recordId       | *Required*. ID of the record to get errors of      |

**Returns**: `ValidationErrors` instance.

---

### getErrors

{% highlight javascript %}
  const errors = grid.getErrors();
{% endhighlight %}

Get validation errors of all grid records.

**Returns**: `null` if there is no errors else *Array* of record entries in format:
[['recId1', validationErrorsInstance1], ..., ['recIdN', validationErrorsInstanceN]].

---

### getModel

{% highlight javascript %}
  const gridModel = grid.getModel();
{% endhighlight %}

Get grid model(which was passed to the grid as `props.model`).

**Returns**: [`GridModel`](/docs/grid-interface.html) instance.

---

### async save

{% highlight javascript %}
  const result = await grid.save();
{% endhighlight %}

Save grid changes: calls `props.model.update` with current grid changes and resolves it's response.
If the result of that call contains ValidationErrors, they will be added to internal errors list.
Successfully saved changes will be cleared form changes list.

**Returns**: promise which resolves with response from `props.model.update`.

---

### clearRecordChanges

{% highlight javascript %}
  grid.clearRecordChanges(recordId);
{% endhighlight %}

Clear record changes. Corresponding warnings and errors for the record will be cleared as well.

**Parameters**:

| Type     | Name           | Description                                        |
|----------|----------------|----------------------------------------------------|
| Any      | recordId       | *Required*. ID of the record to clear changes of   |

---

### clearAllChanges

{% highlight javascript %}
  grid.clearAllChanges();
{% endhighlight %}

Clear all grid changes(and their warnings and errors).

---

### reset

{% highlight javascript %}
  grid.reset();
{% endhighlight %}

Reset grid to its initial state: set page = 1 and reset sorting.

---

### handleChangeViewCount

{% highlight javascript %}
  grid.handleChangeViewCount(event);
{% endhighlight %}

Event handler of displayed rows count change in a grid.
The method is useful if you would like to implement your own
component for selecting amount of records per page,
so you would add this event handler to your component and when
it is called the grid will perform the event.

**Parameters**:

| Type                                                                 | Name    | Description                                        |
|----------------------------------------------------------------------|---------|----------------------------------------------------|
| [SyntheticEvent](https://facebook.github.io/react/docs/events.html)  | event   | *Required*. Event of changing view count in a corresponding React Component. The new value of `viewCount` is expected to be in `event.target.value`.  |

---

### handleFirstPage

{% highlight javascript %}
  grid.handleFirstPage(event);
{% endhighlight %}

Event handler of moving to the first page in the grid pagination.
The method is useful if you'd like to implement your own grid pagination,
so you would add this event handler to your component and when
it is called the grid will perform the event.

**Parameters**:

| Type                                                                 | Name    | Description                                        |
|----------------------------------------------------------------------|---------|----------------------------------------------------|
| [SyntheticEvent](https://facebook.github.io/react/docs/events.html)  | event   | *Required*. Event of moving to the first page of the grid pagination in a corresponding React Component. It will be called `event.preventDefault()` in case the corresponding component is a button and moved to the first page in the grid pagination.  |

---

### handleLastPage

{% highlight javascript %}
  grid.handleLastPage(event);
{% endhighlight %}

Event handler of moving to the last page in the grid pagination.
The method is useful if you'd like to implement your own grid pagination,
so you would add this event handler to your component and when
it is called the grid will perform the event.

**Parameters**:

| Type                                                                 | Name    | Description                                        |
|----------------------------------------------------------------------|---------|----------------------------------------------------|
| [SyntheticEvent](https://facebook.github.io/react/docs/events.html)  | event   | *Required*. Event of moving to the last page of the grid pagination in a corresponding React Component. It will be called `event.preventDefault()` in case the corresponding component is a button and moved to the last page in the grid pagination.  |

---

### handlePrevPage

{% highlight javascript %}
  grid.handlePrevPage(event);
{% endhighlight %}

Event handler of moving to the previous page in the grid pagination.
The method is useful if you'd like to implement your own grid pagination,
so you would add this event handler to your component and when
it is called the grid will perform the event.

**Parameters**:

| Type                                                                 | Name    | Description                                        |
|----------------------------------------------------------------------|---------|----------------------------------------------------|
| [SyntheticEvent](https://facebook.github.io/react/docs/events.html)  | event   | *Required*. Event of moving to the previous page of the grid pagination in a corresponding React Component. It will be called `event.preventDefault()` in case the corresponding component is a button and moved to the next page in the grid pagination.  |

---

### handleNextPage

{% highlight javascript %}
  grid.handleNextPage(event);
{% endhighlight %}

Event handler of moving to the next page in the grid pagination.
The method is useful if you'd like to implement your own grid pagination,
so you would add this event handler to your component and when
it is called the grid will perform the event.

**Parameters**:

| Type                                       | Name    | Description                                        |
|--------------------------------------------|---------|----------------------------------------------------|
| [SyntheticEvent](https://facebook.github.io/react/docs/events.html)  | event   | *Required*. Event of moving to the next page of the grid pagination in a corresponding React Component. It will be called `event.preventDefault()` in case the corresponding component is a button and moved to the next page in the grid pagination.  |

---

### getCurrentPage

{% highlight javascript %}
  const currPageIndex = grid.getCurrentPage();
{% endhighlight %}

Get current page index (pagination item number) (numeration from 0).

**Returns**: `Number`.

---

### getCountRecords

{% highlight javascript %}
  const gridRecordsNumber = grid.getCountRecords();
{% endhighlight %}

Get overall number of records in the grid
(including all pagination pages, even if those pages aren't fetched yet).

**Returns**: `Number`. If the grid has no records the method will return `0`.

---

### setPage

{% highlight javascript %}
  grid.setPage(page);
{% endhighlight %}

Set current page index(pagination item number) (numeration from 0).

---

### setViewCount

{% highlight javascript %}
  grid.setViewCount(viewCount);
{% endhighlight %}

Set number of displayed elements(table rows) for each page.

> This method is only available if `props.viewCount` isn't set.

**Parameters**:

| Type     | Name      | Description                                                             |
|----------|-----------|-------------------------------------------------------------------------|
| Number   | viewCount | *Required*. Amount of displayed elements(table rows) for each page. The value must be >= 0. `0` means "display all records on 1 page".    |

---

### getPagesCount

{% highlight javascript %}
  const gridPagesCount = grid.getPagesCount();
{% endhighlight %}

Get number of pages in pagination.

**Returns**: `Number`

---

### sort

{% highlight javascript %}
  grid.sort(string field, string direction)
{% endhighlight %}

Add sorting of grid records by specified `field` in specified `direction`:
if `props.multipleSorting` is set - the specified rule will be added to an internal sorting queue,
else an internal sorting queue will be set to the specified rule.
The grid will be rerenderead and `props.onSorting` will be called afterwards.

> This method is only available if `props.sort` isn't set.

> Sorting is performed by props.model, not by the grid component itself. Grid component only passes there its internal sorting queue in model.read() method.

**Parameters**:

| Type     | Name      | Description                                              |
|----------|-----------|----------------------------------------------------------|
| String   | field     | *Required*. Field name(in `props.model`) to sort by.     |
| String   | direction | *Required*. Sorting direction to sort in. Expected to be one of: 'asc'/'desc'/'default'. |

---

### getSortDirection

{% highlight javascript %}
  const sortingRules = grid.getSortDirection();
{% endhighlight %}

Get current sorting rules.

**Returns**: `null` if no sorting rules is set,
else returns `object` if `props.multipleSorting` isn't set
else returns `object[]` with sorting rules.
The object will consist of fields "column" and "direction".

---

### resetSorting:

{% highlight javascript %}
  grid.resetSorting();
{% endhighlight %}

Reset sorting rules to default parameters(`props.defaultSort`).
Calls `props.onSorting` and rerenders grid table afterwards.

> This method is only available if `props.sort` isn't set.

---

### addRecordStatus

{% highlight javascript %}
  grid.addRecordStatus(recordId, status);
{% endhighlight %}

Add record status(the status will be stored in internal hash map
and it will be set className with the `status` value to the corresponding row in the grid).

**Parameters**:

| Type     | Name      | Description                                              |
|----------|-----------|----------------------------------------------------------|
| Any      | recordId  | *Required*. ID of the record to add status to.           |
| String   | status    | *Required*. Status value                                 |

---

### addRecordStatusGroup

{% highlight javascript %}
  grid.addRecordStatusGroup(Array group, status);
{% endhighlight %}

Add status to records group(to each record of the specified array `group`)
(the status will be stored in an internal hash map
and it will be set className with the `status` value to the corresponding row in the grid).

**Parameters**:

| Type     | Name      | Description                                              |
|----------|-----------|----------------------------------------------------------|
| Any[]    | group     | *Required*. IDs of records to add status to.             |
| String   | status    | *Required*. Status value                                 |

---

### removeRecordStatus

{% highlight javascript %}
  grid.removeRecordStatus(recordId, status);
{% endhighlight %}

Remove record status(the status will be removed from the internal hash map
and it will be removed className with the `status` value from the corresponding row in the grid).

**Parameters**:

| Type     | Name      | Description                                              |
|----------|-----------|----------------------------------------------------------|
| Any      | recordId  | *Required*. ID of the record to remove status from.      |
| String   | status    | *Required*. Status value.                                |

---

### hasRecordStatus

{% highlight javascript %}
  const recHasStatus = grid.hasRecordStatus(recordId, status);
{% endhighlight %}

Check record status presence.

**Parameters**:

| Type     | Name      | Description                                              |
|----------|-----------|----------------------------------------------------------|
| Any      | recordId  | *Required*. ID of the record to check status of.         |
| String   | status    | *Required*. Status value.                                |

**Returns**: *Boolean*. `true` - record with id = `recordId` has `status`,
             else returns `false`.

---

### getAllWithStatus

{% highlight javascript %}
  const ids = grid.getAllWithStatus(status);
{% endhighlight %}

Get all record IDs that have the specified `status`.

**Parameters**:

| Type     | Name      | Description                         |
|----------|-----------|-------------------------------------|
| String   | status    | *Required*. Status value.           |

**Returns**: *Array* with IDs of records that have specified `status`.
             If there is no records that have the specified `status`,
             an empty array will be returned.

---

### removeRecordStatusAll

{% highlight javascript %}
  grid.removeRecordStatusAll(status);
{% endhighlight %}

Remove specified status from all records.

| Type     | Name      | Description                         |
|----------|-----------|-------------------------------------|
| String   | status    | *Required*. Status value to remove. |

---

### setSelectedRecords

{% highlight javascript %}
  grid.setSelectedRecords(selectedIds, blackListMode);
{% endhighlight %}

Select only specific records.

**Parameters**:

| Type     | Name             | Description                                              |
|----------|------------------|----------------------------------------------------------|
| Any[]    | selectedIds      | *Required*. IDs of records to select.                    |
| Boolean  | blackListMode    | *Optional*. true = BlackList mode will be turned on. By default WhiteList mode is turned on.  |

---

### selectRecord

{% highlight javascript %}
  grid.selectRecord(recordId, ignoreBlackList);
{% endhighlight %}

Select specified record. `props.onSelectedChange()` will be called afterwards.
If all the grid records becomes selected - the BlackList mode will be toggled.

**Parameters**:

| Type     | Name                   | Description                                              |
|----------|------------------------|----------------------------------------------------------|
| Any      | recordId               | *Required*. Record id to select                          |
| Boolean  | ignoreBlackList=false  | *Optional*. true = select record despite BlackList mode  |

---

### unselectRecord

{% highlight javascript %}
  grid.unselectRecord(recordId, ignoreBlackList);
{% endhighlight %}

Unselect specified record. `props.onSelectedChange()` will be called afterwards.
If all the grid records becomes selected - the BlackList mode will be toggled.

**Parameters**:

| Type     | Name                   | Description                                                |
|----------|------------------------|------------------------------------------------------------|
| Any      | recordId               | *Required*. Record id to select                            |
| Boolean  | ignoreBlackList=false  | *Optional*. true = unselect record despite BlackList mode  |

---

### isSelected

{% highlight javascript %}
  isRecSelected = grid.isSelected(recordId);
{% endhighlight %}

Check if a record is selected.

**Parameters**:

| Type     | Name      | Description                                   |
|----------|-----------|-----------------------------------------------|
| Any      | recordId  | *Required*. Record id to check selection of.  |

**Returns**: *Boolean*. Record selection state:
             `true` - record is selected and records selection mode = 'Whitelist',
             else returns `false`.

---

### toggleSelected

{% highlight javascript %}
  grid.toggleSelected(recordId);
{% endhighlight %}

Switch selection of the specified record:
if the record is selected, it will be called `grid.unselectRecord()`,
else it will be called `grid.selectRecord()`.

**Parameters**:

| Type     | Name      | Description                                   |
|----------|-----------|-----------------------------------------------|
| Any      | recordId  | *Required*. Record id to switch selection of. |

---

### toggleSelectAll

{% highlight javascript %}
  grid.toggleSelectAll();
{% endhighlight %}

Switch records selection mode: if current state is "blacklist",
calls `grid.unselectAll()`, else calls `grid.selectAll()`.

---

### selectAll

{% highlight javascript %}
  grid.selectAll();
{% endhighlight %}

Select all records: switches records selection mode to "blacklist",
clears list of selected records, rerenders grid table and calls `props.onSelectedChange()`.

---

### unselectAll

{% highlight javascript %}
  grid.unselectAll();
{% endhighlight %}

Unselect all records: switches records selection mode to "whitelist",
clears list of selected records, rerenders grid table and calls `props.onSelectedChange()`.

---

### isSelectBlackMode

{% highlight javascript %}
  const isBlackMode = grid.isSelectBlackMode();
{% endhighlight %}

Get current records selection mode.

**Returns**: *Boolean*. Records selection mode: `true` - Blacklist, `false` - Whitelist.

---

### getAllSelected

{% highlight javascript %}
  const selectedRecordIds = grid.getAllSelected();
{% endhighlight %}

Get IDs of selected records. Note that if Blacklist is turned on, it will be returned IDs of UNselected records.

**Returns**: *Array*. E.g.: `[1, 3, 17]`

---

### async updateTable

{% highlight javascript %}
  await grid.updateTable();
{% endhighlight %}

Update table (it will fetch table data calling `props.model.read()`).
Note that it will be fetched only visible data, so if the grid has several pages of data,
it will be fetched only data of the current page.

---

## Usage example

{% highlight html tabsize=2 %}
class ExampleComponent extends React.Component {
  clearChanges() {
    this.grid.clearAllChanges();      //here we use one of the grid component methods
  }

  render() {
    return (
      <UIKernel.Grid
        ref={(grid) => this.grid = grid}
        model={this.state.model}                             // Grid model
        cols={columns}                                       // columns configuration
        viewCount={10}                                       // display 10 records per page
        defaultSort=\{\{column: "name", direction: "asc"\}\} // default sorting
      />
      <a className="btn btn-success" onClick={this.clearChanges}>Clear</a>
    );
  }
}

ReactDOM.render(<ExampleComponent />, document.getElementById('example'));
{% endhighlight %}

Full example you can found [in the tutorial](/docs/first-grid-component.html).
