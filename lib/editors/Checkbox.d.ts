import React from 'react';
type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    indeterminate: boolean;
};
declare function Checkbox({ indeterminate, ...otherProps }: Props): JSX.Element;
export default Checkbox;
