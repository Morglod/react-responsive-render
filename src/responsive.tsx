import * as React from 'react';
import * as ReactDOM from 'react-dom';

const RESIZE_DEFAULT_TIMEOUT_MS = 63;

export type ResponsiveRenderer =
    (state: { width: number, height: number }) => React.ReactElement<any>;

export type ResponsiveProps = {
    children: ResponsiveRenderer | React.ReactElement<any> | React.ReactElement<any>[],
    toElement?: boolean,
    resizeTimeout?: number,
    onChange?: (state: { width: number, height: number }) => any,
}

export type ResponsiveState = {
    width: number,
    height: number,
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
    };

    timeout: any = null;
    animationFrameRequest: any = null;

    componentWillReceiveProps(nextProps: ResponsiveProps) {
        if (this.props.toElement !== nextProps.toElement || this.props.resizeTimeout !== nextProps.resizeTimeout) {
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
        const { toElement } = props;
        const toWindow = !toElement;

        if (toWindow) {
            this.state.width = window.innerWidth;
            this.state.height = window.innerHeight;
            window.addEventListener('resize', this.handleWindowResize);
        } else {
            this.timeout = setInterval(this.elementResizeTimeout, this.props.resizeTimeout);
        }
    };

    shutdown = () => {
        window.removeEventListener('resize', this.handleWindowResize);
        if (this.props.toElement) clearInterval(this.timeout);
        else clearTimeout(this.timeout);
    };

    elementResizeTimeout = () => {
        if (this.animationFrameRequest) cancelAnimationFrame(this.animationFrameRequest);
        this.animationFrameRequest = requestAnimationFrame(this.frameRequest);
    };

    frameRequest = () => {
        const styles = window.getComputedStyle(ReactDOM.findDOMNode(this));
        const width = parseFloat(styles.width || '0');
        const height = parseFloat(styles.height || '0');

        if (width !== this.state.width || height !== this.state.height) {
            this.handleResize({
                width,
                height
            });
        }
    };

    handleWindowResize = () => {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(this.handleWindowResizeTimeout, this.props.resizeTimeout);
    };

    handleWindowResizeTimeout = () => {
        this.handleResize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    handleResize = (state: { width: number, height: number }) => {
        this.setState(state, this.afterResize);
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