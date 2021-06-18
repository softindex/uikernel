/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * React table component
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  throttle,
  isEqual,
  union,
  cloneDeep,
  getRecordChanges,
  isEmpty,
  forEach,
  indexOf,
  clone,
  at,
  parseValueFromEvent,
  findIndex
} from '../common/utils';
import EqualMap from '../common/EqualMap';
import ValidationErrors from '../common/validation/ValidationErrors';
import PureGridComponent from './PureGridComponent';
import ThrottleError from '../common/ThrottleError';

const RESET_MODEL = 'RESET_MODEL';
const RESET_VIEW_COLUMNS = 'RESET_VIEW_COLUMNS';
const RESET_SORT = 'RESET_SORT';
const RESET_VIEW_COUNT = 'RESET_VIEW_COUNT';
const RESET_SELECTED_COLUMNS = 'RESET_SELECTED_COLUMNS';
const RESET_BLACK_LIST_MODE = 'RESET_BLACK_LIST_MODE';
const RESET_STATUSES = 'RESET_STATUSES';
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const propTypes = (() => {
  const sortElementProp = PropTypes.shape({
    column: PropTypes.string,
    direction: PropTypes.any
  });
  const sortProp = PropTypes.oneOfType([
    sortElementProp,
    PropTypes.arrayOf(sortElementProp)
  ]);
  return {
    className: PropTypes.string,
    model: PropTypes.shape({
      read: PropTypes.func.isRequired,
      update: PropTypes.func,
      isValidRecord: PropTypes.func,
      getValidationDependency: PropTypes.func,
      on: PropTypes.func,
      off: PropTypes.func
    }),
    columns: PropTypes.object,
    viewColumns: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.object
    ]),
    selected: PropTypes.array,
    // sort: PropTypes.object,
    page: PropTypes.number,
    defaultViewCount: PropTypes.number,
    viewCount: PropTypes.number,
    viewVariants: PropTypes.arrayOf(PropTypes.number),
    onChangeViewCount: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    onPageLoad: PropTypes.func,
    onInit: PropTypes.func,
    onDestroy: PropTypes.func,
    autoSubmit: PropTypes.bool,
    height: PropTypes.number,
    onSelectedChange: PropTypes.func,
    onSorting: PropTypes.func,
    multipleSorting: PropTypes.bool,
    selectAllStatus: PropTypes.any,
    statuses: PropTypes.any,
    onToggleSelected: PropTypes.func,
    onToggleSelectAll: PropTypes.func,
    defaultSort: (props, propName, ...rest) => {
      if (!props.defaultSort) {
        return;
      }
      const validProp = sortProp(props, propName, ...rest);
      if (validProp) {
        return validProp;
      }
      if (props.hasOwnProperty('sort')) {
        return Error('You can not set "defaultSort" when the "sort" prop is specified');
      }
    },
    sort: (props, propName, ...rest) => {
      if (!props.sort) {
        return;
      }
      const validProp = sortProp(props, propName, ...rest);
      if (validProp) {
        return validProp;
      }
      if (!props.onSorting) {
        return Error('You need to define the "onSorting" prop when "sort" is set');
      }
    },
    saveFullRecord: PropTypes.bool,
    partialErrorChecking: PropTypes.bool,
    warningsValidator: PropTypes.shape({
      isValidRecord: PropTypes.func,
      getValidationDependency: PropTypes.func
    })
  };
})();

const defaultProps = {
  page: 0,
  defaultViewCount: 0,
  partialErrorChecking: false,
  selected: []
};

class GridComponent extends React.Component {
  constructor(props) {
    super(props);
    this._statusesOnlyViaPropsEnabled = Boolean(props.statuses);
    this._validateRow = throttle(this._validateRow.bind(this));
    if (this.props.onInit) {
      this.props.onInit();
    }
  }

  state = {
    page: this.props.page,
    viewCount: this.props.defaultViewCount,
    count: 0,
    statuses: this.props.statuses || new EqualMap(),
    sort: this._getDefaultSort(),
    data: null,
    extra: new EqualMap(),
    changes: new EqualMap(),
    warnings: new EqualMap(),
    errors: new EqualMap(),
    totals: {},
    partialErrorChecking: this.props.partialErrorChecking,
    editor: {},
    colsWithEscapeErrors: {},
    selectBlackListMode: false,
    selected: [...this.props.selected],
    showLoader: false,
  };

  componentDidMount() {
    this._isMounted = true;
    if (this.props.model) {
      this.props.model.on('create', this._onRecordsCreated);
      this.props.model.on('update', this._setData);
      this.props.model.on('delete', this.updateTable);
    }
    this.updateTable();
  }

