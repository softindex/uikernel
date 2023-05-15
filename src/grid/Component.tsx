/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable react/no-unsafe */
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

import cloneDeep from 'lodash/cloneDeep';
import last from 'lodash/last';
import union from 'lodash/union';
import React from 'react';
import {assertNonNullish} from '../common/assert';
import EqualMap from '../common/EqualMap';
import ThrottleError from '../common/error/ThrottleError';
import throttle from '../common/throttle';
import {EventListener, IObservable} from '../common/types';
import {
  equalMapToArray,
  forEach,
  getRecordChanges,
  indexOf,
  isEmpty,
  isEqual,
  parseValueFromEvent,
  warn
} from '../common/utils';
import ValidationErrors from '../validation/ValidationErrors';
import Validator from '../validation/Validator';
import {GridModelListenerArgsByEventName} from './models/types/GridModelListenerArgsByEventName';
import {
  IGridModel,
  GridModelReadParams,
  GridModelReadResult,
  GridModelSortMode
} from './models/types/IGridModel';
import PureGridComponent from './PureGridComponent';
import {EditorContext, GridColumns} from './types/GridColumns';
import {GridEditor, IGridRef, SortElementProps, SortRuleType} from './types/IGridRef';
import {getNextMultipleSorting, getNextSingleSorting} from './utils';

const ERROR_MESSAGE_DATA_UNAVAILABLE = '"data" is not avaiable yet';
const ERROR_MESSAGE_MODEL_UNAVAILABLE = '"model" is not avaiable yet';

enum ResetFlag {
  Model = 'RESET_MODEL',
  Sort = 'RESET_SORT',
  ViewCount = 'RESET_VIEW_COUNT',
  SelectedColumns = 'RESET_SELECTED_COLUMNS',
  Statuses = 'RESET_STATUSES'
}

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

type Props<
  TKey,
  TRecord extends Record<string, unknown>,
  TFilters,
  TColumns extends Partial<GridColumns<TKey, TRecord>>,
  TMultipleSorting extends boolean
> = {
  autoSubmit?: boolean;
  className?: string;
  columns: TColumns;
  defaultSort?: SortRuleType<TMultipleSorting, string & keyof TColumns & keyof TRecord>;
  defaultViewCount: number;
  height?: number;
  model?: IGridModel<TKey, TRecord, TFilters> & IObservable<GridModelListenerArgsByEventName<TKey, TRecord>>;
  multipleSorting?: TMultipleSorting;
  page: number;
  pageSizeLabel: string;
  partialErrorChecking: boolean;
  selectAllStatus?: string;
  selected: TKey[];
  sort?: SortRuleType<TMultipleSorting, string & keyof TColumns & keyof TRecord>;
  statuses?: EqualMap<TKey, Set<string>>;
  viewColumns?: (string & keyof TColumns)[] | {[K in string & keyof TColumns]?: boolean};
  viewCount?: number;
  viewVariants?: number[] | null;
  warningsValidator?: Validator<TRecord>;
  onChange?: (changes: EqualMap<TKey, Partial<TRecord>>) => void;
  onChangeViewCount?: (viewCount: number) => void;
  onDestroy?: () => void;
  onError?: (error: Error) => void;
  onInit?: () => void;
  onPageLoad?: (data: GridModelReadResult<TKey, TRecord, string & keyof TRecord>) => void;
  onSelectedChange?: (selected: TKey[], selectedCount: number) => void;
  onSorting?: <TColumnId extends string & keyof TColumns & keyof TRecord>(
    newSorts: SortRuleType<TMultipleSorting, string & keyof TColumns & keyof TRecord>,
    column?: TColumnId,
    direction?: GridModelSortMode
  ) => void;
  onToggleSelectAll?: () => void;
  onToggleSelected?: (recordId: TKey) => void;
  shouldChangePage?: (page: number) => Promise<boolean>;
};

type State<
  TKey,
  TRecord extends Record<string, unknown>,
  TColumnId extends string,
  TMultipleSorting extends boolean
> = {
  changes: EqualMap<TKey, Partial<TRecord>>;
  count: number;
  data: EqualMap<TKey, TRecord> | null;
  editor: GridEditor<TKey, TColumnId>;
  errors: EqualMap<TKey, ValidationErrors<string & keyof TRecord>>;
  extra: EqualMap<TKey, TRecord>;
  page: number;
  partialErrorChecking: boolean;
  selectBlackListMode: boolean;
  selected: TKey[];
  showLoader: boolean;
  sort: SortRuleType<TMultipleSorting, TColumnId & keyof TRecord>;
  statuses: EqualMap<TKey, Set<string>>;
  totals: Partial<TRecord>;
  viewCount: number;
  warnings: EqualMap<TKey, ValidationErrors<string & keyof TRecord>>;
};

const DEFAULT_PROPS = {
  page: 0,
  defaultViewCount: 0,
  partialErrorChecking: false,
  selected: [],
  pageSizeLabel: 'Page Size'
} as const;

