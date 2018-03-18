import * as React from 'react';
import * as ReactDOM from 'react-dom';

const RESIZE_DEFAULT_TIMEOUT_MS = 63;

export type ResponsiveRenderer =
    ({ width, height }: { width: number, height: number }) => React.ReactElement<any>;

export type ResponsiveProps = {
    children: ResponsiveRenderer,
    toElement?: boolean,
    resizeTimeout?: number,
}

export type ResponsiveState = {
    width: number,
    height: number,
}

export class Responsive extends React.Component<ResponsiveProps, ResponsiveState> {
    static defaultProps = {
        resizeTimeout: RESIZE_DEFAULT_TIMEOUT_MS,
    }

    state = {
        width: 0,
        height: 0,
    };

    timeout: any = null;
    animationFrameRequest: any = null;

    componentWillMount() {
        const { toElement } = this.props;
        const toWindow = !toElement;

        if (toWindow) {
            this.state.width = window.innerWidth;
            this.state.height = window.innerHeight;
            window.addEventListener('resize', this.handleWindowResize);
        } else {
            this.timeout = setInterval(this.elementResizeTimeout, this.props.resizeTimeout);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        if (this.props.toElement) clearInterval(this.timeout);
        else clearTimeout(this.timeout);
    }

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
        this.setState(state);
    };

    render() {
        const { children, toElement } = this.props;
        return children ? children(this.state) : null;
    }
}