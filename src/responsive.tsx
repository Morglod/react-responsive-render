import * as React from 'react';
import * as ReactDOM from 'react-dom';

const RESIZE_DEFAULT_TIMEOUT_MS = 63;

export type ResponsiveRenderer =
    (state: { width: number, height: number }) => React.ReactElement<any>;

export type ResponsiveProps = {
    children: ResponsiveRenderer | React.ReactElement<any> | React.ReactElement<any>[],
    toElement?: boolean,
    resizeTimeout?: number,
    /**
     * window position is scroll  
     * element's position relative to screen
     */
    trackPosition?: boolean,
    onChange?: (state: { width: number, height: number, left?: number, top?: number }) => any,
}

export type ResponsiveState = {
    width: number,
    height: number,
    left: number,
    top: number,
}

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
export class Responsive extends React.PureComponent<ResponsiveProps, ResponsiveState> {
    static defaultProps = {
        resizeTimeout: RESIZE_DEFAULT_TIMEOUT_MS,
    }

    state = {
        width: 0,
        height: 0,
        left: 0,
        top: 0
    };

    timeout: any = null;
    animationFrameRequest: any = null;

    componentWillReceiveProps(nextProps: ResponsiveProps) {
        if (this.props.toElement !== nextProps.toElement || this.props.resizeTimeout !== nextProps.resizeTimeout || this.props.trackPosition !== nextProps.trackPosition) {
            this.shutdown();
            this.setup(nextProps);
            this.forceUpdate();
        }
    }

    componentWillMount() {
        this.setup();
    }

    componentWillUnmount() {
        this.shutdown();
    }

    setup = (props: ResponsiveProps = this.props) => {
        const { toElement, trackPosition } = props;
        const toWindow = !toElement;

        if (toWindow) {
            this.state.width = window.innerWidth;
            this.state.height = window.innerHeight;
            this.state.left = window.scrollX;
            this.state.top = window.scrollY;
            window.addEventListener('resize', this.handleWindowResize);
            if (trackPosition) window.addEventListener('scroll', this.handleWindowScroll);
        } else {
            this.timeout = setInterval(this.elementResizeTimeout, this.props.resizeTimeout);
        }
    };

    shutdown = () => {
        window.removeEventListener('resize', this.handleWindowResize);
        window.removeEventListener('scroll', this.handleWindowScroll);
        if (this.props.toElement) clearInterval(this.timeout);
        else clearTimeout(this.timeout);
    };

    elementResizeTimeout = () => {
        if (this.animationFrameRequest) cancelAnimationFrame(this.animationFrameRequest);
        this.animationFrameRequest = requestAnimationFrame(this.frameRequest);
    };

    frameRequest = () => {
        const node = ReactDOM.findDOMNode(this);
        const styles = window.getComputedStyle(node);
        const width = parseFloat(styles.width || '0');
        const height = parseFloat(styles.height || '0');

        if (this.props.trackPosition) {
            const { left, top } = node.getBoundingClientRect();
            if (width !== this.state.width ||
                height !== this.state.height ||
                left !== this.state.left ||
                top !== this.state.top
            ) {
                this.handleResize({
                    width,
                    height,
                    left,
                    top
                });
            }
        } else {
            if (width !== this.state.width || height !== this.state.height) {
                this.handleResize({
                    width,
                    height
                });
            }
        }
    };

    handleWindowResize = () => {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(this.handleWindowResizeTimeout, this.props.resizeTimeout);
    };

    handleWindowScroll = () => {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(this.handleWindowResizeTimeout, this.props.resizeTimeout);
    };

    handleWindowResizeTimeout = () => {
        this.handleResize({
            width: window.innerWidth,
            height: window.innerHeight,
            left: window.scrollX,
            top: window.scrollY
        });
    };

    handleResize = (state: { width: number, height: number, left?: number, top?: number }) => {
        this.setState(state as any, this.afterResize);
    };

    afterResize = () => {
        if (this.props.onChange)
            this.props.onChange(this.state);
    };

    render() {
        const { children, toElement } = this.props;
        return typeof children === 'function' ? children(this.state) : children;
    }
}