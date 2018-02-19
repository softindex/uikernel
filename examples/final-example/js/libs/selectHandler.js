const selectRecordsHandler = {
  name: grid => {
    const selectedCount = grid.getAllSelected().length;
    const isIndeterminate = grid.getCountRecords() !== selectedCount && selectedCount;
    const recordsCount = grid.getCountRecords();
    const isAllSelected = (recordsCount > 0 && recordsCount === selectedCount) || grid.isSelectBlackMode();
    return `
      <label class="green-checkbox${isIndeterminate ? ' indeterminate' : ''}${isAllSelected ? ' checked' : ''}">
        <input
          type="checkbox"
          ref="toggleSelectedAll"
          ${isAllSelected ? ' checked' : ''}
        />
      </label>
    `;
  },
  width: '40px',
  className: 'text-center',
  render: [(record, selected) => {
    const isSelected = selected ? ' checked' : '';
    return `<label class="${isSelected}">
      <input type="checkbox" ref="toggleSelected" ${isSelected}/>
    </label>`;
  }],
  onClickRefs: {
    toggleSelected(e, recordId, record, grid) {
      grid.toggleSelected(recordId);
    },
    toggleSelectedAll(e, grid) {
      grid.toggleSelectAll();
    }
  }
};