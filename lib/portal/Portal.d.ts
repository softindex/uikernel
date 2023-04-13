import React from 'react';
type Props = React.HTMLAttributes<HTMLDivElement> & {
    onDocumentMouseDown?: (event: MouseEvent, isDocumentEventOwner: boolean) => void;
    onDocumentMouseScroll?: (event: Event, isDocumentEventOwner: boolean) => void;
};
declare class Portal extends React.Component<Props> {
    private portal;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    renderPortal(): void;
    render(): null;
    private isDocumentEventOwner;
    private onDocumentMouseDown;
    private onDocumentMouseScroll;
}
export default Portal;
