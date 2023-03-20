"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const last_1 = __importDefault(require("lodash/last"));
const union_1 = __importDefault(require("lodash/union"));
const react_1 = __importDefault(require("react"));
const assert_1 = require("../common/assert");
const EqualMap_1 = __importDefault(require("../common/EqualMap"));
const ThrottleError_1 = __importDefault(require("../common/error/ThrottleError"));
const throttle_1 = __importDefault(require("../common/throttle"));
const utils_1 = require("../common/utils");
const ValidationErrors_1 = __importDefault(require("../validation/ValidationErrors"));
const PureGridComponent_1 = __importDefault(require("./PureGridComponent"));
const utils_2 = require("./utils");
const ERROR_MESSAGE_DATA_UNAVAILABLE = '"data" is not avaiable yet';
const ERROR_MESSAGE_MODEL_UNAVAILABLE = '"model" is not avaiable yet';
var ResetFlag;
(function (ResetFlag) {
    ResetFlag["Model"] = "RESET_MODEL";
    ResetFlag["Sort"] = "RESET_SORT";
    ResetFlag["ViewCount"] = "RESET_VIEW_COUNT";
    ResetFlag["SelectedColumns"] = "RESET_SELECTED_COLUMNS";
    ResetFlag["Statuses"] = "RESET_STATUSES";
})(ResetFlag || (ResetFlag = {}));
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;
const DEFAULT_PROPS = {
    page: 0,
    defaultViewCount: 0,
    partialErrorChecking: false,
    selected: [],
    pageSizeLabel: 'Page Size'
};
class GridComponent extends react_1.default.Component {
    constructor(props) {
        var _a;
        super(props);
        this.mounted = false;
        this.throttledUpdateTable = (0, throttle_1.default)(() => this.unsafeUpdateTable());
        this.updateTable = async () => {
            this.throttledUpdateTable().catch((error) => {
                if (!(error instanceof ThrottleError_1.default)) {
                    throw error;
                }
            });
        };
        this.getRecordChanges = (recordId) => {
            var _a;
            const recordChanges = (_a = this.state.changes.get(recordId)) !== null && _a !== void 0 ? _a : {};
            return (0, cloneDeep_1.default)(recordChanges);
        };
        this.createEditor = (event, recordId, colId, ref) => {
            if (recordId === this.state.editor.recordId && colId === this.state.editor.column) {
                return;
            }
            const columnConfig = this.props.columns[colId];
            (0, assert_1.assertNonNullish)(columnConfig, `"${colId}" column unavailable`);
            const record = this.getRecordWithChanges(recordId);
            (0, assert_1.assertNonNullish)(record, '"record" unknown');
            const editorFieldName = this.getEditorFieldName(colId);
            const value = record[editorFieldName];
            if (ref) {
                (0, assert_1.assertNonNullish)(columnConfig.onClickRefs, '"onClickRefs" unknown');
                const onClickRef = columnConfig.onClickRefs[ref];
                (0, assert_1.assertNonNullish)(onClickRef, `onClickRefs.${ref} unknown`);
                onClickRef(event, recordId, record, this);
            }
            else if (columnConfig.onClick) {
                columnConfig.onClick(event, recordId, record, this);
            }
            const { editor } = columnConfig;
            if (!editor) {
                return;
            }
            const editorContext = {
                updateField: (field, nextValue) => {
                    const recordChanges = {};
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
                        this.onBlurEditorInBackground(recordId);
                    },
                    onKeyUp: (event) => {
                        if ([ENTER_KEY, ESCAPE_KEY].includes(event.keyCode)) {
                            this.setState({ editor: {} }, () => {
                                if (event.keyCode === ESCAPE_KEY) {
                                    const recordChanges = {};
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
        this.handleNextPage = () => {
            this.setPage(this.state.page + 1);
        };
        this.handlePrevPage = () => {
            this.setPage(this.state.page - 1);
        };
        this.handleChangeViewCount = (viewCount) => {
            if (this.isViewCountPropsMode()) {
                (0, assert_1.assertNonNullish)(this.props.onChangeViewCount, 'prop "onChangeViewCount" is required, because "viewCount" exists in props');
                this.props.onChangeViewCount(viewCount);
                return;
            }
            this.setViewCount(viewCount);
        };
        this.handleFirstPage = () => {
            this.setPage(0);
        };
        this.handleLastPage = () => {
            this.setPage(this.getPagesCount() - 1);
        };
        this.handleRefreshTable = () => {
            this.updateTableInBackground();
        };
        this.updateTableInBackground = () => {
            this.updateTable().catch(console.error);
        };
        this.onRecordsCreated = (recordIdOrIds) => {
            let recordIds;
            if (!Array.isArray(recordIdOrIds)) {
                (0, utils_1.warn)('Not array recordsIds in "create" event is deprecated');
                recordIds = [recordIdOrIds];
            }
            else {
                recordIds = recordIdOrIds;
            }
            this.updateTable()
                .then(() => {
                return Promise.all(recordIds.map(async (recordId) => {
                    if (!this.isRecordLoaded(recordId)) {
                        return;
                    }
                    try {
                        await this.checkWarnings(recordId);
                    }
                    catch (e) {
                        if (!(e instanceof ThrottleError_1.default)) {
                            throw e;
                        }
                    }
                }));
            })
                .catch(this.props.onError);
        };
        this.getRecordWithChanges = (recordId) => {
            (0, assert_1.assertNonNullish)(this.state.data, ERROR_MESSAGE_DATA_UNAVAILABLE);
            const recordFromData = this.state.data.get(recordId);
            if (recordFromData) {
                return { ...recordFromData, ...this.state.changes.get(recordId) };
            }
            const recordFromExtra = this.state.extra.get(recordId);
            if (recordFromExtra) {
                return { ...recordFromExtra, ...this.state.changes.get(recordId) };
            }
            return null;
        };
        this.setData = async (changes) => {
            for (const [recordId, data] of changes) {
                if (!this.isRecordLoaded(recordId)) {
                    continue;
                }
                this.setRecordData(recordId, data);
                try {
                    await this.checkWarnings(recordId);
                }
                catch (error) {
                    if (!(error instanceof ThrottleError_1.default)) {
                        throw error;
                    }
                }
            }
        };
        this.handleColumnClick = (columnId) => {
            var _a, _b, _c;
            const { sortCycle } = (_a = this.props.columns[columnId]) !== null && _a !== void 0 ? _a : {};
            if (!sortCycle) {
                return;
            }
            const sortableColumn = columnId;
            let nextSorting;
            let nextDirectionForColumn;
            if (this.props.multipleSorting) {
                const nextMultipleSorting = (0, utils_2.getNextMultipleSorting)(sortableColumn, this.getSortDirection(), sortCycle);
                const nextMultipleSortingLatestItem = (0, last_1.default)(nextMultipleSorting);
                (0, assert_1.assertNonNullish)(nextMultipleSortingLatestItem);
                nextDirectionForColumn =
                    nextMultipleSortingLatestItem.column === columnId
                        ? nextMultipleSortingLatestItem.direction
                        : 'default';
                nextSorting = nextMultipleSorting;
            }
            else {
                const nextSingleSorting = (0, utils_2.getNextSingleSorting)(sortableColumn, this.getSortDirection(), sortCycle);
                nextDirectionForColumn = nextSingleSorting.direction;
                if (nextSingleSorting.direction === 'default') {
                    nextSorting = null;
                }
                else {
                    nextSorting = nextSingleSorting;
                }
            }
            (_c = (_b = this.props).onSorting) === null || _c === void 0 ? void 0 : _c.call(_b, nextSorting, sortableColumn, nextDirectionForColumn);
            if (!this.isSortingPropsMode()) {
                this.state.sort = nextSorting;
                this.setPage(0);
            }
        };
        this.state = {
            page: this.props.page,
            viewCount: this.props.defaultViewCount,
            count: 0,
            statuses: (_a = this.props.statuses) !== null && _a !== void 0 ? _a : new EqualMap_1.default(),
            sort: this.getDefaultSort(),
            data: null,
            extra: new EqualMap_1.default(),
            changes: new EqualMap_1.default(),
            warnings: new EqualMap_1.default(),
            errors: new EqualMap_1.default(),
            totals: {},
            partialErrorChecking: this.props.partialErrorChecking,
            editor: {},
            selectBlackListMode: false,
            selected: [...this.props.selected],
            showLoader: false
        };
        this.statusesOnlyViaPropsEnabled = Boolean(props.statuses);
        this.validateRow = (0, throttle_1.default)(this.validateRow.bind(this));
        if (this.props.onInit) {
            this.props.onInit();
        }
    }
    componentDidMount() {
        this.mounted = true;
        if (this.props.model) {
            this.props.model.on('create', this.onRecordsCreated);
            this.props.model.on('update', this.setData);
            this.props.model.on('delete', this.updateTableInBackground);
        }
        this.updateTableInBackground();
    }
    componentWillUnmount() {
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
    UNSAFE_componentWillReceiveProps(nextProps) {
        const resetFlags = new Set();
        if (this.props.model !== nextProps.model) {
            resetFlags.add(ResetFlag.Model);
        }
        if (!(0, utils_1.isEqual)(this.props.sort, nextProps.sort)) {
            resetFlags.add(ResetFlag.Sort);
        }
        if (this.props.viewCount !== nextProps.viewCount) {
            resetFlags.add(ResetFlag.ViewCount);
        }
        if (!(0, utils_1.isEqual)(this.props.selected, nextProps.selected)) {
            resetFlags.add(ResetFlag.SelectedColumns);
        }
        if (this.statusesOnlyViaPropsEnabled && this.props.statuses !== nextProps.statuses) {
            resetFlags.add(ResetFlag.Statuses);
        }
        if (!resetFlags.size) {
            return;
        }
        if (resetFlags.has(ResetFlag.SelectedColumns)) {
            this.state.selected = [...nextProps.selected];
        }
        if (resetFlags.has(ResetFlag.Model) || resetFlags.has(ResetFlag.Sort)) {
            this.state.page = this.getValidPage(0, this.state.viewCount, this.state.count);
        }
        if (resetFlags.has(ResetFlag.Model)) {
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
        let needUpdateTable = resetFlags.has(ResetFlag.Model) ||
            resetFlags.has(ResetFlag.Sort) ||
            resetFlags.has(ResetFlag.ViewCount);
        let nextStatuses = this.state.statuses;
        if (resetFlags.has(ResetFlag.Statuses)) {
            (0, assert_1.assertNonNullish)(nextProps.statuses, `you can't clear "statuses" prop after it was set`);
            nextStatuses = nextProps.statuses;
            if (!needUpdateTable) {
                (0, assert_1.assertNonNullish)(this.state.data, ERROR_MESSAGE_DATA_UNAVAILABLE);
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
        this.setState({ statuses: nextStatuses }, () => {
            if (needUpdateTable) {
                this.updateTable().catch((err) => {
                    console.error(err);
                });
            }
        });
    }
    isSelectBlackMode() {
        return this.state.selectBlackListMode;
    }
    unselectAll() {
        this.setState({
            selected: [],
            selectBlackListMode: false
        }, () => {
            this.emitChangeSelectedNum();
        });
    }
    getRecord(recordId) {
        (0, assert_1.assertNonNullish)(this.state.data, ERROR_MESSAGE_DATA_UNAVAILABLE);
        if (!this.state.data.has(recordId)) {
            throw new Error('Record with the ID is not contained in the table.');
        }
        return (0, cloneDeep_1.default)(this.getRecordWithChanges(recordId));
    }
    getRecordWarnings(recordId) {
        var _a;
        return (_a = this.state.warnings.get(recordId)) !== null && _a !== void 0 ? _a : new ValidationErrors_1.default();
    }
    getRecordErrors(recordId) {
        var _a;
        return (_a = this.state.errors.get(recordId)) !== null && _a !== void 0 ? _a : new ValidationErrors_1.default();
    }
    getErrors() {
        const result = [...this.state.errors.entries()];
        return result.length ? result : null;
    }
    getModel() {
        return this.props.model;
    }
    clearRecordChanges(recordId) {
        const changes = (0, cloneDeep_1.default)(this.state.changes);
        const warnings = (0, cloneDeep_1.default)(this.state.warnings);
        const errors = (0, cloneDeep_1.default)(this.state.errors);
        changes.delete(recordId);
        warnings.delete(recordId);
        errors.delete(recordId);
        this.setState({ errors, changes, warnings }, () => {
            this.removeExtraRecordIfNeed(recordId);
            if (this.props.onChange) {
                this.props.onChange(this.state.changes);
            }
        });
    }
    set(recordId, recordChanges, validate = false) {
        var _a, _b, _c;
        (0, assert_1.assertNonNullish)(this.state.data, ERROR_MESSAGE_DATA_UNAVAILABLE);
        (0, assert_1.assertNonNullish)(this.props.model, ERROR_MESSAGE_MODEL_UNAVAILABLE);
        const allChanges = (0, cloneDeep_1.default)(this.state.changes);
        const filteredRecordChanges = (0, utils_1.getRecordChanges)(this.props.model.getValidationDependency.bind(this.props.model), (_b = (_a = this.state.data.get(recordId)) !== null && _a !== void 0 ? _a : this.state.extra.get(recordId)) !== null && _b !== void 0 ? _b : {}, (_c = allChanges.get(recordId)) !== null && _c !== void 0 ? _c : {}, recordChanges);
        allChanges.set(recordId, filteredRecordChanges);
        if ((0, utils_1.isEmpty)(allChanges.get(recordId))) {
            allChanges.delete(recordId);
        }
        if (this.props.onChange) {
            this.props.onChange(this.state.changes);
        }
        this.setState({ changes: allChanges }, () => {
            if (this.props.autoSubmit) {
                this.save().catch(console.error);
            }
            else if (validate) {
                this.validateRow(recordId).catch(console.error);
            }
            else if (this.props.onChange) {
                this.props.onChange(this.state.changes);
            }
        });
    }
    async save() {
        var _a;
        const errors = (0, cloneDeep_1.default)(this.state.errors);
        const prevChanges = (0, cloneDeep_1.default)(this.state.changes);
        this.removeRecordStatusAll('new');
        (0, assert_1.assertNonNullish)(this.props.model, ERROR_MESSAGE_MODEL_UNAVAILABLE);
        const data = await this.props.model.update((0, utils_1.equalMapToArray)(prevChanges));
        if (!this.mounted) {
            return;
        }
        const nextChanges = (0, cloneDeep_1.default)(this.state.changes);
        this.state.partialErrorChecking = false;
        const unhandledErrors = [];
        for (const record of data) {
            const recordId = this.getRowID(record[0]);
            if (!(0, utils_1.isEqual)(prevChanges.get(recordId), nextChanges.get(recordId))) {
                continue;
            }
            if (record[1] instanceof Error) {
                unhandledErrors.push(record[1]);
                continue;
            }
            if (record[1] instanceof ValidationErrors_1.default) {
                errors.set(recordId, record[1]);
                continue;
            }
            nextChanges.delete(recordId);
            if (this.state.extra.has(recordId)) {
                this.removeExtraRecord(recordId);
            }
        }
        this.setState({
            errors,
            changes: nextChanges
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(nextChanges);
            }
        });
        const errorHandler = (_a = this.props.onError) !== null && _a !== void 0 ? _a : console.error.bind(console);
        unhandledErrors.forEach((error) => errorHandler(error));
    }
    unselectRecord(recordId, ignoreBlackList = false) {
        this.setState((state) => {
            const selected = [...state.selected];
            if (state.selectBlackListMode && !ignoreBlackList) {
                this.selectRecord(recordId, true);
                return null;
            }
            const pos = (0, utils_1.indexOf)(selected, recordId);
            if (pos >= 0) {
                selected.splice(pos, 1);
            }
            return { selected };
        }, () => {
            this.emitChangeSelectedNum();
        });
    }
    selectRecord(recordId, ignoreBlackList = false) {
        this.setState((state) => {
            const selected = [...state.selected];
            if (state.selectBlackListMode && !ignoreBlackList) {
                this.unselectRecord(recordId, true);
                return null;
            }
            if ((0, utils_1.indexOf)(selected, recordId) < 0) {
                selected.push(recordId);
                if (selected.length === state.count) {
                    if (state.selectBlackListMode) {
                        this.unselectAll();
                    }
                    else {
                        this.selectAll();
                    }
                    return null;
                }
            }
            return { selected };
        }, () => {
            this.emitChangeSelectedNum();
        });
    }
    selectAll() {
        this.setState({
            selectBlackListMode: true,
            selected: []
        }, () => {
            this.emitChangeSelectedNum();
        });
    }
    getSelectAllStatus() {
        return this.props.selectAllStatus;
    }
    clearAllChanges() {
        const nextState = {
            extra: new EqualMap_1.default(),
            changes: new EqualMap_1.default(),
            warnings: new EqualMap_1.default(),
            errors: new EqualMap_1.default(),
            partialErrorChecking: Boolean(this.props.partialErrorChecking),
            ...(!this.statusesOnlyViaPropsEnabled && { statuses: new EqualMap_1.default() })
        };
        this.setState(nextState, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.changes);
            }
        });
    }
    reset() {
        this.state.page = this.getValidPage(0, this.state.viewCount, this.state.count);
        if (!this.isSortingPropsMode()) {
            (0, assert_1.assertNonNullish)(this.props.onSorting, 'prop "onSorting" is required, because "sort" exists in props');
            this.props.onSorting(this.getDefaultSort());
        }
        this.updateTableInBackground();
    }
    resetSorting() {
        if (this.isSortingPropsMode()) {
            throw new Error('You can not use function "resetSorting" when set prop "sort"');
        }
        this.state.sort = this.getDefaultSort();
        this.updateTableInBackground();
    }
    removeRecordStatusAll(status) {
        (0, utils_1.warn)('method removeRecordStatusAll deprecated');
        if (this.statusesOnlyViaPropsEnabled) {
            console.error('statuses are controlled through properties');
            return;
        }
        const checkDeletingRecordIds = new Set();
        this.setState((state) => {
            const statuses = (0, cloneDeep_1.default)(state.statuses);
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
                this.removeExtraRecordIfNeed(recordId);
            }
        });
    }
    setSelectedRecords(selectedIds, blackListMode) {
        this.setState({ selected: [...selectedIds], selectBlackListMode: blackListMode }, () => {
            this.forceUpdate();
            this.emitChangeSelectedNum();
        });
    }
    getCurrentPage() {
        return this.state.page;
    }
    getCountRecords() {
        return this.state.count;
    }
    setPage(page) {
        this.state.page = this.getValidPage(page, this.state.viewCount, this.state.count);
        this.updateTableInBackground();
    }
    setViewCount(viewCount) {
        if (this.isViewCountPropsMode()) {
            throw new Error('You can not use function "setViewCount" when set prop "viewCount"');
        }
        this.state.viewCount = viewCount;
        this.state.page = this.getValidPage(this.state.page, viewCount, this.state.count);
        this.updateTableInBackground();
    }
    getPagesCount() {
        const viewCount = this.getViewCount();
        return viewCount ? Math.ceil(this.state.count / viewCount) : 1;
    }
    getViewCount() {
        if (this.isViewCountPropsMode()) {
            (0, assert_1.assertNonNullish)(this.props.viewCount, '"viewCount" defined via props, because should be defined');
            return this.props.viewCount;
        }
        return this.state.viewCount;
    }
    addRecordStatus(recordId, status) {
        (0, utils_1.warn)('method addRecordStatus deprecated');
        if (this.statusesOnlyViaPropsEnabled) {
            console.error('statuses are controlled through properties');
            return;
        }
        this.setState((state) => {
            let recordStatuses = state.statuses.get(recordId);
            const statuses = (0, cloneDeep_1.default)(state.statuses);
            if (!recordStatuses) {
                recordStatuses = new Set();
            }
            recordStatuses.add(status);
            statuses.set(recordId, recordStatuses);
            return { statuses };
        }, () => {
            if (this.state.data && !this.state.data.has(recordId)) {
                this.updateTableInBackground();
            }
        });
    }
    addRecordStatusGroup(recordIds, status) {
        (0, utils_1.warn)('method addRecordStatusGroup deprecated');
        if (this.statusesOnlyViaPropsEnabled) {
            console.error('statuses are controlled through properties');
            return;
        }
        const needTableUpdate = Boolean(recordIds.length);
        this.setState((state) => {
            const statuses = (0, cloneDeep_1.default)(state.statuses);
            for (const recordId of recordIds) {
                let recordStatuses = statuses.get(recordId);
                if (!recordStatuses) {
                    recordStatuses = new Set();
                }
                recordStatuses.add(status);
                statuses.set(recordId, recordStatuses);
            }
            return { statuses };
        }, () => {
            if (needTableUpdate) {
                this.updateTableInBackground();
            }
        });
    }
    removeRecordStatus(recordId, status) {
        (0, utils_1.warn)('method removeRecordStatus deprecated');
        if (this.statusesOnlyViaPropsEnabled) {
            console.error('statuses are controlled through properties');
            return;
        }
        let needCheckRemoveRecord;
        this.setState((state) => {
            if (!state.statuses.has(recordId)) {
                return null;
            }
            const statuses = (0, cloneDeep_1.default)(state.statuses);
            const recordStatuses = statuses.get(recordId);
            (0, assert_1.assertNonNullish)(recordStatuses, '"recordStatuses" unknown');
            if (recordStatuses.has(status)) {
                recordStatuses.delete(status);
                if (!recordStatuses.size) {
                    statuses.delete(recordId);
                    needCheckRemoveRecord = true;
                }
            }
            return { statuses };
        }, () => {
            if (needCheckRemoveRecord) {
                this.removeExtraRecordIfNeed(recordId);
            }
        });
    }
    hasRecordStatus(recordId, status) {
        const recordStatuses = this.state.statuses.get(recordId);
        if (recordStatuses) {
            return recordStatuses.has(status);
        }
        return false;
    }
    getAllWithStatus(status) {
        const records = [];
        for (const [recordId, statuses] of this.state.statuses) {
            if (statuses.has(status)) {
                records.push(recordId);
            }
        }
        return records;
    }
    getAllSelected() {
        const selected = [];
        for (const recordId of this.state.selected) {
            selected.push(recordId);
        }
        return selected;
    }
    getSortDirection() {
        return this.isSortingPropsMode() ? this.props.sort : this.state.sort;
    }
    sort(column, direction) {
        if (this.isSortingPropsMode()) {
            throw new Error('You can not use function "sort" when set prop "sort"');
        }
        const sort = {
            column,
            direction
        };
        if (this.props.multipleSorting) {
            this.state.sort.push(sort);
        }
        else {
            this.state.sort = sort;
        }
        this.setPage(0);
        if (this.props.onSorting) {
            this.props.onSorting(this.state.sort, column, direction);
        }
    }
    toggleSelectAll() {
        if (this.props.onToggleSelectAll) {
            return this.props.onToggleSelectAll();
        }
        if (this.state.selectBlackListMode) {
            this.unselectAll();
        }
        else {
            this.selectAll();
        }
    }
    isSelected(recordId) {
        const selected = this.state.selected.findIndex((key) => (0, utils_1.isEqual)(key, recordId)) >= 0;
        if (this.state.selectBlackListMode) {
            return !selected;
        }
        return selected;
    }
    toggleSelected(recordId) {
        if (this.props.onToggleSelected) {
            return this.props.onToggleSelected(recordId);
        }
        if (this.isSelected(recordId)) {
            this.unselectRecord(recordId);
        }
        else {
            this.selectRecord(recordId);
        }
    }
    render() {
        const gridClassNames = ['data-grid'];
        const sort = this.getSortDirection();
        const viewCount = this.getViewCount();
        const statuses = this.getStatuses();
        const { showLoader, totals, count, page, data, changes, errors, warnings, editor, extra } = this.state;
        const { viewVariants, viewColumns, className, height, columns, pageSizeLabel } = this.props;
        if (className) {
            gridClassNames.push(className);
        }
        return (react_1.default.createElement(PureGridComponent_1.default, { onChangeViewCount: this.handleChangeViewCount, onClickFirstPage: this.handleFirstPage, onClickPrevPage: this.handlePrevPage, onClickNextPage: this.handleNextPage, onClickLastPage: this.handleLastPage, onRefreshTable: this.handleRefreshTable, onCellClick: this.createEditor, onColumnClick: this.handleColumnClick, height: height, columns: columns, pageSizeLabel: pageSizeLabel, viewCount: viewCount, sort: sort, classNames: gridClassNames, showLoader: showLoader, totals: totals, viewVariants: viewVariants === null ? [] : viewVariants, count: count, page: page, viewColumns: viewColumns, records: data, extraRecords: extra, statuses: statuses, changes: changes, errors: errors, warnings: warnings, editor: editor, gridRef: this }));
    }
    async unsafeUpdateTable() {
        var _a, _b, _c;
        this.setState({ showLoader: true });
        if (!this.props.model) {
            return;
        }
        const viewCount = this.getViewCount();
        let loadedData;
        try {
            loadedData = await this.loadData({
                limit: viewCount,
                offset: this.state.page * viewCount,
                sort: (_a = this.sortingToArray()) !== null && _a !== void 0 ? _a : undefined,
                fields: this.getFieldsToRender(),
                extra: [...this.getAdditionalIds()]
            });
        }
        catch (error) {
            if (this.mounted) {
                this.setState({ showLoader: false });
            }
            if (!(error instanceof ThrottleError_1.default)) {
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
        const page = this.getValidPage(this.state.page, currentViewCount, loadedData.count);
        if (page !== this.state.page) {
            this.state.page = page;
            this.updateTableInBackground();
            return;
        }
        const data = new EqualMap_1.default(loadedData.records);
        const extra = new EqualMap_1.default(((_b = loadedData.extraRecords) !== null && _b !== void 0 ? _b : []).filter(([recordId]) => {
            return !data.has(recordId);
        }));
        const recordIds = [...data.keys(), ...extra.keys()];
        this.setState({
            data,
            extra,
            count: loadedData.count,
            totals: (_c = loadedData.totals) !== null && _c !== void 0 ? _c : {},
            errors: this.equalPick(this.state.errors, recordIds),
            changes: this.equalPick(this.state.changes, recordIds),
            showLoader: false
        }, () => {
            if (this.props.onPageLoad) {
                this.props.onPageLoad(loadedData);
            }
        });
    }
    async loadData(settings) {
        if (!this.props.model) {
            throw new TypeError('"model" in props is required');
        }
        let data;
        try {
            data = await this.props.model.read(settings);
        }
        catch (error) {
            if (error && this.props.onError) {
                this.props.onError(error);
            }
            throw error;
        }
        return data;
    }
    getAdditionalIds() {
        const additionalIds = new Set(this.state.statuses.keys());
        for (const [recordId] of this.state.changes) {
            additionalIds.add(recordId);
        }
        return additionalIds;
    }
    getFieldsToRender() {
        const cols = this.props.columns;
        let columnIds = [];
        (0, utils_1.forEach)(cols, (column) => {
            if (column) {
                columnIds = (0, union_1.default)(columnIds, column.render.slice(0, column.render.length - 1));
            }
        });
        return columnIds;
    }
    sortingToArray() {
        function toArray(sort) {
            return [sort.column, sort.direction];
        }
        const direction = this.getSortDirection();
        if (!direction) {
            return null;
        }
        if (this.props.multipleSorting) {
            const multipleDirection = direction;
            if (!multipleDirection.length) {
                return null;
            }
            return multipleDirection.map(toArray);
        }
        return [toArray(direction)];
    }
    equalPick(map, keys) {
        return keys.reduce((result, key) => {
            if (map.has(key)) {
                result.set(key, map.get(key));
            }
            return result;
        }, new EqualMap_1.default());
    }
    setRowChanges(recordId, data) {
        this.setState((state, props) => {
            var _a, _b, _c;
            (0, assert_1.assertNonNullish)(state.data, ERROR_MESSAGE_DATA_UNAVAILABLE);
            (0, assert_1.assertNonNullish)(props.model, ERROR_MESSAGE_MODEL_UNAVAILABLE);
            const changes = (0, cloneDeep_1.default)(state.changes);
            changes.set(recordId, (0, utils_1.getRecordChanges)(props.model.getValidationDependency.bind(props.model), (_b = (_a = state.data.get(recordId)) !== null && _a !== void 0 ? _a : state.extra.get(recordId)) !== null && _b !== void 0 ? _b : {}, (_c = changes.get(recordId)) !== null && _c !== void 0 ? _c : {}, data));
            if ((0, utils_1.isEmpty)(changes.get(recordId))) {
                changes.delete(recordId);
            }
            return { changes };
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.changes);
            }
        });
    }
    removeExtraRecord(recordId) {
        return this.removeExtraRecords([recordId]);
    }
    removeExtraRecords(recordIds) {
        if (!recordIds.length) {
            return;
        }
        const changes = (0, cloneDeep_1.default)(this.state.changes);
        const warnings = (0, cloneDeep_1.default)(this.state.warnings);
        const errors = (0, cloneDeep_1.default)(this.state.errors);
        const extra = (0, cloneDeep_1.default)(this.state.extra);
        let editor = (0, cloneDeep_1.default)(this.state.editor);
        let touchedChangesExists = false;
        for (const recordId of recordIds) {
            touchedChangesExists = touchedChangesExists || Boolean(changes.get(recordId));
            this.unselectRecord(recordId);
            extra.delete(recordId);
            changes.delete(recordId);
            warnings.delete(recordId);
            errors.delete(recordId);
            if ((0, utils_1.isEqual)(editor.recordId, recordId)) {
                editor = {};
            }
        }
        this.setState({ changes, extra, warnings, errors, editor }, () => {
            if (touchedChangesExists && this.props.onChange) {
                this.props.onChange(this.state.changes);
            }
        });
    }
    emitChangeSelectedNum() {
        if (!this.props.onSelectedChange) {
            return;
        }
        let selectedCount = this.state.selected.length;
        if (this.state.selectBlackListMode) {
            selectedCount = this.getCountRecords() - selectedCount;
        }
        this.props.onSelectedChange(this.getAllSelected(), selectedCount);
    }
    setRecordData(recordId, data) {
        if (!this.isRecordLoaded(recordId)) {
            return;
        }
        this.setState((state) => {
            (0, assert_1.assertNonNullish)(state.data, ERROR_MESSAGE_DATA_UNAVAILABLE);
            return {
                ...state,
                data: new EqualMap_1.default([...state.data].map(([dataRecordId, record]) => {
                    if (!(0, utils_1.isEqual)(recordId, dataRecordId)) {
                        return [dataRecordId, record];
                    }
                    return [
                        dataRecordId,
                        {
                            ...record,
                            ...data
                        }
                    ];
                }))
            };
        });
    }
    isRecordLoaded(recordId) {
        if (!this.state.data) {
            return false;
        }
        return this.state.data.has(recordId);
    }
    getRowID(recordId) {
        (0, assert_1.assertNonNullish)(this.state.data, ERROR_MESSAGE_DATA_UNAVAILABLE);
        if (!this.state.data.has(recordId) && !this.state.extra.has(recordId)) {
            throw new Error('Record with the ID is not contained in the table.');
        }
        return recordId;
    }
    getDefaultSort() {
        if (this.props.defaultSort) {
            return (0, cloneDeep_1.default)(this.props.defaultSort);
        }
        return null;
    }
    isSortingPropsMode() {
        return this.props.hasOwnProperty('sort');
    }
    async onBlurEditor(recordId) {
        this.setState({ editor: {} });
        await this.checkWarnings(recordId);
        if (this.props.autoSubmit) {
            await this.save();
            return;
        }
        (0, assert_1.assertNonNullish)(this.props.model, ERROR_MESSAGE_MODEL_UNAVAILABLE);
        try {
            const errors = await this.checkValidatorErrors(recordId, this.props.model.isValidRecord.bind(this.props.model), this.getRecordChanges, 'errors');
            this.setState({ errors });
        }
        catch (e) {
            if (!(e instanceof ThrottleError_1.default)) {
                throw e;
            }
        }
    }
    onBlurEditorInBackground(recordId) {
        this.onBlurEditor(recordId).catch(console.error);
    }
    async validateRow(recordId) {
        (0, assert_1.assertNonNullish)(this.props.model, ERROR_MESSAGE_MODEL_UNAVAILABLE);
        const errors = await this.checkValidatorErrors(recordId, this.props.model.isValidRecord.bind(this.props.model), this.getRecordChanges, 'errors');
        this.setState({ errors });
    }
    async checkWarnings(recordId) {
        if (!this.props.warningsValidator) {
            return;
        }
        const warnings = await this.checkValidatorErrors(recordId, this.props.warningsValidator.isValidRecord.bind(this.props.warningsValidator), (recordId) => {
            var _a;
            return (_a = this.getRecordWithChanges(recordId)) !== null && _a !== void 0 ? _a : {};
        }, 'warnings');
        this.setState({ warnings });
    }
    async checkValidatorErrors(recordId, validate, getData, resultField) {
        const record = getData(recordId);
        const validErrors = await validate(record);
        const clonedResult = new EqualMap_1.default(this.state[resultField]);
        if ((0, utils_1.isEqual)(record, getData(recordId))) {
            if (validErrors.isEmpty()) {
                clonedResult.delete(recordId);
            }
            else {
                clonedResult.set(recordId, validErrors);
            }
        }
        return clonedResult;
    }
    onFocusEditor(recordId, columnId) {
        const errors = (0, cloneDeep_1.default)(this.state.errors);
        const columnErrors = errors.get(recordId);
        if (!columnErrors) {
            return;
        }
        const editorFieldName = this.getEditorFieldName(columnId);
        columnErrors.clearField(editorFieldName);
        if (columnErrors.isEmpty()) {
            errors.delete(recordId);
        }
        this.setState({ errors });
    }
    onChangeEditor(recordId, columnId, eventOrValue, editorContext) {
        const value = (0, cloneDeep_1.default)((0, utils_1.parseValueFromEvent)(eventOrValue));
        const columnConfig = this.props.columns[columnId];
        (0, assert_1.assertNonNullish)(columnConfig, `"${columnId}" column unavailable`);
        const record = this.getRecordWithChanges(recordId);
        (0, assert_1.assertNonNullish)(record, '"record" unknown');
        (0, assert_1.assertNonNullish)(columnConfig.editor, '"columnConfig.editor" unknown');
        const context = (0, cloneDeep_1.default)(editorContext);
        context.props.value = value;
        const element = columnConfig.editor.call(context, record, this);
        (0, assert_1.assertNonNullish)(element, 'received unknown element on change editor');
        const recordChanges = {};
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
    getValidPage(page, view, count) {
        let validPage = page;
        if (validPage * view >= count) {
            validPage = view ? Math.ceil(count / view) - 1 : 0;
        }
        return Math.max(0, validPage);
    }
    removeExtraRecordIfNeed(recordId) {
        if (this.state.extra.has(recordId) &&
            !this.state.statuses.has(recordId) &&
            !this.state.changes.has(recordId)) {
            this.removeExtraRecord(recordId);
        }
    }
    isViewCountPropsMode() {
        return this.props.hasOwnProperty('viewCount');
    }
    getStatuses() {
        var _a, _b;
        const statuses = (0, cloneDeep_1.default)(this.state.statuses);
        if (this.state.selectBlackListMode) {
            (0, assert_1.assertNonNullish)(this.state.data, ERROR_MESSAGE_DATA_UNAVAILABLE);
            for (const [recordId] of this.state.data) {
                if ((0, utils_1.indexOf)(this.state.selected, recordId) < 0) {
                    const recordStatuses = (_a = statuses.get(recordId)) !== null && _a !== void 0 ? _a : new Set();
                    recordStatuses.add('selected');
                    statuses.set(recordId, recordStatuses);
                }
            }
            return statuses;
        }
        for (const recordId of this.state.selected) {
            const recordStatuses = (_b = statuses.get(recordId)) !== null && _b !== void 0 ? _b : new Set();
            recordStatuses.add('selected');
            statuses.set(recordId, recordStatuses);
        }
        return statuses;
    }
    getEditorFieldName(columnId) {
        var _a, _b;
        return (_b = (_a = this.props.columns[columnId]) === null || _a === void 0 ? void 0 : _a.editorField) !== null && _b !== void 0 ? _b : columnId;
    }
}
GridComponent.defaultProps = DEFAULT_PROPS;
exports.default = GridComponent;
//# sourceMappingURL=Component.js.map