import React from 'react';
type AvailableDateValue = Date | null | undefined;
type Props = {
    endDate?: AvailableDateValue;
    format?: string;
    max?: AvailableDateValue;
    min?: AvailableDateValue;
    show?: boolean;
    startDate?: AvailableDateValue;
    textFormat: string;
    todayButton: string;
    value?: AvailableDateValue;
    onBlur?: () => void;
    onChange: (date: string | null) => void;
};
declare class DatePickerEditor extends React.Component<Props> {
    static defaultProps: {
        readonly textFormat: "yyyy-MM-dd";
        readonly todayButton: "Today";
    };
    onChange: (date: Date | null) => void;
    parseDate(value: AvailableDateValue | string): AvailableDateValue;
    render(): JSX.Element;
}
export default DatePickerEditor;
