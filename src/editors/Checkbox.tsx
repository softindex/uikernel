/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
type CheckboxProps = {
  indeterminate?: boolean
};
const Checkbox: React.FC<CheckboxProps> = props => {
  const { indeterminate, ...otherProps } = props;
  return (
    <input
      {...otherProps}
      type="checkbox"
      ref={input => {
        if (input && indeterminate) {
          input.indeterminate = indeterminate;
        }
      }}
    />
  );
};
export default Checkbox;
