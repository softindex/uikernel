/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createRoot } from 'react-dom/client';
import 'uikernel/dist/themes/base/uikernel.css';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import MainComponent from './components/MainComponent.js';

createRoot(document.getElementById('root')).render(<MainComponent/>);