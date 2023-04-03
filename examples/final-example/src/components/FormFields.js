/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import UIKernel from 'uikernel';

function FormFields({formService, formState}) {
  return (
    <div className="form-horizontal">
      <div className={"form-group" + (formState.fields.name.isChanged ? ' bg-warning' : '') +
      (formState.fields.name.errors.length ? ' bg-danger' : '')}>
        <label className="col-sm-3 control-label">First Name</label>
        <div className="col-sm-9">
          <input
            type="text"
            className="form-control"
            onChange={formService.updateField.bind(formService, 'name')}
            onFocus={formService.clearValidation.bind(formService, 'name')}
            onBlur={formService.validateForm}
            value={formState.fields.name.value}
          />
        </div>
      </div>
      <div className={"form-group" + (formState.fields.surname.isChanged ? ' bg-warning' : '') +
      (formState.fields.surname.errors.length ? ' bg-danger' : '')}>
        <label className="col-sm-3 control-label">Last Name</label>
        <div className="col-sm-9">
          <input
            type="text"
            className="form-control"
            onChange={formService.updateField.bind(formService, 'surname')}
            onFocus={formService.clearValidation.bind(formService, 'surname')}
            onBlur={formService.validateForm}
            value={formState.fields.surname.value}
          />
        </div>
      </div>
      <div className={"form-group" + (formState.fields.phone.isChanged ? ' bg-warning' : '') +
      (formState.fields.phone.errors.length ? ' bg-danger' : '')}>
        <label className="col-sm-3 control-label">Phone</label>
        <div className="col-sm-9">
          <input
            type="text"
            className="form-control"
            onChange={formService.updateField.bind(formService, 'phone')}
            onFocus={formService.clearValidation.bind(formService, 'phone')}
            onBlur={formService.validateForm}
            value={formState.fields.phone.value}
          />
        </div>
      </div>
      <div className={"form-group" + (formState.fields.age.isChanged ? ' bg-warning' : '') +
      (formState.fields.age.errors.length ? ' bg-danger' : '')}>
        <label className="col-sm-3 control-label">Age</label>
        <div className="col-sm-9">
          <input
            type="number"
            className="form-control"
            onChange={formService.updateField.bind(formService, 'age')}
            onFocus={formService.clearValidation.bind(formService, 'age')}
            onBlur={formService.validateForm}
            value={formState.fields.age.value}
          />
        </div>
      </div>
      <div className={"form-group" + (formState.fields.gender.isChanged ? ' bg-warning' : '') +
      (formState.fields.gender.errors.length ? ' bg-danger' : '')}>
        <label className="col-sm-3 control-label">Gender</label>
        <div className="col-sm-9">
          <UIKernel.Editors.Select
            options={[
              [1, 'Male'],
              [2, 'Female']
            ]}
            className="form-control"
            onChange={formService.updateField.bind(formService, 'gender')}
            onFocus={formService.clearValidation.bind(formService, 'gender')}
            onBlur={formService.validateForm}
            value={formState.fields.gender.value}
          />
        </div>
      </div>
    </div>
  );
}

export default FormFields;