class GridComponent<
    TKey,
    TRecord extends Record<string, unknown>,
    TFilters,
    TColumns extends Partial<GridColumns<TKey, TRecord>>,
    TMultipleSorting extends boolean = false
  >
  extends React.Component<
    Props<TKey, TRecord, TFilters, TColumns, TMultipleSorting>,
    State<TKey, TRecord, string & keyof TColumns, TMultipleSorting>
  >
  implements IGridRef<TKey, TRecord, TFilters, TColumns, TMultipleSorting>
{
  static defaultProps = DEFAULT_PROPS;

  private statusesOnlyViaPropsEnabled: boolean;
  private mounted = false;

  private throttledUpdateTable = throttle(() => this.unsafeUpdateTable());

  constructor(props: Readonly<Props<TKey, TRecord, TFilters, TColumns, TMultipleSorting>>) {
    super(props);

    this.state = {
      page: this.props.page,
      viewCount: this.props.defaultViewCount,
      count: 0,
      statuses: this.props.statuses ?? new EqualMap(),
      sort: this.getDefaultSort(),
      data: null,
      extra: new EqualMap(),
      changes: new EqualMap(),
      warnings: new EqualMap(),
      errors: new EqualMap(),
      totals: {},
      partialErrorChecking: this.props.partialErrorChecking,
      editor: {},
      selectBlackListMode: false,
      selected: [...this.props.selected],
      showLoader: false
    };

    this.statusesOnlyViaPropsEnabled = Boolean(props.statuses);
    this.validateRow = throttle(this.validateRow.bind(this));

    if (this.props.onInit) {
      this.props.onInit();
    }
  }

  componentDidMount(): void {
    this.mounted = true;
    if (this.props.model) {
      this.props.model.on('create', this.onRecordsCreated);
      this.props.model.on('update', this.setData);
      this.props.model.on('delete', this.updateTableInBackground);
    }

    this.updateTableInBackground();
  }

  componentWillUnmount(): void {
    this.mounted = false;
    if (this.props.model) {
      this.props.model.off('create', this.onRecordsCreated);
      this.props.model.off('update', this.setData);
      this.props.model.off('delete', this.updateTableInBackground);
    }

    if (this.props.onDestroy) {
      this.props.onDestroy();
    }
  }

  UNSAFE_componentWillReceiveProps(
    nextProps: Readonly<Props<TKey, TRecord, TFilters, TColumns, TMultipleSorting>>
  ): void {
    const resetFlags = new Set<ResetFlag>();

    if (this.props.model !== nextProps.model) {
      resetFlags.add(ResetFlag.Model);
    }

    if (!isEqual(this.props.sort, nextProps.sort)) {
      resetFlags.add(ResetFlag.Sort);
    }

    if (this.props.viewCount !== nextProps.viewCount) {
      resetFlags.add(ResetFlag.ViewCount);
    }

    if (!isEqual(this.props.selected, nextProps.selected)) {
      resetFlags.add(ResetFlag.SelectedColumns);
    }

    if (this.statusesOnlyViaPropsEnabled && this.props.statuses !== nextProps.statuses) {
      resetFlags.add(ResetFlag.Statuses);
    }

    if (!resetFlags.size) {
      return;
    }

    if (resetFlags.has(ResetFlag.SelectedColumns)) {
      // @ts-expect-error: TS2540 Cannot assign to 'selected' because it is a read-only property
      this.state.selected = [...nextProps.selected];
    }

    if (resetFlags.has(ResetFlag.Model) || resetFlags.has(ResetFlag.Sort)) {
      // @ts-expect-error: TS2540 Cannot assign to 'page' because it is a read-only property
      this.state.page = this.getValidPage(0, this.state.viewCount, this.state.count);
    }

    if (resetFlags.has(ResetFlag.Model)) {
      // @ts-expect-error: TS2540 Cannot assign to 'data' because it is a read-only property
      this.state.data = null;
      if (this.props.model) {
        this.props.model.off('create', this.onRecordsCreated);
        this.props.model.off('update', this.setData);
      }

      if (nextProps.model) {
        nextProps.model.on('create', this.onRecordsCreated);
        nextProps.model.on('update', this.setData);
      }
    }

    let needUpdateTable =
      resetFlags.has(ResetFlag.Model) ||
      resetFlags.has(ResetFlag.Sort) ||
      resetFlags.has(ResetFlag.ViewCount);

    let nextStatuses = this.state.statuses;
    if (resetFlags.has(ResetFlag.Statuses)) {
      // statuses as required because RestFlag.Statuses exists only statuses passed via props
      // (statusesOnlyViaPropsEnabled = true)
      assertNonNullish(nextProps.statuses, `you can't clear "statuses" prop after it was set`);
      nextStatuses = nextProps.statuses;

      if (!needUpdateTable) {
        assertNonNullish(this.state.data, ERROR_MESSAGE_DATA_UNAVAILABLE);

        for (const recordId of nextStatuses.keys()) {
          if (!this.state.data.has(recordId) && !this.state.extra.has(recordId)) {
            needUpdateTable = true;
            break;
          }
        }

        const needRemoveRecordIds = [];
        for (const oldStatusRecordId of this.state.statuses.keys()) {
          if (!nextStatuses.has(oldStatusRecordId) && !this.state.changes.has(oldStatusRecordId)) {
            needRemoveRecordIds.push(oldStatusRecordId);
          }
        }

        this.removeExtraRecords(needRemoveRecordIds);
      }
    }

    this.setState({statuses: nextStatuses}, () => {
      if (needUpdateTable) {
        this.updateTable().catch((err) => {
          console.error(err);
        });
      }
    });
  }

  /**
   * Fetch server data
   */
  updateTable = async (): Promise<void> => {
    this.throttledUpdateTable().catch((error) => {
      if (!(error instanceof ThrottleError)) {
        throw error;
      }
    });
  };

  /**
   * Get current records selection mode
   */
  isSelectBlackMode(): boolean {
    return this.state.selectBlackListMode;
  }

  /**
   * Unselect all records status
   * Switches records selection mode to "whitelist"
   */
  unselectAll(): void {
    this.setState(
      {
        selected: [],
        selectBlackListMode: false
      },
      () => {
        this.emitChangeSelectedNum();
      }
    );
  }

  /**
   * Get record data
   */
  getRecord(recordId: TKey): Partial<TRecord> | null {
    assertNonNullish(this.state.data, ERROR_MESSAGE_DATA_UNAVAILABLE);

    if (!this.state.data.has(recordId)) {
      throw new Error('Record with the ID is not contained in the table.');
    }

    return cloneDeep(this.getRecordWithChanges(recordId));
  }

  /**
   * Get record changes object
   */
  getRecordChanges = (recordId: TKey): Partial<TRecord> => {
    const recordChanges = this.state.changes.get(recordId) ?? {};
    return cloneDeep(recordChanges);
  };

  getRecordWarnings(recordId: TKey): ValidationErrors<string & keyof TRecord> {
    return this.state.warnings.get(recordId) ?? new ValidationErrors();
  }

  /**
   * Get record errors object
   * @deprecated - was marked as private, but not used in the component
   */
  getRecordErrors(recordId: TKey): ValidationErrors<string & keyof TRecord> {
    return this.state.errors.get(recordId) ?? new ValidationErrors();
  }

  /**
   * Get validation errors
   */
  getErrors(): [TKey, ValidationErrors<string & keyof TRecord>][] | null {
    const result = [...this.state.errors.entries()];
    return result.length ? result : null;
  }

  /**
   * Get table model
   */
  getModel():
    | (IGridModel<TKey, TRecord, TFilters> & IObservable<GridModelListenerArgsByEventName<TKey, TRecord>>)
    | undefined {
    return this.props.model;
  }

  /**
   * Clear record changes
   */
  clearRecordChanges(recordId: TKey): void {
    const changes = cloneDeep(this.state.changes);
    const warnings = cloneDeep(this.state.warnings);
    const errors = cloneDeep(this.state.errors);
    changes.delete(recordId);
    warnings.delete(recordId);
    errors.delete(recordId);

    this.setState({errors, changes, warnings}, () => {
      this.removeExtraRecordIfNeed(recordId);

      if (this.props.onChange) {
        this.props.onChange(this.state.changes);
      }
    });
  }

  /**
   * Change table record
   * This method marks changed fields and validates them
   */
  set(recordId: TKey, recordChanges: Partial<TRecord>, validate = false): void {
    assertNonNullish(this.state.data, ERROR_MESSAGE_DATA_UNAVAILABLE);
    assertNonNullish(this.props.model, ERROR_MESSAGE_MODEL_UNAVAILABLE);

    const allChanges = cloneDeep(this.state.changes);
    const filteredRecordChanges = getRecordChanges(
      this.props.model.getValidationDependency.bind(this.props.model),
      this.state.data.get(recordId) ?? this.state.extra.get(recordId) ?? {},
      allChanges.get(recordId) ?? {},
      recordChanges
    );
    allChanges.set(recordId, filteredRecordChanges);

    if (isEmpty(allChanges.get(recordId))) {
      allChanges.delete(recordId);
    }

    if (this.props.onChange) {
      this.props.onChange(this.state.changes);
    }

    this.setState({changes: allChanges}, () => {
      if (this.props.autoSubmit) {
        this.save().catch(console.error);
      } else if (validate) {
        this.validateRow(recordId).catch(console.error);
      } else if (this.props.onChange) {
        this.props.onChange(this.state.changes);
      }
    });
  }

  /**
   * Save grid changes
   */
  async save(): Promise<void> {
    const errors = cloneDeep(this.state.errors);
    const prevChanges = cloneDeep(this.state.changes);

    // Cancel new record display
    this.removeRecordStatusAll('new');

    assertNonNullish(this.props.model, ERROR_MESSAGE_MODEL_UNAVAILABLE);
    const data = await this.props.model.update(equalMapToArray(prevChanges));
    if (!this.mounted) {
      return;
    }

    const nextChanges = cloneDeep(this.state.changes);
    // @ts-expect-error: TS2540 Cannot assign to 'partialErrorChecking' because it is a read-only property
    this.state.partialErrorChecking = false;

    const unhandledErrors = [];
    for (const record of data) {
      const recordId = this.getRowID(record[0]);

      // Skip records that are user changed while data processing
      if (!isEqual(prevChanges.get(recordId), nextChanges.get(recordId))) {
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

      nextChanges.delete(recordId);
      if (this.state.extra.has(recordId)) {
        this.removeExtraRecord(recordId);
      }
    }

    this.setState(
      {
        errors,
        changes: nextChanges
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(nextChanges);
        }
      }
    );

    const errorHandler = this.props.onError ?? console.error.bind(console);
    unhandledErrors.forEach((error) => errorHandler(error));
  }

  /**
   * Unselect record
   */
  unselectRecord(recordId: TKey, ignoreBlackList = false): void {
    this.setState(
      (state) => {
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
      },
      () => {
        this.emitChangeSelectedNum();
      }
    );
  }

  /**
   * Select a record
   */
  selectRecord(recordId: TKey, ignoreBlackList = false): void {
    this.setState(
      (state) => {
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
      },
      () => {
        this.emitChangeSelectedNum();
      }
    );
  }

  /**
   * Select all records
   * Switches records selection mode to "blacklist"
   */
  selectAll(): void {
    this.setState(
      {
        selectBlackListMode: true,
        selected: []
      },
      () => {
        this.emitChangeSelectedNum();
      }
    );
  }

  /**
   * @deprecated
   */
  getSelectAllStatus(): string | undefined {
    return this.props.selectAllStatus;
  }

  /**
   * Clear all table changes
   */
  clearAllChanges(): void {
    const nextState: Pick<
      State<TKey, TRecord, string & keyof TColumns, TMultipleSorting>,
      'changes' | 'errors' | 'extra' | 'partialErrorChecking' | 'warnings'
    > &
      (object | {statuses: State<TKey, TRecord, string & keyof TColumns, TMultipleSorting>['statuses']}) = {
      extra: new EqualMap(),
      changes: new EqualMap(),
      warnings: new EqualMap(),
      errors: new EqualMap(),
      partialErrorChecking: Boolean(this.props.partialErrorChecking),
      ...(!this.statusesOnlyViaPropsEnabled && {statuses: new EqualMap()})
    };

    this.setState(nextState, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.changes);
      }
    });
  }

  /**
   * Reset to initial table state
   */
  reset(): void {
    // @ts-expect-error: TS2540 Cannot assign to 'page' because it is a read-only property
    this.state.page = this.getValidPage(0, this.state.viewCount, this.state.count);
    if (!this.isSortingPropsMode()) {
      assertNonNullish(this.props.onSorting, 'prop "onSorting" is required, because "sort" exists in props');
      this.props.onSorting(this.getDefaultSort());
    }

    this.updateTableInBackground();
  }

  /**
   * Reset to default sort parameters
   */
  resetSorting(): void {
    if (this.isSortingPropsMode()) {
      throw new Error('You can not use function "resetSorting" when set prop "sort"');
    }

    // @ts-expect-error: TS2540 Cannot assign to 'sort' because it is a read-only property
    this.state.sort = this.getDefaultSort();
    this.updateTableInBackground();
  }

  /**
   * Remove records status
   * @deprecated
   */
  removeRecordStatusAll(status: string): void {
    warn('method removeRecordStatusAll deprecated');
    if (this.statusesOnlyViaPropsEnabled) {
      console.error('statuses are controlled through properties');
      return;
    }

    const checkDeletingRecordIds = new Set<TKey>();

    this.setState(
      (state) => {
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
      },
      () => {
        for (const recordId of checkDeletingRecordIds) {
          this.removeExtraRecordIfNeed(recordId);
        }
      }
    );
  }

  /**
   * Select only these records
   */
  setSelectedRecords(selectedIds: TKey[], blackListMode: boolean): void {
    this.setState({selected: [...selectedIds], selectBlackListMode: blackListMode}, () => {
      this.forceUpdate();
      this.emitChangeSelectedNum();
    });
  }

  /**
   * Set editor on grid
   */
  createEditor = (
    event: React.MouseEvent<HTMLElement>,
    recordId: TKey,
    colId: string & keyof TColumns,
    ref?: string | null
  ): void => {
    // preventing of creating editor on same cell as it is
    if (recordId === this.state.editor.recordId && colId === this.state.editor.column) {
      return;
    }

    const columnConfig = this.props.columns[colId];
    assertNonNullish<object | undefined>(columnConfig, `"${colId}" column unavailable`);
    const record = this.getRecordWithChanges(recordId);
    assertNonNullish<object | null>(record, '"record" unknown');
    const editorFieldName = this.getEditorFieldName(colId);
    const value = record[editorFieldName];

    // Trigger click handler on the table configuration
    if (ref) {
      assertNonNullish(columnConfig.onClickRefs, '"onClickRefs" unknown');
      const onClickRef = columnConfig.onClickRefs[ref];
      assertNonNullish(onClickRef, `onClickRefs.${ref} unknown`);

      onClickRef(event, recordId, record, this);
    } else if (columnConfig.onClick) {
      columnConfig.onClick(event, recordId, record, this);
    }

    const {editor} = columnConfig;
    if (!editor) {
      return;
    }

    const editorContext: EditorContext<TRecord, typeof editorFieldName> = {
      updateField: (field, nextValue) => {
        const recordChanges: Partial<TRecord> = {};
        recordChanges[field] = nextValue;
        this.setRowChanges(recordId, recordChanges);
      },
      set: (changes) => {
        this.setRowChanges(recordId, changes);
      },
      props: {
        onChange: (eventOrValue) => {
          this.onChangeEditor(recordId, colId, eventOrValue, editorContext);
        },
        onFocus: () => {
          this.onFocusEditor(recordId, colId);
        },
        onBlur: () => {
          // Remove Editor
          this.onBlurEditorInBackground(recordId);
        },
        onKeyUp: (event) => {
          if ([ENTER_KEY, ESCAPE_KEY].includes(event.keyCode)) {
            this.setState({editor: {}}, () => {
              if (event.keyCode === ESCAPE_KEY) {
                const recordChanges: Partial<TRecord> = {};
                recordChanges[editorFieldName] = value;
                this.setRowChanges(recordId, recordChanges);
              }

              this.onBlurEditorInBackground(recordId);
            });
          }
        },
        value
      }
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

  /**
   * Get current page index number
   */
  getCurrentPage(): number {
    return this.state.page;
  }

  /**
   * Get current page count
   */
  getCountRecords(): number {
    return this.state.count;
  }

  /**
   * Move to next page event handler
   *
   */
  handleNextPage = (): void => {
    this.setPage(this.state.page + 1);
  };

  /**
   * Move to other page
   */
  setPage(page: number): void {
    const newPage = this.getValidPage(page, this.state.viewCount, this.state.count);
    const updatePage = (): void => {
      // @ts-expect-error: TS2540 Cannot assign to 'page' because it is a read-only property
      this.state.page = newPage;
      this.updateTableInBackground();
    };

    if (!this.props.shouldChangePage) {
      updatePage();
      return;
    }

    this.props
      .shouldChangePage(newPage)
      .then((shouldChange) => {
        if (shouldChange) {
          updatePage();
        }
      })
      .catch(console.error);
  }

  /**
   * Move to previous page event handler
   */
  handlePrevPage = (): void => {
    this.setPage(this.state.page - 1);
  };

  /**
   * Change event handler of displayed rows count in a table
   */
  handleChangeViewCount = (viewCount: number): void => {
    if (this.isViewCountPropsMode()) {
      assertNonNullish(
        this.props.onChangeViewCount,
        'prop "onChangeViewCount" is required, because "viewCount" exists in props'
      );
      this.props.onChangeViewCount(viewCount);
      return;
    }

    this.setViewCount(viewCount);
  };

  /**
   * Set displayed elements count
   */
  setViewCount(viewCount: number): void {
    if (this.isViewCountPropsMode()) {
      throw new Error('You can not use function "setViewCount" when set prop "viewCount"');
    }

    // @ts-expect-error: TS2540 Cannot assign to 'viewCount' because it is a read-only property
    this.state.viewCount = viewCount;
    // @ts-expect-error: TS2540 Cannot assign to 'page' because it is a read-only property
    this.state.page = this.getValidPage(this.state.page, viewCount, this.state.count);
    this.updateTableInBackground();
  }

  /**
   * Get pages count
   */
  getPagesCount(): number {
    const viewCount = this.getViewCount();
    return viewCount ? Math.ceil(this.state.count / viewCount) : 1;
  }

  getViewCount(): number {
    if (this.isViewCountPropsMode()) {
      assertNonNullish(this.props.viewCount, '"viewCount" defined via props, because should be defined');
      return this.props.viewCount;
    }

    return this.state.viewCount;
  }

  /**
   * Add record status
   */
  addRecordStatus(recordId: TKey, status: string): void {
    warn('method addRecordStatus deprecated');
    if (this.statusesOnlyViaPropsEnabled) {
      console.error('statuses are controlled through properties');
      return;
    }

    this.setState(
      (state) => {
        let recordStatuses = state.statuses.get(recordId);
        const statuses = cloneDeep(state.statuses);
        // If list does not contain the record, mark its status as empty
        if (!recordStatuses) {
          recordStatuses = new Set();
        }

        recordStatuses.add(status);
        statuses.set(recordId, recordStatuses);

        return {statuses};
      },
      () => {
        if (this.state.data && !this.state.data.has(recordId)) {
          this.updateTableInBackground();
        }
      }
    );
  }

  /**
   * Add status to records group
   */
  addRecordStatusGroup(recordIds: TKey[], status: string): void {
    warn('method addRecordStatusGroup deprecated');
    if (this.statusesOnlyViaPropsEnabled) {
      console.error('statuses are controlled through properties');
      return;
    }

    const needTableUpdate = Boolean(recordIds.length);
    this.setState(
      (state) => {
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
      },
      () => {
        if (needTableUpdate) {
          this.updateTableInBackground();
        }
      }
    );
  }

  /**
   * Remove record status
   * @deprecated
   */
  removeRecordStatus(recordId: TKey, status: string): void {
    warn('method removeRecordStatus deprecated');
    if (this.statusesOnlyViaPropsEnabled) {
      console.error('statuses are controlled through properties');
      return;
    }

    let needCheckRemoveRecord: boolean;

    this.setState(
      (state) => {
        // Cancel method execution if record has no statuses
        if (!state.statuses.has(recordId)) {
          return null;
        }

        const statuses = cloneDeep(state.statuses);
        const recordStatuses = statuses.get(recordId);
        assertNonNullish(recordStatuses, '"recordStatuses" unknown');

        // Remove status if record has i

        if (recordStatuses.has(status)) {
          recordStatuses.delete(status);
          if (!recordStatuses.size) {
            statuses.delete(recordId);
            needCheckRemoveRecord = true;
          }
        }

        return {statuses};
      },
      () => {
        if (needCheckRemoveRecord) {
          this.removeExtraRecordIfNeed(recordId);
        }
      }
    );
  }

  /**
   * Check record status presence
   */
  hasRecordStatus(recordId: TKey, status: string): boolean {
    const recordStatuses = this.state.statuses.get(recordId);
    if (recordStatuses) {
      return recordStatuses.has(status);
    }

    return false;
  }

  /**
   * Get all record IDs that have the status
   */
  getAllWithStatus(status: string): TKey[] {
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
   */
  getAllSelected(): TKey[] {
    const selected = [];
    for (const recordId of this.state.selected) {
      selected.push(recordId);
    }

    return selected;
  }

  /**
   * Get sort direction
   */
  getSortDirection(): SortRuleType<TMultipleSorting, string & keyof TColumns & keyof TRecord> | undefined {
    return this.isSortingPropsMode() ? this.props.sort : this.state.sort;
  }

  /**
   * Sort by column
   */
  sort(column: string & keyof TColumns & keyof TRecord, direction: GridModelSortMode): void {
    if (this.isSortingPropsMode()) {
      throw new Error('You can not use function "sort" when set prop "sort"');
    }

    const sort: SortElementProps<string & keyof TColumns & keyof TRecord> = {
      column,
      direction
    };

    if (this.props.multipleSorting) {
      (this.state.sort as SortElementProps<string & keyof TColumns & keyof TRecord>[]).push(sort);
    } else {
      // @ts-expect-error: TS2540 Cannot assign to 'sort' because it is a read-only property
      this.state.sort = sort;
    }

    this.setPage(0);

    if (this.props.onSorting) {
      this.props.onSorting(this.state.sort, column, direction);
    }
  }

  /**
   * Move to first page event handler
   */
  handleFirstPage = (): void => {
    this.setPage(0);
  };

  /**
   * Move to last page event handler
   */
  handleLastPage = (): void => {
    this.setPage(this.getPagesCount() - 1);
  };

  /**
   * Refresh table handler
   */
  handleRefreshTable = (): void => {
    this.updateTableInBackground();
  };

  /**
   * Switch records selection mode
   */
  toggleSelectAll(): void {
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
   */
  isSelected(recordId: TKey): boolean {
    const selected = this.state.selected.findIndex((key) => isEqual(key, recordId)) >= 0;
    if (this.state.selectBlackListMode) {
      return !selected;
    }

    return selected;
  }

  /**
   * Switch "select"
   */
  toggleSelected(recordId: TKey): void {
    if (this.props.onToggleSelected) {
      return this.props.onToggleSelected(recordId);
    }

    if (this.isSelected(recordId)) {
      this.unselectRecord(recordId);
    } else {
      this.selectRecord(recordId);
    }
  }

  render(): JSX.Element {
    const gridClassNames = ['data-grid'];
    const sort = this.getSortDirection();
    const viewCount = this.getViewCount();
    const statuses = this.getStatuses();
    const {showLoader, totals, count, page, data, changes, errors, warnings, editor, extra} = this.state;

    const {viewVariants, viewColumns, className, height, columns, pageSizeLabel} = this.props;

    if (className) {
      gridClassNames.push(className);
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
        onColumnClick={this.handleColumnClick}
        height={height}
        columns={columns}
        pageSizeLabel={pageSizeLabel}
        viewCount={viewCount}
        sort={sort}
        classNames={gridClassNames}
        showLoader={showLoader}
        totals={totals}
        viewVariants={viewVariants === null ? [] : viewVariants}
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
        gridRef={this}
      />
    );
  }

  private async unsafeUpdateTable(): Promise<void> {
    this.setState({showLoader: true});

    if (!this.props.model) {
      return;
    }

    const viewCount = this.getViewCount();

    let loadedData: GridModelReadResult<TKey, TRecord, keyof TRecord & string>;
    try {
      loadedData = await this.loadData({
        limit: viewCount,
        offset: this.state.page * viewCount,
        sort: this.sortingToArray() ?? undefined,
        fields: this.getFieldsToRender(),
        extra: [...this.getAdditionalIds()]
      });
    } catch (error) {
      if (this.mounted) {
        this.setState({showLoader: false});
      }

      if (!(error instanceof ThrottleError)) {
        throw error;
      }

      return;
    }

    if (!this.mounted) {
      return;
    }

    const currentViewCount = this.getViewCount();
    if (loadedData.count === undefined) {
      throw new Error('Incorrect response from GridModel. "response.count" not defined');
    }

    // If required page is not included in the range of existing pages,
    // request existing in a moment page
    const page = this.getValidPage(this.state.page, currentViewCount, loadedData.count);
    if (page !== this.state.page) {
      // @ts-expect-error: TS2540 Cannot assign to 'page' because it is a read-only property
      this.state.page = page;
      this.updateTableInBackground();
      return;
    }

    const data = new EqualMap(loadedData.records) as EqualMap<TKey, TRecord>;
    const extra = new EqualMap(
      (loadedData.extraRecords ?? []).filter(([recordId]) => {
        return !data.has(recordId);
      })
    ) as EqualMap<TKey, TRecord>;
    const recordIds = [...data.keys(), ...extra.keys()];
    this.setState(
      {
        data,
        extra,
        count: loadedData.count,
        totals: (loadedData.totals as Partial<TRecord>) ?? {},
        errors: this.equalPick(this.state.errors, recordIds),
        changes: this.equalPick(this.state.changes, recordIds),
        showLoader: false
      },
      () => {
        if (this.props.onPageLoad) {
          this.props.onPageLoad(loadedData);
        }

        if (this.props.onChange) {
          this.props.onChange(this.state.changes);
        }
      }
    );
  }

  private updateTableInBackground = (): void => {
    this.updateTable().catch(console.error);
  };

  private onRecordsCreated = (recordIdOrIds: TKey | TKey[]): void => {
    let recordIds: TKey[];
    if (!Array.isArray(recordIdOrIds)) {
      warn('Not array recordsIds in "create" event is deprecated');
      recordIds = [recordIdOrIds];
    } else {
      recordIds = recordIdOrIds;
    }

    this.updateTable()
      .then(() => {
        return Promise.all(
          recordIds.map(async (recordId) => {
            if (!this.isRecordLoaded(recordId)) {
              return;
            }

            try {
              await this.checkWarnings(recordId);
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
   */
  private async loadData<TField extends string & keyof TRecord>(
    settings: GridModelReadParams<TKey, TRecord, TField, TFilters>
  ): Promise<GridModelReadResult<TKey, TRecord, TField>> {
    if (!this.props.model) {
      throw new TypeError('"model" in props is required');
    }

    let data: GridModelReadResult<TKey, TRecord, TField>;
    try {
      data = await this.props.model.read(settings);
    } catch (error: unknown) {
      if (error && this.props.onError) {
        this.props.onError(error as Error);
      }

      throw error;
    }

    return data;
  }

  /**
   * Find record IDs that need to be displayed additionally
   */
  private getAdditionalIds(): Set<TKey> {
    const additionalIds = new Set(this.state.statuses.keys());
    for (const [recordId] of this.state.changes) {
      additionalIds.add(recordId);
    }

    return additionalIds;
  }

  /**
   * Get the names of the parameters that are required to display the grid
   */
  private getFieldsToRender(): (string & keyof TRecord)[] {
    const cols = this.props.columns;
    let columnIds: (string & keyof TRecord)[] = [];
    forEach(cols, (column) => {
      if (column) {
        columnIds = union(
          columnIds,
          column.render.slice(0, column.render.length - 1) as (string & keyof TRecord)[]
        );
      }
    });

    return columnIds;
  }

  /**
   * Convert sorting to array
   */
  private sortingToArray(): [string & keyof TColumns & keyof TRecord, GridModelSortMode][] | null {
    function toArray<TColumnId extends string & keyof TColumns & keyof TRecord>(
      sort: SortElementProps<TColumnId>
    ): [TColumnId, GridModelSortMode] {
      return [sort.column, sort.direction];
    }

    const direction = this.getSortDirection();
    if (!direction) {
      return null;
    }

    if (this.props.multipleSorting) {
      const multipleDirection = direction as SortElementProps<string & keyof TColumns & keyof TRecord>[];
      if (!multipleDirection.length) {
        return null;
      }

      return multipleDirection.map(toArray);
    }

    return [toArray(direction as SortElementProps<string & keyof TColumns & keyof TRecord>)];
  }

  private equalPick<TValue>(map: EqualMap<TKey, TValue>, keys: TKey[]): EqualMap<TKey, TValue> {
    return keys.reduce((result, key) => {
      if (map.has(key)) {
        result.set(key, map.get(key) as TValue);
      }

      return result;
    }, new EqualMap<TKey, TValue>());
  }

  /**
   * Get record with changes
   */
  private getRecordWithChanges = (recordId: TKey): TRecord | null => {
    assertNonNullish(this.state.data, ERROR_MESSAGE_DATA_UNAVAILABLE);

    const recordFromData = this.state.data.get(recordId);
    if (recordFromData) {
      return {...recordFromData, ...this.state.changes.get(recordId)};
    }

    const recordFromExtra = this.state.extra.get(recordId);
    if (recordFromExtra) {
      return {...recordFromExtra, ...this.state.changes.get(recordId)};
    }

    return null;
  };

  /**
   * Pass changes to the table
   * This method marks changed fields
   */
  private setRowChanges(recordId: TKey, data: Partial<TRecord>): void {
    this.setState(
      (state, props) => {
        assertNonNullish(state.data, ERROR_MESSAGE_DATA_UNAVAILABLE);
        assertNonNullish(props.model, ERROR_MESSAGE_MODEL_UNAVAILABLE);

        const changes = cloneDeep(state.changes);
        changes.set(
          recordId,
          getRecordChanges(
            props.model.getValidationDependency.bind(props.model),
            state.data.get(recordId) ?? state.extra.get(recordId) ?? {},
            changes.get(recordId) ?? {},
            data
          )
        );

        if (isEmpty(changes.get(recordId))) {
          changes.delete(recordId);
        }

        return {changes};
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.changes);
        }
      }
    );
  }

  /**
   * Remove record
   */
  private removeExtraRecord(recordId: TKey): void {
    return this.removeExtraRecords([recordId]);
  }

  private removeExtraRecords(recordIds: TKey[]): void {
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

      if (isEqual(editor.recordId, recordId)) {
        editor = {};
      }
    }

    this.setState({changes, extra, warnings, errors, editor}, () => {
      if (touchedChangesExists && this.props.onChange) {
        this.props.onChange(this.state.changes);
      }
    });
  }

  /**
   * Trigger selected records count change handler
   */
  private emitChangeSelectedNum(): void {
    if (!this.props.onSelectedChange) {
      return;
    }

    let selectedCount = this.state.selected.length;
    if (this.state.selectBlackListMode) {
      selectedCount = this.getCountRecords() - selectedCount;
    }

    this.props.onSelectedChange(this.getAllSelected(), selectedCount);
  }

  /**
   * Set table data
   */
  private setData: EventListener<GridModelListenerArgsByEventName<TKey, TRecord>['update']> = async (
    changes
  ) => {
    // Apply all changes
    for (const [recordId, data] of changes) {
      if (!this.isRecordLoaded(recordId)) {
        continue;
      }

      // Firstly we update the state
      this.setRecordData(recordId, data);

      // Then we validate the updated data in state
      try {
        await this.checkWarnings(recordId);
      } catch (error) {
        if (!(error instanceof ThrottleError)) {
          throw error;
        }
      }
    }
  };

  /**
   * Set record data
   */
  private setRecordData(recordId: TKey, data: Partial<TRecord>): void {
    if (!this.isRecordLoaded(recordId)) {
      return;
    }

    this.setState((state) => {
      assertNonNullish(state.data, ERROR_MESSAGE_DATA_UNAVAILABLE);

      return {
        ...state,
        data: new EqualMap(
          [...state.data].map(([dataRecordId, record]) => {
            if (!isEqual(recordId, dataRecordId)) {
              return [dataRecordId, record];
            }

            return [
              dataRecordId,
              {
                ...record,
                ...data
              }
            ];
          })
        )
      };
    });
  }

  /**
   * Is record loaded
   */
  private isRecordLoaded(recordId: TKey): boolean {
    if (!this.state.data) {
      return false;
    }

    return this.state.data.has(recordId);
  }

  /**
   * Get row ID
   */
  private getRowID(recordId: TKey): TKey {
    assertNonNullish(this.state.data, ERROR_MESSAGE_DATA_UNAVAILABLE);

    if (!this.state.data.has(recordId) && !this.state.extra.has(recordId)) {
      throw new Error('Record with the ID is not contained in the table.');
    }

    return recordId;
  }

  /**
   * Get initial sort state
   */
  private getDefaultSort(): SortRuleType<TMultipleSorting, string & keyof TColumns & keyof TRecord> {
    if (this.props.defaultSort) {
      return cloneDeep(this.props.defaultSort);
    }

    return null;
  }

  /**
   * Does sorting using props
   */
  private isSortingPropsMode(): boolean {
    return this.props.hasOwnProperty('sort');
  }

  private async onBlurEditor(recordId: TKey): Promise<void> {
    this.setState({editor: {}});

    await this.checkWarnings(recordId);

    if (this.props.autoSubmit) {
      await this.save();
      return;
    }

    assertNonNullish(this.props.model, ERROR_MESSAGE_MODEL_UNAVAILABLE);

    try {
      const errors = await this.checkValidatorErrors(
        recordId,
        this.props.model.isValidRecord.bind(this.props.model),
        this.getRecordChanges,
        'errors'
      );
      this.setState({errors});
    } catch (e) {
      if (!(e instanceof ThrottleError)) {
        throw e;
      }
    }
  }

  private onBlurEditorInBackground(recordId: TKey): void {
    this.onBlurEditor(recordId).catch(console.error);
  }

  /**
   * Validate row
   */
  private async validateRow(recordId: TKey): Promise<void> {
    assertNonNullish(this.props.model, ERROR_MESSAGE_MODEL_UNAVAILABLE);

    const errors = await this.checkValidatorErrors(
      recordId,
      this.props.model.isValidRecord.bind(this.props.model),
      this.getRecordChanges,
      'errors'
    );
    this.setState({errors});
  }

  /**
   * Check warnings
   */
  private async checkWarnings(recordId: TKey): Promise<void> {
    const {warningsValidator} = this.props;
    if (!warningsValidator) {
      return;
    }

    const warnings = await this.checkValidatorErrors(
      recordId,
      (record) => warningsValidator.isValidRecord(record),
      (recordId) => {
        return this.getRecordWithChanges(recordId) ?? {};
      },
      'warnings'
    );

    this.setState({warnings});
  }

  /**
   * Check errors in "validator" object
   */
  private async checkValidatorErrors<TStateValidationField extends 'errors' | 'warnings'>(
    recordId: TKey,
    validate: (
      record: Partial<TRecord>,
      recordId?: TKey
    ) => Promise<ValidationErrors<string & keyof TRecord>>,
    getData: (recordId: TKey) => Partial<TRecord>,
    resultField: TStateValidationField
  ): Promise<EqualMap<TKey, ValidationErrors<string & keyof TRecord>>> {
    const record = getData(recordId);
    const validErrors = await validate(record);
    const clonedResult = new EqualMap(this.state[resultField]);
    if (isEqual(record, getData(recordId))) {
      if (validErrors.isEmpty()) {
        clonedResult.delete(recordId);
      } else {
        clonedResult.set(recordId, validErrors);
      }
    }

    return clonedResult;
  }

  private onFocusEditor(recordId: TKey, columnId: string & keyof TColumns): void {
    const errors = cloneDeep(this.state.errors);
    const columnErrors = errors.get(recordId);
    if (!columnErrors) {
      return;
    }

    const editorFieldName = this.getEditorFieldName(columnId);
    columnErrors.clearField(editorFieldName);

    if (columnErrors.isEmpty()) {
      errors.delete(recordId);
    }

    this.setState({errors});
  }

  private onChangeEditor<TField extends string & keyof TRecord>(
    recordId: TKey,
    columnId: string & keyof TColumns,
    eventOrValue:
      | React.SyntheticEvent<
          Element & {
            target: {
              value: TRecord[TField];
            };
          }
        >
      | TRecord[TField],
    editorContext: EditorContext<TRecord, TField>
  ): void {
    const value = cloneDeep(parseValueFromEvent(eventOrValue)) as TRecord[TField];

    const columnConfig = this.props.columns[columnId];
    assertNonNullish<object | undefined>(columnConfig, `"${columnId}" column unavailable`);
    const record = this.getRecordWithChanges(recordId);
    assertNonNullish<object | null>(record, '"record" unknown');
    assertNonNullish(columnConfig.editor, '"columnConfig.editor" unknown');

    const context = cloneDeep(editorContext) as unknown as EditorContext<TRecord, keyof TRecord & string>;
    context.props.value = value;
    const element = columnConfig.editor.call(context, record, this);
    assertNonNullish(element, 'received unknown element on change editor');
    const recordChanges: Partial<TRecord> = {};
    recordChanges[this.getEditorFieldName(columnId)] = value;
    this.setRowChanges(recordId, recordChanges);
    this.setState({
      editor: {
        element,
        recordId,
        column: columnId
      }
    });
  }

  private getValidPage(page: number, view: number, count: number): number {
    let validPage = page;
    if (validPage * view >= count) {
      validPage = view ? Math.ceil(count / view) - 1 : 0;
    }

    return Math.max(0, validPage);
  }

  private removeExtraRecordIfNeed(recordId: TKey): void {
    if (
      this.state.extra.has(recordId) &&
      !this.state.statuses.has(recordId) &&
      !this.state.changes.has(recordId)
    ) {
      this.removeExtraRecord(recordId);
    }
  }

  private isViewCountPropsMode(): boolean {
    return this.props.hasOwnProperty('viewCount');
  }

  /**
   * Use column name for table sort
   */
  private handleColumnClick = (columnId: string & keyof TColumns): void => {
    const {sortCycle} = this.props.columns[columnId] ?? {};
    if (!sortCycle) {
      return;
    }

    const sortableColumn = columnId as string & keyof TColumns & keyof TRecord;

    let nextSorting: SortRuleType<TMultipleSorting, string & keyof TColumns & keyof TRecord>;
    let nextDirectionForColumn: GridModelSortMode;

    if (this.props.multipleSorting) {
      const nextMultipleSorting = getNextMultipleSorting(
        sortableColumn,
        this.getSortDirection() as SortElementProps<string & keyof TColumns & keyof TRecord>[],
        sortCycle
      );

      const nextMultipleSortingLatestItem = last(nextMultipleSorting);
      assertNonNullish(nextMultipleSortingLatestItem);

      nextDirectionForColumn =
        nextMultipleSortingLatestItem.column === columnId
          ? nextMultipleSortingLatestItem.direction
          : 'default';

      nextSorting = nextMultipleSorting as SortRuleType<
        TMultipleSorting,
        string & keyof TColumns & keyof TRecord
      >;
    } else {
      const nextSingleSorting = getNextSingleSorting(
        sortableColumn,
        this.getSortDirection() as SortElementProps<string & keyof TColumns & keyof TRecord> | null,
        sortCycle
      );

      nextDirectionForColumn = nextSingleSorting.direction;

      if (nextSingleSorting.direction === 'default') {
        nextSorting = null;
      } else {
        nextSorting = nextSingleSorting as SortRuleType<
          TMultipleSorting,
          string & keyof TColumns & keyof TRecord
        >;
      }
    }

    this.props.onSorting?.(nextSorting, sortableColumn, nextDirectionForColumn);

    if (!this.isSortingPropsMode()) {
      // @ts-expect-error: TS2540 Cannot assign to 'sort' because it is a read-only property
      this.state.sort = nextSorting;
      this.setPage(0);
    }
  };

  /**
   * Returns statuses Map combined with Array of selected records
   */
  private getStatuses(): EqualMap<TKey, Set<string>> {
    const statuses = cloneDeep(this.state.statuses);

    if (this.state.selectBlackListMode) {
      assertNonNullish(this.state.data, ERROR_MESSAGE_DATA_UNAVAILABLE);

      for (const [recordId] of this.state.data) {
        if (indexOf(this.state.selected, recordId) < 0) {
          const recordStatuses = statuses.get(recordId) ?? new Set();
          recordStatuses.add('selected');

          statuses.set(recordId, recordStatuses);
        }
      }

      return statuses;
    }

    for (const recordId of this.state.selected) {
      const recordStatuses = statuses.get(recordId) ?? new Set();
      recordStatuses.add('selected');

      statuses.set(recordId, recordStatuses);
    }

    return statuses;
  }

  private getEditorFieldName(columnId: string & keyof TColumns): string & keyof TRecord {
    return this.props.columns[columnId]?.editorField ?? (columnId as string & keyof TRecord);
  }
}

export default GridComponent;
