/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useRef, useState, useMemo} from 'react';
import UIKernel from 'uikernel';
import getColumns from '../configs/getColumns';
import gridModel from '../gridModel';
import EditRecordForm from './EditRecordForm';
import useGridSelect from '../utils/useGridSelect';
import DynamicColumnsForm from './DynamicColumnsForm';
import FiltersForm from './FiltersForm';
import CreateForm from './CreateForm';

const DEFAULT_FILTERS = {
  search: '',
  age: null,
  gender: 0,
};

function MainComponent() {
  const gridRef = useRef();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [editRecordId, setEditRecordId] = useState(null);
  const [showColumnsPopup, setShowColumnsPopup] = useState(null);
  const [viewColumns, setViewColumns] = useState({
    bulk: true,
    tools: true,
    name: true,
    surname: true,
    phone: true,
    age: false,
    gender: false
  });
  const filteredGridModel = useMemo(() => {
    return UIKernel.applyGridFilters(gridModel, filters);
  }, [filters]);
  const {
    selected,
    toggleAllStatus,
    toggleSelected,
    toggleAll
  } = useGridSelect(filteredGridModel);
  const columns = useMemo(() => {
    return getColumns(
      setEditRecordId,
      onDeleteClick,
      toggleSelected,
      toggleAll,
      toggleAllStatus
    );
  }, []);

  function onDeleteClick(recordId) {
    gridModel.delete([recordId]);
  }

  function onSave() {
    gridRef.current.save()
      .catch(error => console.error(error));
  }

  function saveRecordChanges(recordId) {
    gridRef.current.clearRecordChanges(recordId);
    setEditRecordId(null);
  }

  return (
    <>
      {editRecordId !== null && (
        <EditRecordForm
          model={new UIKernel.Adapters.Grid.ToFormUpdate(gridModel, editRecordId)}
          mode="edit"
          changes={gridRef.current.getRecordChanges(editRecordId)}
          onSubmit={saveRecordChanges}
          onClose={() => setEditRecordId(null)}
        />
      )}
      {showColumnsPopup && (
        <DynamicColumnsForm
          columns={columns}
          value={viewColumns}
          onChange={setViewColumns}
          onClose={() => setShowColumnsPopup(false)}
        />
      )}
      <div className="panel">
        <div className="panel-heading">
          <FiltersForm
            filters={filters}
            onChange={setFilters}
            onClear={() => setFilters(DEFAULT_FILTERS)}
          />
        </div>
        <div className="panel-footer">
          <button className="btn btn-default" onClick={() => setShowColumnsPopup(true)}>
            <i className="fa fa-th-list"/>{' '}Columns
          </button>
          {' '}
          <button className="btn btn-success" onClick={() => gridModel.delete(selected)}>
            Delete selected
          </button>
          {' '}
          Selected {selected.length} {selected.length === 1 ? 'record' : 'records'}
        </div>
        <div className="panel-body padding0">
          <UIKernel.Grid
            ref={gridRef}
            model={filteredGridModel}
            columns={columns}
            viewColumns={viewColumns}
            defaultViewCount={10}
            viewVariants={[10, 20, 50, 100]}
            selected={selected}
          />
        </div>
        <div className="panel-footer">
          <button className="btn btn-default" onClick={() => gridRef.current.clearAllChanges()}>
            Clear changes
          </button>
          {' '}
          <button className="btn btn-primary" onClick={onSave}>Save</button>
        </div>
      </div>
      <div className="panel">
        <div className="panel-heading">
          <h2 className="panel-title">Add record</h2>
        </div>
        <div className="panel-body">
           <CreateForm onSubmit={recordId => gridRef.current.addRecordStatus(recordId, 'new')}/> 
        </div>
      </div>
    </>
  );
}

export default MainComponent;
