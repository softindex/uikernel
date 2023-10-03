/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useEffect, useMemo, useState} from 'react';
import FormService from './FormService';
import type {FormModelListenerArgsByEventName} from './types/FormModelListenerArgsByEventName';
import type {FormServiceEmptyState, FormServiceParams, FormServiceState} from './types/IFormService';

export type UseFormResult<
  TEditableRecord extends Record<string, unknown>,
  TRecord extends TEditableRecord,
  TAvailableField extends keyof TRecord & string
> = [
  (
    | FormServiceEmptyState<TRecord, TAvailableField, keyof TEditableRecord & string>
    | FormServiceState<TRecord, TAvailableField, keyof TEditableRecord & string>
  ),
  FormService<TEditableRecord, TRecord, TAvailableField>
];

function useForm<
  TEditableRecord extends Record<string, unknown>,
  TRecord extends TEditableRecord,
  TAvailableField extends keyof TRecord & string
>(
  settings: FormServiceParams<
    TEditableRecord,
    TRecord,
    TAvailableField,
    FormModelListenerArgsByEventName<TRecord>
  >,
  onError: (error: Error) => void = console.error
): UseFormResult<TEditableRecord, TRecord, TAvailableField> {
  const formService = useMemo(() => new FormService<TEditableRecord, TRecord, TAvailableField>([]), []);
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
