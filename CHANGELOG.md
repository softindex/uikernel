## [Unreleased]
<details>
  <summary>
    Changes that have landed in master but are not yet released.
    Click to see more.
  </summary>

  ### New

  * Grid
    * [Added argument initialRecord to grid columns render function](https://github.com/softindex/uikernel/pull/249)
    
  * Form
    * [Allowed to get undefined fields from `getAll().fields` in FormService (used `Proxy`)](https://github.com/softindex/uikernel/pull/246)

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
    * Update GridComponent if `selectBlackListMode` prop has been changed
    * Fixed applying GridComponent.prototype.setSelectedRecords
  
  * Form
    * [Fixed bug with `FormService.prototype.clearValidation` because of accidental mutations](https://github.com/softindex/uikernel/pull/244)
  
  * SuggestBox Editor
    * [Fixed text overlapping on button](https://github.com/softindex/uikernel/pull/228)
    * [Fixed bug with disabled list items with empty value (0, "", null)](https://github.com/softindex/uikernel/pull/241)
    * [Made moving popup of SuggestBox above the input if it doesn't fit under](https://github.com/softindex/uikernel/pull/242)
    * [Prevented SuggestBox from closing when scrolling event is triggered](https://github.com/softindex/uikernel/pull/242)
    * [Fixed small bag in trying to use dom element of unmounted SuggestBox](https://github.com/softindex/uikernel/pull/244)
    
  * Validators
    * [Handle case when invalid date value was passed to validator](https://github.com/softindex/uikernel/pull/238)
    * Validator could not work with field name `constructor`
    * Fixed merging of same fields in `ValidationErrors.prototype.merge` method
</details>
