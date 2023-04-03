/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRef} from 'react';
import columns from '../columns';
import model from '../model';
import UIKernel from 'uikernel';
import Form from './Form';

function MainComponent() {
  const gridRef = useRef();

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title">Records</h3>
            </div>
            <div className="panel-body padding0">
              <UIKernel.Grid
                ref={gridRef}
                model={model}
                columns={columns}
                autoSubmit={true}
              />
              <Form/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default MainComponent
