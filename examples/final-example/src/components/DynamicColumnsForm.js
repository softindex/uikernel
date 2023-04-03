/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

function DynamicColumnsForm({onClose, onChange, value, columns}) {
  function onChangeCheckbox(key, show) {
    onChange({
      ...value,
      [key]: show
    });
  }

  return (
    <div className="modal show">
      <div className="modal-dialog">
        <div className="modal-content animated fadeIn">
          <div className="modal-header">
            <h4 className="modal-title">Columns</h4>
            <button type="button" className="close" data-dismiss="modal" onClick={onClose}>
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="form-horizontal">
              {[...Object.entries(columns)].map(([columnId, column]) => {
                if (['bulk', 'tools'].includes(columnId)) {
                  return null;
                }

                return (
                  <FormCheckbox
                    key={columnId}
                    id={columnId}
                    value={value[columnId]}
                    onChange={onChangeCheckbox.bind(null, columnId)}
                  >
                    {column.name}
                  </FormCheckbox>
                );
              })}
            </form>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormCheckbox({id, value, onChange, children}) {
  const domId = `FormCheckbox-${id}`;

  return (
    <div className="row">
      <div className="col-lg-3">
        <input
          id={domId}
          type="checkbox"
          checked={value}
          onChange={() => onChange(!value)}
        />
      </div>
      <div className="col-lg-9">
        <label htmlFor={domId}>{children}</label>
      </div>
    </div>
  );
}

export default DynamicColumnsForm;
