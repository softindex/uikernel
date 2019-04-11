 /*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
 import ReactDOM from 'react-dom';
 import UIKernel from 'uikernel';
 import 'uikernel/dist/themes/base/uikernel.css';

 const model = new UIKernel.Models.Grid.Collection({
   data: [
     [1, {
       name: 'Pace',
       surname: 'White',
       age: 20
     }],
     [2, {
       name: 'Evangeline',
       surname: 'Terrell',
       age: 72
     }],
     [3, {
       name: 'Roach',
       surname: 'Potts',
       age: 14
     }]
   ]
 });

 const columns = {
   name: {
     name: 'First Name',
     render: ['name', record => record.name]
   },
   surname: {
     name: 'Last Name',
     render: ['surname', record => record.surname]
   },
   age: {
     name: 'Age',
     render: ['age', record => record.age]
   }
 };

 ReactDOM.render(
   <UIKernel.Grid cols={columns} model={model}/>,
   document.getElementById('root')
 );
