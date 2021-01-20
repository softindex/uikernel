/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import UIKernel from 'uikernel';
import FormFields from './FormFields';

function EditRecordForm({model, changes, onSubmit, onClose}) {
  const [formState, formService] = UIKernel.useForm({
    fields: ['name', 'surname', 'phone', 'age', 'gender'],
    model,
    changes,
    partialErrorChecking: true
  });

  if (!formState.isLoaded) {
    return <span>Loading...</span>;
  }

  function submit(e) {
    e.preventDefault();
    formService.submit()
      .then((recordId) => onSubmit(recordId))
      .catch(error => console.error(error));
  }

  return (
    <form onSubmit={submit}>
      <div className="modal show">
        <div className="modal-dialog modal-lg">
          <div className="modal-content animated fadeIn">
            <div className="modal-header">
              <h4 className="modal-title">
                Edit {formState.fields.name.value} {formState.fields.surname.value}
              </h4>
              <button type="button" className="close" data-dismiss="modal" onClick={onClose}>
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="modal-body">
              <FormFields formService={formService} formState={formState}/>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditRecordForm;
