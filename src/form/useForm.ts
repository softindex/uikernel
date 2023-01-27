/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useEffect, useMemo, useState} from 'react';
import FormService from './FormService';
import {FormServiceEmptyState, FormServiceParams, FormServiceState} from './types/IFormService';

type ModelListenerArgsByEventName<TRecord extends Record<string, unknown>> = {update: [Partial<TRecord>]};

export type UseFormResult<
  TRecord extends Record<string, unknown>,
  TAvailableField extends keyof TRecord & string
> = [
  FormServiceEmptyState<TRecord, TAvailableField> | FormServiceState<TRecord, TAvailableField>,
  FormService<TRecord, TAvailableField>
];

function useForm<TRecord extends Record<string, unknown>, TAvailableField extends keyof TRecord & string>(
  settings: FormServiceParams<TRecord, TAvailableField, ModelListenerArgsByEventName<TRecord>>,
  onError: (error: Error) => void = console.error
): UseFormResult<TRecord, TAvailableField> {
  const formService = useMemo(() => new FormService<TRecord, TAvailableField>([]), []);
  const [formState, setFormState] = useState(() => formService.getAll());

  useEffect(() => {
    formService.init(settings).catch(onError);
    formService.addChangeListener(setFormState);
    return () => formService.removeChangeListener(setFormState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formService]);

  return [formState, formService];
}

export default useForm;
