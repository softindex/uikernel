/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useEffect, useState, useMemo} from 'react';
import FormService from './FormService';

function useForm(settings, onError = console.error) {
  const formService = useMemo(() => new FormService(), []);
  const [formState, setFormState] = useState(formService.getAll());

  useEffect(() => {
    formService.init(settings).catch(onError);
    formService.addChangeListener(setFormState);
    return () => formService.removeChangeListener(setFormState);
  }, [formService]);

  return [formState, formService];
}

export default useForm;
