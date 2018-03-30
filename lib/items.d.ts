/// <reference types="react" />
import * as React from 'react';
export declare type ResponsiveItemsProps<Item> = {
    items: Item[];
    resizeTimeout?: number;
    children: (props: {
        children: Item[];
        restItems: Item[];
    }) => any;
    rows?: boolean;
    minItemWidth?: number;
    minItemHeight?: number;
    immediate?: boolean;
};
export declare class ResponsiveItems<Item = any> extends React.PureComponent<ResponsiveItemsProps<Item>> {
    render(): JSX.Element;
}
