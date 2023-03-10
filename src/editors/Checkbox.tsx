/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  indeterminate: boolean;
};

function Checkbox({indeterminate, ...otherProps}: Props): JSX.Element {
  return (
    <input
      {...otherProps}
      type="checkbox"
      ref={(input): void => {
        if (input) {
          input.indeterminate = indeterminate;
        }
      }}
    />
  );
}

export default Checkbox;
