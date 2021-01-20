/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import UIKernel from 'uikernel';
import gridModel from '../gridModel';
import FormFields from './FormFields';

function CreateForm({onSubmit}) {
  const [formState, formService] = UIKernel.useForm({
    fields: ['name', 'surname', 'phone', 'age', 'gender'],
    model: new UIKernel.Adapters.Grid.ToFormCreate(gridModel, { // default field values
      name: '',
      surname: '',
      phone: '',
      age: 18,
      gender: 1
    }),
    submitAll: true,
    partialErrorChecking: true
  });

  function handleSubmit(e) {
    e.preventDefault();
    formService.submit()
      .then(onSubmit)
      .catch((err) => console.log(err));
  }

  if (!formState.isLoaded) {
    return <span>Loading...</span>;
  }

  return (
    <div className="body">
      <form className="form-horizontal edit-form col-md-offset-2 col-md-8" onSubmit={handleSubmit}>
        <FormFields formService={formService} formState={formState}/>
        <div className="form-group">
          <div className="col-sm-offset-5 col-sm-4">
            <button type="button" className="btn btn-default" onClick={() => formService.clearChanges()}>
              Clear
            </button>
            {' '}
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateForm;
