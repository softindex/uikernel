/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const DEFAULT_FILTERS = {
  search: '',
  age: null,
  gender: 0,
};

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: DEFAULT_FILTERS,
      model,
      cols: {
        // display id, name, surname, phone by default
        bulk: true,
        tools: true,
        id: true,
        name: true,
        surname: true,
        phone: true,
        // hide age, gender
        age: false,
        gender: false
      },
      selectedNum: 0
    };
  }

  getSelectedRecords() {
    const isBlackMode =this.grid.state.selectBlackListMode;
    let selected =this.grid.getAllSelected();

    if (isBlackMode) {
      const allData = this.state.model.data.map(item => item[0]);
      selected = allData.filter(el => !selected.includes(el));
    }

    this.setState({ selectedNum: selected.length });
    return selected;
  }

  onFiltersChange(filters) {
    this.setState({
      filters,
      model: UIKernel.applyGridFilters(model, filters)
    });
  }

  onSelectedChange() {
    const num = this.getSelectedRecords().length;
    this.setState({
      selectedNum: num
    });
  }

  deleteSelectedRecords() {
    const records = this.getSelectedRecords();

    records.forEach((recordId) => {
      this.state.model.delete(recordId, (err) => {
        if (!err) {
          this.grid.updateTable();
        }
      });
    });

    this.grid.unselectAll();
  }

  highlightNewRecord(recordId) {
    this.grid.addRecordStatus(recordId, 'new'); // mark the record as new
  }

  openColumnsForm() {
    //open modal with our information (you can use your own modal)
    const columnsWindow = Popup.open(DynamicColumnsForm, {
      cols: this.state.cols,
      onChange: (cols) => {
        columnsWindow.close();
        this.setState({cols});
      }
    }, 'opened');
  }

  onSave() {
    this.grid.save()
      .catch(() => {
        alert('Error');
      });
  }

  onClear() {
    this.grid.clearAllChanges();
  }

  render() {
    const numText = `Selected ${this.state.selectedNum} ${this.state.selectedNum === 1 ? 'record' : 'records'}`;

    return [
      <div className="panel">
        <div className="panel-heading">
          <FiltersForm
            filters={this.state.filters}
            onChange={(filters) => this.onFiltersChange(filters)}
            onClear={() => this.onFiltersChange(DEFAULT_FILTERS)}
          />
        </div>
        <div className="panel-footer">
          <a className="btn btn-default" onClick={() => this.openColumnsForm()}>
            <i className="fa fa-th-list"/>{' '}Columns
          </a>
          <a className="btn btn-success" onClick={() => this.deleteSelectedRecords()}>Delete selected</a>
          {numText}
        </div>
        <div className="panel-body padding0">
          <UIKernel.Grid
            ref={(grid) => this.grid = grid}
            model={this.state.model} // Grid model
            cols={columns} // columns configuration
            viewColumns={this.state.cols}
            defaultViewCount={10} // 10 records limit to display by default
            viewVariants={[10, 20, 50, 100]}
            onSelectedChange={(records) => this.onSelectedChange(records)}
          />
        </div>
        <div className="panel-footer">
          <a className="btn btn-default" onClick={() => this.onClear()}>Clear changes</a>
          {' '}
          <a className="btn btn-primary" onClick={() => this.onSave()}>Save</a>
        </div>
      </div>,
      <div className="panel">
        <div className="panel-heading">
          <h2 className="panel-title">Add record</h2>
        </div>
        <div className="panel-body">
          <CreateForm onSubmit={(recordId) => this.highlightNewRecord(recordId)}/>
        </div>
      </div>
    ];
  }
}
