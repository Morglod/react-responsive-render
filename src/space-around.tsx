import * as React from 'react';
import { Responsive } from './responsive';

export enum SpaceAroundStatus {
    Top = 'Top',
    Bottom = 'Bottom',
    LeftTop = 'LeftTop',
    LeftBottom = 'LeftBottom'
}

export type SpaceAroundProps = {
    item?: (status: SpaceAroundStatus, style?: any, hidden?: boolean) => React.ReactElement<any>,
    container?: any,
    children?: any,
    timeout?: number,
    calcStyle?: boolean
}

export type SpaceAroundState = {
    windowWidth: number,
    windowHeight: number,
    itemWidth: number,
    itemHeight: number,
    childrenWidth: number,
    childrenHeight: number,
    childrenX: number,
    childrenY: number,
}

export class SpaceAround extends React.PureComponent<SpaceAroundProps, SpaceAroundState> {
    static defaultProps = {
        timeout: 500
    }

    state = {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        itemWidth: 0,
        itemHeight: 0,
        childrenWidth: 0,
        childrenHeight: 0,
        childrenX: 0,
        childrenY: 0,
    };

    handleChildren = (state: { width: number, height: number, left?: number, top?: number }) => {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            childrenX: state.left || 0,
            childrenY: state.top || 0,
            childrenWidth: state.width,
            childrenHeight: state.height,
        });
    }

    handleItem = (state: { width: number, height: number }) => {
        this.setState({
            itemWidth: state.width,
            itemHeight: state.height
        });
    }

    render() {
        const {
            children,
            item,
            container: Container = 'span',
            timeout,
            calcStyle
        } = this.props;

        const {
            windowWidth,
            windowHeight,
            childrenX,
            childrenY,
            childrenWidth,
            childrenHeight,
            itemWidth,
            itemHeight,
        } = this.state;

        let status: SpaceAroundStatus = SpaceAroundStatus.Bottom;
        let style: any = calcStyle && {
            top: `${childrenHeight}px`,
            left: 0
        };
        let hiddenStatus = false;

        const left = childrenX + childrenWidth + (itemWidth * 0.3) + 20 >= windowWidth;
        const top = childrenY + childrenHeight + (itemHeight * 0.7) + 20 >= windowHeight;

        if (left && top) {
            status = SpaceAroundStatus.LeftTop;
            if (calcStyle) {
                style.top = `${-itemHeight}px`;
                style.left = `${-itemWidth}px`;
            }
        }
        else if (left) {
            status = SpaceAroundStatus.LeftBottom;
            if (calcStyle) {
                style.top = 0;
                style.left = `${-itemWidth}px`;
            }
        }
        else if (top) {
            status = SpaceAroundStatus.Top;
            if (calcStyle) {
                style.top = `${-itemHeight}px`;
                style.left = 0;
            }
        }

        return (
            <Container style={{ position: 'relative' }}>
                <Responsive
                    fast
                    trackPosition
                    toElement
                    resizeTimeout={timeout}
                    onChange={this.handleChildren}
                >
                    {children}
                </Responsive>
                <Responsive
                    fast
                    toElement
                    resizeTimeout={timeout}
                    onChange={this.handleItem}
                >
                    {item ? item(status, style, hiddenStatus) : <span/>}
                </Responsive>
            </Container>
        );
    }
}