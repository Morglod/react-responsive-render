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
    /**
     * window position is scroll
     * element's position relative to screen
     */
    trackPosition?: boolean;
    onChange?: (state: {
        width: number;
        height: number;
        left?: number;
        top?: number;
    }) => any;
};
export declare type ResponsiveState = {
    width: number;
    height: number;
    left: number;
    top: number;
};
/**
 * ```js
 * <Responsive>{
 *   ({ width, height }) =>
 *     <div>
 *       Window: {width} x {height}
 *     </div>
 * }</Responsive>
 *  ```
 */
export declare class Responsive extends React.PureComponent<ResponsiveProps, ResponsiveState> {
    static defaultProps: {
        resizeTimeout: number;
    };
    state: {
        width: number;
        height: number;
        left: number;
        top: number;
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
    handleWindowScroll: () => void;
    handleWindowResizeTimeout: () => void;
    handleResize: (state: {
        width: number;
        height: number;
        left?: number | undefined;
        top?: number | undefined;
    }) => void;
    afterResize: () => void;
    render(): React.ReactElement<any> | React.ReactElement<any>[] | (string & ResponsiveRenderer) | (number & ResponsiveRenderer) | (true & ResponsiveRenderer) | (false & ResponsiveRenderer) | ((string | number | boolean | any[] | React.ReactElement<any>)[] & ResponsiveRenderer) | (React.ReactPortal & ResponsiveRenderer);
}
