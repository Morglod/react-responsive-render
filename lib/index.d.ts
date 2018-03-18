/// <reference types="react" />
import * as React from 'react';
export declare type ResponsiveRenderer = ({width, height}: {
    width: number;
    height: number;
}) => React.ReactElement<any>;
export declare type ResponsiveProps = {
    children: ResponsiveRenderer;
    toElement?: boolean;
    resizeTimeout?: number;
};
export declare type ResponsiveState = {
    width: number;
    height: number;
};
export declare class Responsive extends React.Component<ResponsiveProps, ResponsiveState> {
    static defaultProps: {
        resizeTimeout: number;
    };
    state: {
        width: number;
        height: number;
    };
    timeout: any;
    animationFrameRequest: any;
    componentWillMount(): void;
    componentWillUnmount(): void;
    elementResizeTimeout: () => void;
    frameRequest: () => void;
    handleWindowResize: () => void;
    handleWindowResizeTimeout: () => void;
    handleResize: (state: {
        width: number;
        height: number;
    }) => void;
    render(): React.ReactElement<any> | null;
}
