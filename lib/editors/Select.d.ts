import React from 'react';
import { StrictOmit } from 'ts-essentials';
type AdvancedOptions<TValue> = [
    Exclude<TValue, null>,
    string,
    StrictOmit<React.OptionHTMLAttributes<HTMLOptionElement>, 'value'>?
][];
type AvailableOptions<TValue> = Exclude<TValue, string | null> extends never ? AdvancedOptions<TValue> | string[] : AdvancedOptions<TValue>;
type State<TValue, TOptions extends AvailableOptions<TValue>> = {
    loading: boolean;
    options: TOptions | [[null, ''], ...TOptions];
};
type Props<TValue, TOptions extends AvailableOptions<TValue>> = StrictOmit<React.SelectHTMLAttributes<HTMLSelectElement>, 'disabled' | 'onChange' | 'value'> & {
    disabled: boolean;
    model?: {
        read: (search: string) => Promise<TOptions>;
    };
    options: State<TValue, TOptions>['options'];
    value: TValue | null;
    onChange: (value: TValue | null) => void;
    onLabelChange?: (value: string) => void;
};
declare class SelectEditor<TValue, TOptions extends AvailableOptions<TValue>> extends React.Component<Props<TValue, TOptions>, State<TValue, TOptions>> {
    static defaultProps: {
        readonly options: readonly [];
    };
    constructor(props: Props<TValue, TOptions>);
    componentDidMount(): void;
    getOptions(): State<TValue, TOptions>['options'];
    handleChange: React.ChangeEventHandler<HTMLSelectElement>;
    render(): JSX.Element;
}
export default SelectEditor;
