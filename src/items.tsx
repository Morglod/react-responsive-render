import * as React from 'react';

import { Responsive } from './responsive';

export type ResponsiveItemsProps<Item> = {
    items: Item[],
    resizeTimeout?: number,
    children: (props: { children: Item[], restItems: Item[] }) => any,
    rows?: boolean,
    minItemWidth?: number,
    minItemHeight?: number,
    immediate?: boolean
}

export class ResponsiveItems<Item = any> extends React.PureComponent<ResponsiveItemsProps<Item>> {
    render() {
        const {
            items,
            children: renderChildren,
            resizeTimeout,
            rows,
            minItemWidth,
            minItemHeight,
            immediate
        } = this.props;

        return (
            <Responsive
                toElement
                resizeTimeout={resizeTimeout}
                immediate={immediate}
                children={({ width, height }) => {
                    const itemsNum = (rows === true) ?
                        Math.floor(height / minItemHeight!) : Math.floor(width / minItemWidth!);

                    const children = items.slice(0, itemsNum);
                    const rest = items.slice(itemsNum);

                    return renderChildren({ children, restItems: rest });
                }}
            />
        );
    }
}