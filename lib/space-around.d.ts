/// <reference types="react" />
import * as React from 'react';
export declare enum SpaceAroundStatus {
    Top = "Top",
    Bottom = "Bottom",
    LeftTop = "LeftTop",
    LeftBottom = "LeftBottom",
}
export declare type SpaceAroundProps = {
    item?: (status: SpaceAroundStatus, style?: any, hidden?: boolean) => React.ReactElement<any>;
    container?: any;
    children?: any;
    timeout?: number;
    calcStyle?: boolean;
};
export declare type SpaceAroundState = {
    windowWidth: number;
    windowHeight: number;
    itemWidth: number;
    itemHeight: number;
    childrenWidth: number;
    childrenHeight: number;
    childrenX: number;
    childrenY: number;
};
export declare class SpaceAround extends React.PureComponent<SpaceAroundProps, SpaceAroundState> {
    static defaultProps: {
        timeout: number;
    };
    state: {
        windowWidth: number;
        windowHeight: number;
        itemWidth: number;
        itemHeight: number;
        childrenWidth: number;
        childrenHeight: number;
        childrenX: number;
        childrenY: number;
    };
    handleChildren: (state: {
        width: number;
        height: number;
        left?: number | undefined;
        top?: number | undefined;
    }) => void;
    handleItem: (state: {
        width: number;
        height: number;
    }) => void;
    render(): JSX.Element;
}
