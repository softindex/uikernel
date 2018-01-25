/**
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
        // display name, surname, phone by default
        bulk: true,
        tools: true,
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
    const isBlackMode = this.refs.grid.state.selectBlackListMode;
    let selected = this.refs.grid.getAllSelected();

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

  onSelectedChange(records) {
    this.setState({
      selectedNum: records.length
    });
  }

  deleteSelectedRecords() {
    const records = this.getSelectedRecords();

    records.forEach((recordId) => {
      this.state.model.delete(recordId, (err) => {
        if (!err) {
          this.refs.grid.updateTable();
        }
      });
    });

    this.refs.grid.unselectAll();
  }

  highlightNewRecord(recordId) {
    this.refs.grid.addRecordStatus(recordId, 'new'); // mark the record as new
  }

  openColumnsForm() {
    //open modal with our information (you can use your own modal)
    const columnsWindow = Popup.open(DynamicColumnsForm, {
      cols: this.state.cols,
      onChange: (cols) => {
        columnsWindow.close();
        this.setState({cols});
      }
    }, "opened");
  }

  onSave() {
    this.refs.grid.save()
      .catch(() => {
        alert('Error');
      });
  }

  onClear() {
    this.refs.grid.clearAllChanges();
  }

  render() {
    const blackMode = this.refs.grid ? this.refs.grid.state.selectBlackListMode : false;
    let numText; // selected records

    if (blackMode) {
      numText = 'Selected all records.';
    } else {
      numText = `Selected ${this.state.selectedNum} ${this.state.selectedNum === 1 ? 'record' : 'records'}`;
    }

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
            <i className="fa fa-th-list"></i>{' '}Columns
          </a>
          <a className="btn btn-success" onClick={() => this.deleteSelectedRecords()}>Delete selected</a>
          {numText}
        </div>
        <div className="panel-body padding0">
          <UIKernel.Grid
            ref="grid"
            model={this.state.model} // Grid model
            cols={columns} // columns configuration
            viewColumns={this.state.cols}
            viewCount={10} // 10 records limit to display by default
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
