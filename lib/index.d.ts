/// <reference types="react" />
import * as React from 'react';
export declare type ResponsiveRenderer = (state: {
    width: number;
    height: number;
}) => React.ReactElement<any>;
export declare type ResponsiveProps = {
    children: ResponsiveRenderer | React.ReactElement<any> | React.ReactElement<any>[];
    toElement?: boolean;
    resizeTimeout?: number;
    onChange?: (state: {
        width: number;
        height: number;
    }) => any;
};
export declare type ResponsiveState = {
    width: number;
    height: number;
};
export declare class Responsive extends React.PureComponent<ResponsiveProps, ResponsiveState> {
    static defaultProps: {
        resizeTimeout: number;
    };
    state: {
        width: number;
        height: number;
    };
    timeout: any;
    animationFrameRequest: any;
    componentWillReceiveProps(nextProps: ResponsiveProps): void;
    componentWillMount(): void;
    componentWillUnmount(): void;
    setup: (props?: ResponsiveProps) => void;
    shutdown: () => void;
    elementResizeTimeout: () => void;
    frameRequest: () => void;
    handleWindowResize: () => void;
    handleWindowResizeTimeout: () => void;
    handleResize: (state: {
        width: number;
        height: number;
    }) => void;
    afterResize: () => void;
    render(): React.ReactElement<any> | React.ReactElement<any>[] | (string & ResponsiveRenderer) | (number & ResponsiveRenderer) | (true & ResponsiveRenderer) | (false & ResponsiveRenderer) | ((string | number | boolean | any[] | React.ReactElement<any>)[] & ResponsiveRenderer) | (React.ReactPortal & ResponsiveRenderer);
}