  componentWillUnmount() {
    this._isMounted = false;
    if (this.props.model) {
      this.props.model.off('create', this._onRecordsCreated);
      this.props.model.off('update', this._setData);
      this.props.model.off('delete', this.updateTable);
    }
    if (this.props.onDestroy) {
      this.props.onDestroy();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const reset = new Set();

    if (this.props.model !== nextProps.model) {
      reset.add(RESET_MODEL);
    }
    if (!isEqual(this.props.viewColumns, nextProps.viewColumns)) {
      reset.add(RESET_VIEW_COLUMNS);
    }
    if (!isEqual(this.props.sort, nextProps.sort)) {
      reset.add(RESET_SORT);
    }
    if (this.props.viewCount !== nextProps.viewCount) {
      reset.add(RESET_VIEW_COUNT);
    }
    if (
      !isEqual(this.props.selected, nextProps.selected)
      || this.props.selectBlackListMode !== nextProps.selectBlackListMode
    ) {
      reset.add(RESET_SELECTED_COLUMNS);
    }
    if (!isEqual(this.props.blackListMode, nextProps.blackListMode)) {
      reset.add(RESET_BLACK_LIST_MODE);
    }
    if (this._statusesOnlyViaPropsEnabled && this.props.statuses !== nextProps.statuses) {
      reset.add(RESET_STATUSES);
    }

    if (!reset.size) {
      return;
    }

    if (reset.has(RESET_SELECTED_COLUMNS)) {
      this.state.selected = [...nextProps.selected];
    }
    if (reset.has(RESET_VIEW_COLUMNS)) {
      this.state.viewColumns = nextProps.viewColumns;
    }
    if (reset.has(RESET_BLACK_LIST_MODE)) {
      this.state.selectBlackListMode = !this.state.selectBlackListMode;
    }
    if (reset.has(RESET_MODEL) || reset.has(RESET_SORT)) {
      this._setPage(0);
    }

    if (reset.has(RESET_MODEL)) {
      this.state.data = null;
      if (this.props.model) {
        this.props.model.off('create', this._onRecordsCreated);
        this.props.model.off('update', this._setData);
      }
      if (nextProps.model) {
        nextProps.model.on('create', this._onRecordsCreated);
        nextProps.model.on('update', this._setData);
      }
    }

    let needUpdateTable = reset.has(RESET_MODEL) || reset.has(RESET_SORT) || reset.has(RESET_VIEW_COUNT);
    let nextStatuses = this.state.statuses;
    if (reset.has(RESET_STATUSES)) {
      nextStatuses = nextProps.statuses;

      if (!needUpdateTable) {
        for (const recordId of nextStatuses.keys()) {
          if (!this.state.data.has(recordId) && !this.state.extra.has(recordId)) {
            needUpdateTable = true;
            break;
          }
        }
      }

      if (!needUpdateTable) {
        const needRemoveRecordIds = [];
        for (const oldStatusRecordId of this._getRecordsWithStatus()) {
          if (!nextStatuses.has(oldStatusRecordId) && !this.state.changes.has(oldStatusRecordId)) {
            needRemoveRecordIds.push(oldStatusRecordId);
          }
        }

        this._removeExtraRecords(needRemoveRecordIds);
      }
    }

    this.setState({statuses: nextStatuses}, () => {
      if (needUpdateTable) {
        this.updateTable().catch(err => {
          console.error(err);
        });
      }
    });
  }

  /**
   * Fetch server data
   */
  updateTable = (() => {
    const throttled = throttle(async () => {
      this.setState({showLoader: true});

      if (!this.props.model) {
        return;
      }

      const viewCount = this.getViewCount();

      let loadedData;
      try {
        loadedData = await this._loadData({
          limit: viewCount,
          offset: this.state.page * viewCount,
          sort: this._sortingToArray(),
          fields: this._getFieldsToRender(),
          extra: [...this._getAdditionalIds()]
        });
      } catch (e) {
        if (this._isMounted) {
          this.setState({showLoader: false});
        }
        if (!(e instanceof ThrottleError)) {
          throw e;
        }
        return;
      }

      if (!this._isMounted) {
        return;
      }

      if (this.getViewCount() && !loadedData.hasOwnProperty('count')) {
        throw new Error('Incorrect response from GridModel. "response.count" not defined');
      }

      // If required page is not included in the range of existing pages,
      // request existing in a moment page
      const page = this._checkPage(this.state.page, this.getViewCount(), loadedData.count);
      if (page !== this.state.page) {
        this.state.page = page;
        this.updateTable();
        return;
      }

      const data = new EqualMap(loadedData.records || []);
      const extra = new EqualMap((loadedData.extraRecords || []).filter(([recordId]) => {
        return !data.has(recordId);
      }));
      const recordIds = [...data.keys(), ...extra.keys()];
      this.setState({
        data,
        extra,
        count: loadedData.count,
        totals: loadedData.totals,
        errors: this._pick(this.state.errors, recordIds),
        changes: this._pick(this.state.changes, recordIds),
        showLoader: false
      }, () => {
        if (this.props.onPageLoad) {
          this.props.onPageLoad(loadedData);
        }
      });
    });

    return (...args) => {
      return throttled(...args)
        .catch(error => {
          if (!(error instanceof ThrottleError)) {
            throw error;
          }
        });
    };
  })();

  _onRecordsCreated = async (recordIds) => {
    if (!Array.isArray(recordIds)) {
      console.warn('Not array recordsIds in "create" event is deprecated');
      recordIds = [recordIds];
    }

    this.updateTable()
      .then(() => {
        return Promise.all(
          recordIds.map(async recordId => {
            if (!this._isRecordLoaded(recordId)) {
              return;
            }

            const rowId = this._getRowID(recordId);
            try {
              await this._checkWarnings(rowId);
            } catch (e) {
              if (!(e instanceof ThrottleError)) {
                throw e;
              }
            }
          })
        );
      })
      .catch(this.props.onError);
  };

  /**
   * Load model data
   *
   * @param {Object}      settings    Request parameters
   * @private
   */
  async _loadData(settings) {
    let data;
    try {
      data = await this.props.model.read(settings);
    } catch (err) {
      if (err && this.props.onError) {
        this.props.onError(err);
      }
      throw err;
    }

    return data;
  }

  /**
   * Find record IDs that need to be displayed additionally
   *
   * @returns {Array} Additional IDs array
   * @private
   */
  _getAdditionalIds() {
    const additionalIds = this._getRecordsWithStatus();
    for (const [recordId] of this.state.changes) {
      additionalIds.add(recordId);
    }
    return additionalIds;
  }

  /**
   * Get the names of the parameters that are required to display the grid
   *
   * @return {string[]}
   * @private
   */
  _getFieldsToRender() {
    let i;
    const cols = this.props.columns;
    let columns = [];
    for (i in cols) {
      columns = union(columns, cols[i].render.slice(0, cols[i].render.length - 1));
    }
    return columns;
  }

  /**
   * Get current records selection mode
   *
   * @returns {boolean} Records selection mode. true - Blacklist; false - Whitelist
   */
  isSelectBlackMode() {
    return this.state.selectBlackListMode;
  }

  /**
   * Unselect all records status
   * Switches records selection mode to "whitelist"
   */
  unselectAll() {
    this.setState({
      selected: [],
      selectBlackListMode: false
    }, () => {
      this._emitChangeSelectedNum();
    });
  }

  /**
   * Convert sorting to array
   *
   * @return {Object[]|Object} sorts
   * @private
   */
  _sortingToArray() {
    function toArray(sort) {
      return [sort.column, sort.direction];
    }

    const direction = this.getSortDirection();
    if (!direction) {
      return null;
    }

    if (this.props.multipleSorting) {
      if (!direction.length) {
        return null;
      }
      return direction.map(toArray);
    }

    return [toArray(direction)];
  }

  /**
   * Get record IDs that have a status
   *
   * @returns {Array}
   * @private
   */
  _getRecordsWithStatus() {
    const ids = new Set([]);
    for (const [key] of this.state.statuses) {
      ids.add(key);
    }
    return ids;
  }

  /**
   * Get record data
   *
   * @param {*} recordId Record ID
   * @returns {Object}
   */
  getRecord(recordId) {
    if (!this.state.data.has(recordId)) {
      throw new Error('Record with the ID is not contained in the table.');
    }
    return cloneDeep(this._getRecordWithChanges(recordId));
  }

  /**
   * Get record changes object
   *
   * @param   {*} recordId Record ID
   * @return  {Object}
   */
  getRecordChanges(recordId) {
    return this._getRecordChanges(recordId);
  }

  getRecordWarnings(recordId) {
    return this.state.warnings.get(recordId) || new ValidationErrors();
  }

  /**
   * Get record errors object
   *
   * @param   {*} recordId  Record ID
   * @returns  {ValidationErrors}
   * @private
   */
  getRecordErrors(recordId) {
    return this.state.errors.get(recordId) || new ValidationErrors();
  }

  /**
   * Get validation errors
   *
   * @return {Array|null}
   */
  getErrors() {
    const result = this.state.errors.entries();
    return result.length ? result : null;
  }

  /**
   * Get table model
   *
   * @returns {AbstractGridModel}
   */
  getModel() {
    return this.props.model;
  }

  _pick(map, keys, defaultValue) {
    return keys.reduce((result, key) => {
      if (map.has(key)) {
        result.set(key, map.get(key));
      } else if (defaultValue !== undefined) {
        result.set(key, defaultValue);
      }
      return result;
    }, new EqualMap());
  }

  /**
   * Get record with changes
   *
   * @param   {*} recordId  Record ID
   * @returns {Object}
   */
  _getRecordWithChanges = (recordId) => {
    if (this.state.data.has(recordId)) {
      return {...this.state.data.get(recordId), ...this.state.changes.get(recordId)};
    }
    if (this.state.extra.has(recordId)) {
      return {...this.state.extra.get(recordId), ...this.state.changes.get(recordId)};
    }
    return null;
  };

  /**
   * Pass changes to the table
   * This method marks changed fields
   *
   * @param {*}      recordId    Record ID
   * @param {Object}     data    Changed data
   * @private
   */
  _setRowChanges(recordId, data) {
    this.setState((state, props) => {
      const changes = cloneDeep(state.changes);
      changes.set(recordId, getRecordChanges(props.model, state.data.get(recordId) || state.extra.get(recordId), changes.get(recordId), data));

      if (isEmpty(changes.get(recordId))) {
        changes.delete(recordId);
      }

      return {changes};
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.changes, this.state.data);
      }
    });
  }

  /**
   * Clear record changes
   *
   * @param {*} recordId Record ID
   */
  clearRecordChanges(recordId) {
    const changes = cloneDeep(this.state.changes);
    const warnings = cloneDeep(this.state.warnings);
    const errors = cloneDeep(this.state.errors);
    changes.delete(recordId);
    warnings.delete(recordId);
    errors.delete(recordId);

    this.setState({errors, changes, warnings}, () => {
      this._removeExtraRecordIfNeed(recordId);

      if (this.props.onChange) {
        this.props.onChange(this.state.changes, this.state.data);
      }
    });
  }

  /**
   * Change table record
   * This method marks changed fields and validates them
   *
   * @param {*}         recordId      Record ID
   * @param {Object}    recordChanges Changed data
   * @param {Boolean}   validate      Is validation needed
   */
  set(recordId, recordChanges, validate = false) {
    const allChanges = cloneDeep(this.state.changes);
    const filteredRecordChanges = getRecordChanges(
      this.props.model,
      this.state.data.get(recordId) || this.state.extra.get(recordId),
      allChanges.get(recordId),
      recordChanges
    );
    allChanges.set(recordId, filteredRecordChanges);

    if (isEmpty(allChanges.get(recordId))) {
      allChanges.delete(recordId);
    }

    if (this.props.onChange) {
      this.props.onChange(this.state.changes, this.state.data);
    }

    this.setState({changes: allChanges}, () => {
      if (this.props.autoSubmit) {
        this.save();
      } else if (validate) {
        this._validateRow(recordId);
      } else if (this.props.onChange) {
        this.props.onChange(this.state.changes, this.state.data);
      }
    });
  }

  /**
   * Save grid changes
   */
  async save() {
    const errors = cloneDeep(this.state.errors);
    const changes = cloneDeep(this.state.changes);

    // Cancel new record display
    this.removeRecordStatusAll('new');

    const data = await this.props.model.update(this._dataMapToArray(changes));
    if (!this._isMounted) {
      return;
    }

    this.state.partialErrorChecking = false;

    const unhandledErrors = [];
    for (const record of data) {
      const recordId = this._getRowID(record[0]);

      // Skip records that are user changed while data processing
      if (!isEqual(changes.get(recordId), changes.get(recordId))) {
        continue;
      }

      if (record[1] instanceof Error) {
        unhandledErrors.push(record[1]);
        continue;
      }

      // Process validation errors
      if (record[1] instanceof ValidationErrors) {
        errors.set(recordId, record[1]);
        continue;
      }

      // Cancel changed data status of the parameters, that are changed
      forEach(changes.get(recordId), (value, field) => {
        if (isEqual(value, changes.get(recordId)[field])) {
          delete changes.get(recordId)[field];
        }
      });

      // Clear changed data row if it's empty
      if (isEmpty(changes.get(recordId))) {
        changes.delete(recordId);
        if (this.state.extra.has(recordId)) {
          this._removeExtraRecord(recordId);
        }
      }
    }
    this.setState({
      errors,
      changes
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(changes, this.state.data);
      }
    });

    const errorHandler = this.props.onError || ::console.error;
    unhandledErrors.forEach(error => errorHandler(error));
  }

  /**
   * Column visibility flag
   *
   * @param   {string}    id  Column ID
   * @returns {boolean}   Column visibility
   * @private
   */
  _isViewColumn(id) {
    if (!this.props.viewColumns) {
      return true;
    }

    if (Array.isArray(this.props.viewColumns)) {
      return this.props.viewColumns.indexOf(id) > -1;
    }

    return this.props.viewColumns[id];
  }

  /**
   * Does the parameters to display grid
   *
   * @param   {string}  field
   * @return  {boolean}
   * @private
   */
  _isFieldAffectsRender(field) {
    let i;
    const cols = this.props.columns;
    for (i in cols) {
      if (cols[i].render.indexOf(field) >= 0) {
        return true;
      }
    }
    return false;
  }

  /**
   * Remove record
   *
   * @param {*}  recordId  Record ID
   * @private
   */
  _removeExtraRecord(recordId) {
    return this._removeExtraRecords([recordId]);
  }

  _removeExtraRecords(recordIds) {
    if (!recordIds.length) {
      return;
    }

    const changes = cloneDeep(this.state.changes);
    const warnings = cloneDeep(this.state.warnings);
    const errors = cloneDeep(this.state.errors);
    const extra = cloneDeep(this.state.extra);
    let editor = cloneDeep(this.state.editor);
    let touchedChangesExists = false;

    for (const recordId of recordIds) {
      touchedChangesExists = touchedChangesExists || Boolean(changes.get(recordId));
      this.unselectRecord(recordId);
      extra.delete(recordId);
      changes.delete(recordId);
      warnings.delete(recordId);
      errors.delete(recordId);

      if (editor.recordId === recordId) {
        editor = {};
      }
    }

    this.setState({changes, extra, warnings, errors, editor}, () => {
      if (touchedChangesExists && this.props.onChange) {
        this.props.onChange(this.state.changes, this.state.data);
      }
    });
  }

  /**
   * Unselect record
   *
   * @param {number|string}   recordId                    Record ID
   * @param {boolean}         [ignoreBlackList=false]     Ignore BlackList mode
   */
  unselectRecord(recordId, ignoreBlackList) {
    this.setState((state) => {
      const selected = [...state.selected];

      if (state.selectBlackListMode && !ignoreBlackList) {
        this.selectRecord(recordId, true);
        return null;
      }

      const pos = indexOf(selected, recordId);
      if (pos >= 0) {
        selected.splice(pos, 1);
      }

      return {selected};
    }, () => {
      this._emitChangeSelectedNum();
    });
  }

  /**
   * Trigger selected records count change handler
   *
   * @private
   */
  _emitChangeSelectedNum() {
    if (this.props.onSelectedChange) {
      let selectedCount = this.state.selected.length;
      if (this.state.selectBlackListMode) {
        selectedCount = this.getCountRecords() - selectedCount;
      }
      this.props.onSelectedChange(this.getAllSelected(), selectedCount);
    }
  }

  /**
   * Select a record
   *
   * @param {*}    recordId       Record ID
   * @param {boolean}             [ignoreBlackList=false]     Ignore BlackList mode
   */
  selectRecord(recordId, ignoreBlackList) {
    this.setState((state) => {
      const selected = [...state.selected];

      if (state.selectBlackListMode && !ignoreBlackList) {
        this.unselectRecord(recordId, true);
        return null;
      }

      if (indexOf(selected, recordId) < 0) {
        selected.push(recordId);

        if (selected.length === state.count) {
          if (state.selectBlackListMode) {
            this.unselectAll();
          } else {
            this.selectAll();
          }

          return null;
        }
      }

      return {selected};
    }, () => {
      this._emitChangeSelectedNum();
    });
  }

  /**
   * Select all records
   * Switches records selection mode to "blacklist"
   */
  selectAll() {
    this.setState({
      selectBlackListMode: true,
      selected: []
    }, () => {
      this._emitChangeSelectedNum();
    });
  }

  getSelectAllStatus() {
    return this.props.selectAllStatus;
  }

  /**
   * Set table data
   *
   * @param {Array}  changes  Changes
   * @private
   */
  _setData = async (changes) => {
    // Apply all changes
    for (const [recordId, data] of changes) {
      // Firstly we update the state
      this._setRecordData(recordId, data);
      // Then we validate the updated data in state
      try {
        await this._checkWarnings(recordId);
      } catch (e) {
        if (!(e instanceof ThrottleError)) {
          throw e;
        }
      }
    }
  };

  /**
   * Set record data
   *
   * @param {*}       recordId  Record ID
   * @param {Object}  data      Data
   * @private
   */
  _setRecordData(recordId, data) {
    if (!this._isRecordLoaded(recordId)) {
      return;
    }

    const nextData = new EqualMap([...this.state.data].map(([dataRecordId, record]) => {
      if (!isEqual(recordId, dataRecordId)) {
        return [dataRecordId, record];
      }

      return [dataRecordId, {
        ...record,
        ...data
      }];
    }));
    this.setState({data: nextData});
  }

  /**
   * Is record loaded
   *
   * @param {*}       recordId  Record ID
   * @returns {boolean}
   * @private
   */
  _isRecordLoaded(recordId) {
    return this.state.data.has(recordId);
  }

  /**
   * Is extra record loaded
   *
   * @param {*}       recordId  Record ID
   * @returns {boolean}
   * @private
   */
  _isExtraRecordLoaded(recordId) {
    return this.state.extra.has(recordId);
  }

  /**
   * Get row ID
   *
   * @param {*}       recordId  Record ID
   * @returns {*}
   * @private
   */
  _getRowID(recordId) {
    if (!this.state.data.has(recordId) && !this.state.extra.has(recordId)) {
      throw new Error('Record with the ID is not contained in the table.');
    }

    return recordId;
  }

  /**
   * Clear all table changes
   */
  clearAllChanges() {
    const nextProps = {
      extra: new EqualMap(),
      changes: new EqualMap(),
      warnings: new EqualMap(),
      errors: new EqualMap(),
      partialErrorChecking: this.props.partialErrorChecking
    };
    if (!this._statusesOnlyViaPropsEnabled) {
      nextProps.statuses = new EqualMap();
    }

    this.setState(nextProps, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.changes, this.state.data);
      }
    });
  }

  /**
   * Reset to initial table state
   */
  reset() {
    this._setPage(0);
    if (!this._isSortingPropsMode()) {
      this._resetSorting();
    }
    this.updateTable();
  }

  /**
   * Reset to default sort parameters
   * @private
   */
  _resetSorting() {
    const sort = this._getDefaultSort();

    if (this._isSortingPropsMode()) {
      this.onSorting(sort);
      return;
    }

    this.state.sort = sort;
  }

  /**
   * Reset to default sort parameters
   */
  resetSorting() {
    if (this._isSortingPropsMode()) {
      throw new Error('You can not use function "resetSorting" when set prop "sort"');
    }

    this._resetSorting();
    this.updateTable();
  }

  /**
   * Get initial sort state
   *
   * @returns {Array} Initial sort state
   * @private
   */
  _getDefaultSort() {
    if (this.props.defaultSort) {
      return cloneDeep(this.props.defaultSort);
    }
    return null;
  }

  /**
   * Does sorting using props
   *
   * @return {boolean}
   * @private
   */
  _isSortingPropsMode() {
    return this.props.hasOwnProperty('sort');
  }

  /**
   * This method converts data object to the array with keys presented as record ID hash
   *
   * @param   {Object}  obj     Data object
   * @returns {Array}   Array result
   * @private
   */
  _dataMapToArray(map) {
    const arr = [];

    for (const [recordId, value] of map) {
      arr.push([
        recordId,
        clone(value)
      ]);
    }

    return arr;
  }

  /**
   * Table row changed flag
   *
   * @param   {string}        recordId         Row ID
   * @param   {Array|string}  [fields]
   * @return  {boolean}
   * @private
   */
  _isChanged(recordId, fields) {
    let i;
    if (!this.state.changes.has(recordId)) {
      return false;
    }

    if (fields) {
      if (!Array.isArray(fields)) {
        fields = [fields];
      }
      for (i = 0; i < fields.length; i++) {
        if (this.state.changes.get(recordId).hasOwnProperty(fields[i])) {
          return true;
        }
      }
      return false;
    }

    return true;
  }

  /**
   * Remove records status
   *
   * @deprecated
   * @param {string}      status  Status
   */
  removeRecordStatusAll(status) {
    console.warn('method removeRecordStatusAll deprecated');
    if (this._statusesOnlyViaPropsEnabled) {
      console.error('statuses are controlled through properties');
      return;
    }

    const checkDeletingRecordIds = new Set();

    this.setState((state) => {
      const statuses = cloneDeep(state.statuses);
      for (const [recordId, statusSet] of statuses) {
        if (statusSet.has(status)) {
          statusSet.delete(status);
        }

        if (!statusSet.size) {
          statuses.delete(recordId);
          checkDeletingRecordIds.add(recordId);
        }
      }

      return {
        statuses,
        selected: status === 'selected' ? [] : state.selected
      };
    }, () => {
      for (const recordId of checkDeletingRecordIds) {
        this._removeExtraRecordIfNeed(recordId);
      }
    });
  }

  /**
   * Select only these records
   *
   * @param {Array}   selectedIds       Record IDs
   * @param {boolean} [blackListMode]   Is black list mode
   */
  setSelectedRecords(selectedIds, blackListMode) {
    this.setState({selected: clone(selectedIds), selectBlackListMode: blackListMode}, () => {
      this.forceUpdate();
      this._emitChangeSelectedNum();
    });
  }

  /**
   * Set editor on grid
   */
  createEditor = (event, recordId, colId, ref) => {
    // preventing of creating editor on same cell as it is
    if (recordId === this.state.editor.recordId && colId === this.state.editor.column) {
      return;
    }

    const record = this._getRecordWithChanges(recordId);
    const columnConfig = this.props.columns[colId];
    const binds = this._getBindParam(colId);
    const value = at(record, binds);

    // Trigger click handler on the table configuration
    if (ref) {
      columnConfig.onClickRefs[ref](event, recordId, record, this);
    } else if (columnConfig.onClick) {
      columnConfig.onClick(event, recordId, record, this);
    }

    const {editor} = this.props.columns[colId];
    if (!editor) {
      return;
    }

    const editorContext = {
      updateField: (field, nextValue) => {
        this._setRowChanges(recordId, {
          [field]: nextValue
        });
      },
      set: (changes) => {
        this._setRowChanges(recordId, changes);
      }
    };
    editorContext.props = {
      onChange: (values) => {
        this._onChangeEditor(recordId, colId, values, editorContext);
      },
      onFocus: () => {
        this._onFocusEditor(recordId, colId);
      },
      onBlur: () => {
        // Remove Editor
        this._onBlurEditor(recordId);
      },
      onKeyUp: (e) => {
        if ([ENTER_KEY, ESCAPE_KEY].includes(e.keyCode)) {
          this.setState({editor: {}}, () => {
            if (e.keyCode === ESCAPE_KEY) {
              this._setRowChanges(recordId, {[colId]: value[0]});
            }
            this._onBlurEditor(recordId);
          });
        }
      },
      value: value[0]
    };

    const element = editor.call(editorContext, record, this);
    if (element) {
      this.setState({
        editor: {
          element,
          recordId,
          column: colId
        }
      });
    }
  };

  async _onBlurEditor(recordId) {
    this.setState({editor: {}});

    try {
      await this._checkWarnings(recordId);
    } catch (e) {
      if (!(e instanceof ThrottleError)) {
        throw e;
      }
    }

    if (this.props.autoSubmit) {
      await this.save();
      return;
    }

    try {
      const errors = await this._checkValidatorErrors(recordId, this.props.model, this._getRecordChanges, 'errors');
      this.setState({errors});
    } catch (e) {
      if (!(e instanceof ThrottleError)) {
        throw e;
      }
    }
  }

  /**
   * Validate row
   */
  async _validateRow(recordId) {
    const errors = await this._checkValidatorErrors(recordId, this.props.model, this._getRecordChanges, 'errors');
    this.setState({errors});
  }

  /**
   * Validate row
   */
  async _getValidationErrors(recordId) {
    return await this._checkValidatorErrors(recordId, this.props.model, this._getRecordChanges, 'errors');
  }

  /**
   * Get record changes object
   *
   * @param   {string}        recordId     Row ID
   * @return  {Object}
   */
  _getRecordChanges = (recordId) => {
    if (this.state.changes.has(recordId)) {
      return cloneDeep(this.state.changes.get(recordId));
    }
    return {};
  };

  /**
   * Check warnings
   */
  async _checkWarnings(recordId) {
    if (!this.props.warningsValidator) {
      return new EqualMap();
    }
    const warnings = await this._checkValidatorErrors(
      recordId,
      this.props.warningsValidator,
      this._getRecordWithChanges,
      'warnings'
    );

    this.setState({warnings});
  }

  /**
   * Get current page index number
   *
   * @returns {number}
   */
  getCurrentPage() {
    return this.state.page;
  }

  /**
   * Get current page count
   *
   * @returns {number}
   */
  getCountRecords() {
    return this.state.count;
  }

  /**
   * Check errors in "validator" object
   *
   * @param {string}        recordId    Row ID
   * @param {Validator}     validator   Validator object
   * @param {Function}      getData     Data provider function
   * @param {{}}            result      Validation result object
   * @private
   */
  async _checkValidatorErrors(recordId, validator, getData, resultField) {
    const record = getData(recordId);
    const validErrors = await validator.isValidRecord(record, recordId);
    const clonedResult = clone(this.state[resultField]);
    if (isEqual(record, getData(recordId))) {
      if (validErrors.isEmpty()) {
        clonedResult.delete(recordId);
      } else {
        clonedResult.set(recordId, validErrors);
      }
    }
    return clonedResult;
  }

  _onFocusEditor(recordId, column) {
    const errors = cloneDeep(this.state.errors);
    if (!this.state.errors.has(recordId)) {
      return;
    }

    let binds = this._getBindParam(column);
    if (!Array.isArray(binds)) {
      binds = [binds];
    }

    binds.forEach((field) => {
      errors.get(recordId).clearField(field);
    });
    if (errors.get(recordId).isEmpty()) {
      errors.delete(recordId);
    }
    this.setState({errors});
  }

  /**
   * Get record field title that changes column Editor
   *
   * @param       {string}        id  Column ID
   * @returns     {Array|string}     Fields that change Editor
   * @private
   */
  _getBindParam(id) {
    return this.props.columns[id].editorField || id;
  }

  _onChangeEditor(recordId, column, values, editorContext) {
    values = cloneDeep(parseValueFromEvent(values));

    const record = this._getRecordWithChanges(recordId);
    const context = cloneDeep(editorContext);
    context.props.value = values;
    const element = this.props.columns[column].editor.call(context, record, this);
    this._setRowChanges(recordId, {[column]: values});
    this.setState({
      editor: {
        element,
        recordId,
        column
      }
    });
  }

  /**
   * Move to next page event handler
   *
   */
  handleNextPage = () => {
    this.setPage(this.state.page + 1);
  };

  /**
   * Move to other page
   *
   * @param {number}  page     Page index number
   */
  setPage(page) {
    this._setPage(page);
    this.updateTable();
  }

  _setPage(page) {
    this.state.page = this._checkPage(page, this.state.viewCount, this.state.count);
  }

  _checkPage(page, view, count) {
    if (page * view >= count) {
      page = view ? Math.ceil(count / view) - 1 : 0;
    }
    return Math.max(0, page);
  }

  /**
   * Move to previous page event handler
   *
   */
  handlePrevPage = () => {
    this.setPage(this.state.page - 1);
  };

  /**
   * Change event handler of displayed rows count in a table
   *
   * @param {Event} event
   */
  handleChangeViewCount = (event) => {
    const count = this.props.viewVariants[event.target.value];
    if (this._isViewCountPropsMode()) {
      this.props.onChangeViewCount(count);
      return;
    }
    this.setViewCount(count);
  }

  /**
   * Set displayed elements count
   *
   * @param {number} viewCount
   */
  setViewCount(viewCount) {
    if (this._isViewCountPropsMode()) {
      throw new Error('You can not use function "setViewCount" when set prop "viewCount"');
    }

    this.state.viewCount = viewCount;
    this.state.page = this._checkPage(this.state.page, viewCount, this.state.count);
    this.updateTable();
  }

  /**
   * Get pages count
   *
   * @return {number}
   */
  getPagesCount() {
    const viewCount = this.getViewCount();
    return viewCount ? Math.ceil(this.state.count / viewCount) : 1;
  }

  getViewCount() {
    if (this._isViewCountPropsMode()) {
      return this.props.viewCount;
    }
    return this.state.viewCount;
  }

  _removeExtraRecordIfNeed(recordId) {
    if (this.state.extra.has(recordId) && !this.state.statuses.has(recordId) && !this.state.changes.has(recordId)) {
      this._removeExtraRecord(recordId);
    }
  }

  _isViewCountPropsMode() {
    return this.props.hasOwnProperty('viewCount');
  }

  /**
   * Use column name for table sort
   *
   * @param {string} column  Column name
   * @private
   */
  _handleColumnClick = (column) => {
    const {sortCycle} = this.props.columns[column];
    if (!sortCycle) {
      return;
    }

    let newOrder;
    let newSorts = clone(this.getSortDirection());
    const sortElement = {column: column};
    let currentSortIndex;
    let currentSort;

    if (this.props.multipleSorting) {
      // Find an element among the other sorts
      currentSortIndex = findIndex(newSorts, sort => sort.column === column);

      if (currentSortIndex >= 0) {
        currentSort = newSorts[currentSortIndex];

        // Determine the direction of sorting
        if (currentSortIndex < newSorts.length - 1) {
          newOrder = sortCycle[0];
        } else {
          // If the item is the last one, select the next direction of sorting
          newOrder = sortCycle[(sortCycle.indexOf(currentSort.direction) + 1) % sortCycle.length];
        }

        if (newOrder === 'default') {
          // Remove item from the sorts
          newSorts.splice(currentSortIndex, 1);
        } else if (currentSortIndex === newSorts.length - 1) {
          // Set new direction, if the last element
          currentSort.direction = newOrder;
        } else {
          // Move the item to the end, if it is already in sorts
          newSorts.splice(currentSortIndex, 1);
          sortElement.direction = newOrder;
          newSorts.push(sortElement);
        }
      } else {
        // Add new element
        sortElement.direction = newOrder = sortCycle[0];
        newSorts.push(sortElement);
      }
    } else {
      if (newSorts && newSorts.column === column) {
        // Select the next direction of sorting
        newOrder = sortCycle[(sortCycle.indexOf(newSorts.direction) + 1) % sortCycle.length];
      } else {
        newOrder = sortCycle[0];
      }
      if (newOrder === 'default') {
        newSorts = null;
      } else {
        sortElement.direction = newOrder;
        newSorts = sortElement;
      }
    }

    if (this.props.onSorting) {
      this.props.onSorting(newSorts, column, newOrder);
    }

    if (!this._isSortingPropsMode()) {
      this.state.sort = newSorts;
      this.setPage(0);
    }
  };

  /**
   * Add record status
   *
   * @deprecated
   * @param {*}    recordId    Record ID
   * @param {string}           status      Record status
   */
  addRecordStatus(recordId, status) {
    console.warn('method addRecordStatus deprecated');
    if (this._statusesOnlyViaPropsEnabled) {
      console.error('statuses are controlled through properties');
      return;
    }

    this.setState((state) => {
      let recordStatuses = state.statuses.get(recordId);
      const statuses = cloneDeep(state.statuses);
      // If list does not contain the record, mark its status as empty
      if (!recordStatuses) {
        recordStatuses = new Set();
      }

      recordStatuses.add(status);
      statuses.set(recordId, recordStatuses);

      return {statuses};
    }, () => {
      if (!this.state.data.has(recordId)) {
        this.updateTable();
      }
    });
  }

  /**
   * Add status to records group
   *
   * @deprecated
   * @param {Array}      recordIds   Record IDs array
   * @param {string}     status      Status
   */
  addRecordStatusGroup(recordIds, status) {
    console.warn('method addRecordStatusGroup deprecated');
    if (this._statusesOnlyViaPropsEnabled) {
      console.error('statuses are controlled through properties');
      return;
    }

    const needTableUpdate = Boolean(recordIds.length);
    this.setState((state) => {
      const statuses = cloneDeep(state.statuses);

      for (const recordId of recordIds) {
        let recordStatuses = statuses.get(recordId);

        if (!recordStatuses) {
          recordStatuses = new Set();
        }

        recordStatuses.add(status);
        statuses.set(recordId, recordStatuses);
      }

      return {statuses};
    }, () => {
      if (needTableUpdate) {
        this.updateTable();
      }
    });
  }

  /**
   * Remove record status
   *
   * @deprecated
   * @param {*}       recordId    Record ID
   * @param {string}  status      Record status
   */
  removeRecordStatus(recordId, status) {
    console.warn('method removeRecordStatus deprecated');
    if (this._statusesOnlyViaPropsEnabled) {
      console.error('statuses are controlled through properties');
      return;
    }

    let needCheckRemoveRecord;

    this.setState((state) => {
      // Cancel method execution if record has no statuses
      if (!state.statuses.has(recordId)) {
        return null;
      }

      const statuses = cloneDeep(state.statuses);
      const recordStatuses = statuses.get(recordId);

      // Remove status if record has i

      if (recordStatuses.has(status)) {
        recordStatuses.delete(status);
        if (!recordStatuses.size) {
          statuses.delete(recordId);
          needCheckRemoveRecord = true;
        }
      }

      return {statuses};
    }, () => {
      if (needCheckRemoveRecord) {
        this._removeExtraRecordIfNeed(recordId);
      }
    });
  }

  /**
   * Check record status presence
   *
   * @param   {*}       recordId    Record ID
   * @param   {number}  status      Record status
   * @returns {boolean} Record has status flag
   */
  hasRecordStatus(recordId, status) {
    if (this.state.statuses.has(recordId)) {
      return this.state.statuses.get(recordId).has(status);
    }
    return false;
  }

  /**
   * Get all record IDs that have the status
   *
   * @param {number}  status  Status
   * @returns {Array} Record IDs array
   */
  getAllWithStatus(status) {
    const records = [];

    for (const [recordId, statuses] of this.state.statuses) {
      if (statuses.has(status)) {
        records.push(recordId);
      }
    }
    return records;
  }

  /**
   * Get all selected records
   *
   * @returns {Array}   Record IDs array
   */
  getAllSelected() {
    const selected = [];
    for (const recordId of this.state.selected) {
      selected.push(recordId);
    }

    return selected;
  }

  /**
   * Get sort direction
   *
   * @return {object|object[]}
   */
  getSortDirection() {
    if (this._isSortingPropsMode()) {
      return this.props.sort;
    }
    return this.state.sort;
  }

  /**
   * Sort by column
   *
   * @param {string} column
   * @param {string} direction
   */
  sort(column, direction) {
    if (this._isSortingPropsMode()) {
      throw new Error('You can not use function "sort" when set prop "sort"');
    }

    const sort = {
      column: column,
      direction: direction
    };

    if (this.props.multipleSorting) {
      this.state.sort.push(sort);
    } else {
      this.state.sort = sort;
    }

    this.setPage(0);

    if (this.props.onSorting) {
      this.props.onSorting(this.state.sort, column, direction);
    }
  }

  /**
   * Move to first page event handler
   *
   * @param {Event} event
   */
  handleFirstPage = () => {
    this.setPage(0);
  };

  /**
   * Move to last page event handler
   *
   * @param {Event} event
   */
  handleLastPage = () => {
    this.setPage(this.getPagesCount() - 1);
  };

  /**
   * Refresh table handler
   *
   */
  handleRefreshTable = () => {
    this.updateTable();
  };

  /**
   * Returns statuses Map combined with Array of selected records
   *
   * @returns {EqualMap} statuses
   */
  _getStatuses() {
    const statuses = cloneDeep(this.state.statuses);

    if (this.state.selectBlackListMode) {
      for (const [recordId] of this.state.data) {
        if (indexOf(this.state.selected, recordId) < 0) {
          if (!statuses.has(recordId)) {
            statuses.set(recordId, new Set());
          }
          statuses.get(recordId).add('selected');
        }
      }
      return statuses;
    }

    for (const recordId of this.state.selected) {
      if (!statuses.has(recordId)) {
        statuses.set(recordId, new Set());
      }
      statuses.get(recordId).add('selected');
    }

    return statuses;
  }

  /**
   * Switch records selection mode
   */
  toggleSelectAll() {
    if (this.props.onToggleSelectAll) {
      return this.props.onToggleSelectAll();
    }
    if (this.state.selectBlackListMode) {
      this.unselectAll();
    } else {
      this.selectAll();
    }
  }

  /**
   * Is selected row flag in accordance with
   * current select mode (whitelist/blacklist).
   *
   * @param   {number|string}     recordId    Record ID
   * @returns {boolean}           Is selected row flag
   */
  isSelected(recordId) {
    const selected = indexOf(this.state.selected, recordId) >= 0;
    if (this.state.selectBlackListMode) {
      return !selected;
    }
    return selected;
  }

  /**
   * Switch "select"
   *
   * @param {*}   recordId  Record ID
   */
  toggleSelected(recordId) {
    if (this.props.onToggleSelected) {
      return this.props.onToggleSelected(recordId);
    }
    if (this.isSelected(recordId)) {
      this.unselectRecord(recordId);
    } else {
      this.selectRecord(recordId);
    }
  }

  render() {
    const gridClassNames = ['data-grid'];
    const sort = this.getSortDirection();
    const viewCount = this.getViewCount();
    const statuses = this._getStatuses();
    const {
      showLoader,
      totals,
      count,
      page,
      data,
      changes,
      errors,
      warnings,
      editor,
      extra,
    } = this.state;

    const {
      viewVariants,
      viewColumns
    } = this.props;

    if (this.props.className) {
      gridClassNames.push(this.props.className);
    }

    return (
      <PureGridComponent
        onChangeViewCount={this.handleChangeViewCount}
        onClickFirstPage={this.handleFirstPage}
        onClickPrevPage={this.handlePrevPage}
        onClickNextPage={this.handleNextPage}
        onClickLastPage={this.handleLastPage}
        onRefreshTable={this.handleRefreshTable}
        onCellClick={this.createEditor}
        onColumnClick={this._handleColumnClick}
        height={this.props.height}
        columns={this.props.columns}
        viewCount={viewCount}
        sort={sort}
        classNames={gridClassNames}
        showLoader={showLoader}
        totals={totals}
        viewVariants={viewVariants}
        count={count}
        page={page}
        viewColumns={viewColumns}
        records={data}
        extraRecords={extra}
        statuses={statuses}
        changes={changes}
        errors={errors}
        warnings={warnings}
        editor={editor}
        grid={this}
      />
    );
  }
}

GridComponent.propTypes = propTypes;
GridComponent.defaultProps = defaultProps;

export default GridComponent;
