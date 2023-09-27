import React from 'react';
import type { StrictOmit } from 'ts-essentials';
type Value = number | string | null;
type Props = StrictOmit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'onChange' | 'type' | 'value'> & {
    value: Value;
    onChange: (value: Value) => void;
};
type State = {
    value: Value;
};
declare class NumberEditor extends React.Component<Props, State> {
    private input;
    constructor(props: Props);
    UNSAFE_componentWillReceiveProps(nextProps: Props): void;
    render(): JSX.Element;
    private onChangeHandler;
}
export default NumberEditor;
