"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var RESIZE_DEFAULT_TIMEOUT_MS = 63;
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
var Responsive = /** @class */ (function (_super) {
    __extends(Responsive, _super);
    function Responsive() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            width: 0,
            height: 0,
            left: 0,
            top: 0
        };
        _this.timeout = null;
        _this.animationFrameRequest = null;
        _this.setup = function (props) {
            if (props === void 0) { props = _this.props; }
            var toElement = props.toElement, trackPosition = props.trackPosition;
            var toWindow = !toElement;
            if (toWindow) {
                _this.state.width = window.innerWidth;
                _this.state.height = window.innerHeight;
                _this.state.left = window.scrollX;
                _this.state.top = window.scrollY;
                window.addEventListener('resize', _this.handleWindowResize);
                if (trackPosition)
                    window.addEventListener('scroll', _this.handleWindowScroll);
            }
            else {
                _this.timeout = setInterval(_this.elementResizeTimeout, _this.props.resizeTimeout);
            }
        };
        _this.shutdown = function () {
            window.removeEventListener('resize', _this.handleWindowResize);
            window.removeEventListener('scroll', _this.handleWindowScroll);
            if (_this.props.toElement)
                clearInterval(_this.timeout);
            else
                clearTimeout(_this.timeout);
        };
        _this.elementResizeTimeout = function () {
            if (_this.animationFrameRequest)
                cancelAnimationFrame(_this.animationFrameRequest);
            _this.animationFrameRequest = requestAnimationFrame(_this.frameRequest);
        };
        _this.frameRequest = function () {
            var node = ReactDOM.findDOMNode(_this);
            var styles = window.getComputedStyle(node);
            var width = parseFloat(styles.width || '0');
            var height = parseFloat(styles.height || '0');
            if (_this.props.trackPosition) {
                var _a = node.getBoundingClientRect(), left = _a.left, top_1 = _a.top;
                if (width !== _this.state.width ||
                    height !== _this.state.height ||
                    left !== _this.state.left ||
                    top_1 !== _this.state.top) {
                    _this.handleResize({
                        width: width,
                        height: height,
                        left: left,
                        top: top_1
                    });
                }
            }
            else {
                if (width !== _this.state.width || height !== _this.state.height) {
                    _this.handleResize({
                        width: width,
                        height: height
                    });
                }
            }
        };
        _this.handleWindowResize = function () {
            if (_this.timeout)
                clearTimeout(_this.timeout);
            _this.timeout = setTimeout(_this.handleWindowResizeTimeout, _this.props.resizeTimeout);
        };
        _this.handleWindowScroll = function () {
            if (_this.timeout)
                clearTimeout(_this.timeout);
            _this.timeout = setTimeout(_this.handleWindowResizeTimeout, _this.props.resizeTimeout);
        };
        _this.handleWindowResizeTimeout = function () {
            _this.handleResize({
                width: window.innerWidth,
                height: window.innerHeight,
                left: window.scrollX,
                top: window.scrollY
            });
        };
        _this.handleResize = function (state) {
            _this.setState(state, _this.afterResize);
        };
        _this.afterResize = function () {
            if (_this.props.onChange)
                _this.props.onChange(_this.state);
        };
        return _this;
    }
    Responsive.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.toElement !== nextProps.toElement || this.props.resizeTimeout !== nextProps.resizeTimeout || this.props.trackPosition !== nextProps.trackPosition) {
            this.shutdown();
            this.setup(nextProps);
            this.forceUpdate();
        }
    };
    Responsive.prototype.componentWillMount = function () {
        this.setup();
    };
    Responsive.prototype.componentWillUnmount = function () {
        this.shutdown();
    };
    Responsive.prototype.render = function () {
        var _a = this.props, children = _a.children, toElement = _a.toElement;
        return typeof children === 'function' ? children(this.state) : children;
    };
    Responsive.defaultProps = {
        resizeTimeout: RESIZE_DEFAULT_TIMEOUT_MS,
    };
    return Responsive;
}(React.PureComponent));
exports.Responsive = Responsive;
//# sourceMappingURL=responsive.js.map