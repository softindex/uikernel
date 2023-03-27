/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import UIKernel, {useForm} from 'uikernel';
import model from '../model';

const Form = () => {
  const [formState, formService] = useForm({
    fields: ['name', 'age'], // Fields we need
    model: new UIKernel.Adapters.Grid.ToFormUpdate(model, 2), // We're going to change record with ID = 2
  });

  if (!formState.isLoaded) {
    return <span>Loading...</span>;
  }

  return (
    <div className="form">
      <div className="header panel-heading">
        <h4 className="title">Edit record number 2</h4>
      </div>
      <div className="body">
        <form className="form-horizontal change-second-field-form">
          <div className={'form-group' + (formState.fields.name.errors.length ? ' error' : '')}>
            <label className="col-sm-2 control-label">Name</label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                onChange={(event) => formService.submitData({name: event.target.value})}
                value={formState.fields.name.value}
              />
            </div>
            <div className="col-sm-4">
              <div className="validation-error">{formState.fields.name.errors[0]?.message}</div>
            </div>
          </div>
          <div className={'form-group' + (formState.fields.age.errors.length ? ' error' : '')}>
            <label className="col-sm-2 control-label">Age</label>
            <div className="col-sm-6">
              {/* we use UIKernel.Editors.Number instead of <input type =" number "/>          */}
              {/* because UIKernel.Editors.Number returns a numeric value instead of a string. */}
              <UIKernel.Editors.Number
                className="form-control"
                onChange={(value) => formService.submitData({age: value})}
                value={formState.fields.age.value}
              />
            </div>
            <div className="col-sm-4">
              <div className="validation-error">{formState.fields.age.errors[0]?.message}</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form
