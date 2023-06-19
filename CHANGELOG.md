## [Unreleased]
<details>
  <summary>
    Changes that have landed in master but are not yet released.
    Click to see more.
  </summary>

  ## Breaking changes

  * Common
    * Removed `UIKernel.createXhrValidator` (use createValidator)

  * Grid
    * [Rerender Grid if passed new object to viewColumns prop](https://github.com/softindex/uikernel/pull/319)
    * "create" and "delete" events in GridModel has `Array` type in GridCollectionModel
    * Changed GridCollectionModel.delete(recordId) method to GridCollectionModel.delete(recordIds: Array)
    * Changed className of extra records from "others" to "dgrid-others" in GridComponent
    * Changed param type in onChange prop. Now it's Map<TKey, TValue> instead of simple object
    * Renamed property `validation` to `validator` in GridCollectionModel
    * No `exportGridData`, `toJSON`, `toCSV` in browser bundle

  * From
    * [Changed type of returning errors and warnings in formService.getAll(). `string[] | null` to `{message: string}[]`](https://github.com/softindex/uikernel/pull/323)
    * [FormMixin: Changed type of state.errors and state.warnings `string[] | null` to `{message: string}[]`](https://github.com/softindex/uikernel/pull/323)

  * ValidationErrors
    * `UIKernel.Models.ValidationErrors` moved to `UIKernel.ValidationErrors`
    * Changed type `validationErrors.getFieldErrors(string): Array | null` to `validationErrors.getFieldErrors(string): Array`
    * Changed type `validationErrors.getFieldErrorMessages(string): Array | null` to `validationErrors.getFieldErrorMessages(string): Array`
    * Changed type `validationErrors.getFailedFields(): string[] | null` to `validationErrors.getFailedFields(): string[]`

  * DatePicker Editor
    * [Updated datepicker to version 3.6](https://github.com/softindex/uikernel/pull/298). Need to change format of `format` and `textFormat` props from `moment.js` style to `date-fns` style.

  ### New

  * Grid
    * [Added argument initialRecord to grid columns render function](https://github.com/softindex/uikernel/pull/249)
    * [Added grid context param to columns render method](https://github.com/softindex/uikernel/pull/269)
    * [Added `multipart/form-data` encoding to GridXHRModel](https://github.com/softindex/uikernel/pull/270)
    * [Added toCSV export](https://github.com/softindex/uikernel/pull/261)
    * [Added `pageSizeLabel` prop to GridComponent](https://github.com/softindex/uikernel/pull/320)
    * Added `recordId` property to GridModel.prototype.isValidRecord

  * Form
    * [Allowed to get undefined fields from `getAll().fields` in FormService (used `Proxy`)](https://github.com/softindex/uikernel/pull/246)
    * [FormExpressAPI: Added POST handler for long getData requests](https://github.com/softindex/uikernel/pull/282)
    * [Added support multipart form data for form model](https://github.com/softindex/uikernel/pull/321)
    * [Fixed validation race condition](https://github.com/softindex/uikernel/pull/359)
    * Added UIKernel.useFrom hook

  * SuggestBox Editor
    * Added "withEmptyOption" prop to suggest editor [[263](https://github.com/softindex/uikernel/pull/263), [265](https://github.com/softindex/uikernel/pull/265)]
    * [Add defaultOpenTop props to SuggestBox](https://github.com/softindex/uikernel/pull/339)

  * DatePicker Editor
    * [Added `startDate` and `endDate` props](https://github.com/softindex/uikernel/pull/283)
    * [Added `todayButton` prop](https://github.com/softindex/uikernel/pull/320)

  * Validators
    * Added UIKernel.Validator
    * [createValidator is deprecated. Use ValidatorBuilder](https://github.com/softindex/uikernel/pull/422)

  ### Fixed

  * Grid
    * [Fixed `disabled` attribute processing in grid buttons](https://github.com/softindex/uikernel/pull/229)
    * [Fixed grid behavior after pressing ESC or ENTER](https://github.com/softindex/uikernel/pull/231)
    * [Removed selected prop mutation which cause bugs](https://github.com/softindex/uikernel/pull/233)
    * [Fixed update of grid after data changes](https://github.com/softindex/uikernel/pull/235)
    * [Fixed update of grid after select/unselect](https://github.com/softindex/uikernel/pull/235)
    * [Fixed adding statuses (addRecordStatus)](https://github.com/softindex/uikernel/pull/235)
    * [Apply grid filters by merging with previously applied ones](https://github.com/softindex/uikernel/pull/239)
    * [Fixed handling of plain Errors among changes returned from GridModel.prototype.update](https://github.com/softindex/uikernel/pull/243)
    * [Fixed bugs concerned with editing of grids](https://github.com/softindex/uikernel/pull/250)
    * [Made calling of grid.onChange after every change in the grid, not only after blur](https://github.com/softindex/uikernel/pull/251)
    * [Send POST read request if query string too large](https://github.com/softindex/uikernel/pull/260)
    * [Fixed removing of unnecessary extra records](https://github.com/softindex/uikernel/pull/272)
    * [Throw client error when update changes are not an array](https://github.com/softindex/uikernel/pull/278)
    * [Allowed empty fields in GridExpressApi](https://github.com/softindex/uikernel/pull/277)
    * [Fixed infinity loader on error](https://github.com/softindex/uikernel/pull/291)
    * [Fix in-grid editor's updateField method](https://github.com/softindex/uikernel/pull/311)
    * [Fixed error in removeRecordStatus](https://github.com/softindex/uikernel/pull/314)
    * [Fix getError bug](https://github.com/softindex/uikernel/pull/315)
    * [Fixed bug with checking viewColumns](https://github.com/softindex/uikernel/pull/318)
    * Update GridComponent if `selectBlackListMode` prop has been changed
    * Fixed applying GridComponent.prototype.setSelectedRecords
    * Fixed bugs with removeRecordStatus and removeRecordStatusAll methods

  * Form
    * [Fixed bug with `FormService.prototype.clearValidation` because of accidental mutations](https://github.com/softindex/uikernel/pull/244)
    * [Add clearing validation error for changing field](https://github.com/softindex/uikernel/pull/340)
    * Fixed bug with `getAll().isLoaded` in `FormService` if `fromModel.getData` throws error

  * SuggestBox Editor
    * [Fixed text overlapping on button](https://github.com/softindex/uikernel/pull/228)
    * [Fixed bug with disabled list items with empty value (0, "", null)](https://github.com/softindex/uikernel/pull/241)
    * [Made moving popup of SuggestBox above the input if it doesn't fit under](https://github.com/softindex/uikernel/pull/242)
    * [Prevented SuggestBox from closing when scrolling event is triggered](https://github.com/softindex/uikernel/pull/242)
    * [Fixed small bag in trying to use dom element of unmounted SuggestBox](https://github.com/softindex/uikernel/pull/244)

  * DatePicker Editor
    * [Fixed datepicker "onBlur" prop](https://github.com/softindex/uikernel/pull/322)
    * [Change new Date to date-fns/parseISO](https://github.com/softindex/uikernel/pull/330)

  * Validators
    * [Handle case when invalid date value was passed to validator](https://github.com/softindex/uikernel/pull/238)
    * [Fixed Date validator](https://github.com/softindex/uikernel/pull/257)
    * Validator could not work with field name `constructor`
    * Fixed merging of same fields in `ValidationErrors.prototype.merge` method

  * Grid
    * [Change lines color](https://github.com/softindex/uikernel/pull/275)
    * [Fixed grid pagination buttons by wcag. Tag "a" changed to "button"](https://github.com/softindex/uikernel/pull/289)
    * Removed `data` property in `GridCollectionModel`. Added `getData` method.

  * Form
    * [FormExpressAPI: "GET /" is deprecated. Use "GET /data" instead](https://github.com/softindex/uikernel/pull/282)
</details>
