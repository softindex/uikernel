/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useState} from 'react';
import columns from '../columns';
import model from '../model';
import UIKernel from 'uikernel';
import Form from './Form';

function MainComponent() {
  const [cols, setCols] = useState({
    name: true,
    surname: true,
    phone: true,
    age: false,
    gender: false
  });

  return (
    <div>
      <Form
        cols={cols}
        onChange={cols => setCols(cols)}
      />
      <UIKernel.Grid
        columns={columns}
        model={model}
        viewColumns={cols}
        viewCount={20}
      />
    </div>
  );
}

export default MainComponent;
