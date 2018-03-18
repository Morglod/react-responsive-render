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
var Responsive = /** @class */ (function (_super) {
    __extends(Responsive, _super);
    function Responsive() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            width: 0,
            height: 0,
        };
        _this.timeout = null;
        _this.animationFrameRequest = null;
        _this.elementResizeTimeout = function () {
            if (_this.animationFrameRequest)
                cancelAnimationFrame(_this.animationFrameRequest);
            _this.animationFrameRequest = requestAnimationFrame(_this.frameRequest);
        };
        _this.frameRequest = function () {
            var styles = window.getComputedStyle(ReactDOM.findDOMNode(_this));
            var width = parseFloat(styles.width || '0');
            var height = parseFloat(styles.height || '0');
            if (width !== _this.state.width || height !== _this.state.height) {
                _this.handleResize({
                    width: width,
                    height: height
                });
            }
        };
        _this.handleWindowResize = function () {
            if (_this.timeout)
                clearTimeout(_this.timeout);
            _this.timeout = setTimeout(_this.handleWindowResizeTimeout, _this.props.resizeTimeout);
        };
        _this.handleWindowResizeTimeout = function () {
            _this.handleResize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        _this.handleResize = function (state) {
            _this.setState(state);
        };
        return _this;
    }
    Responsive.prototype.componentWillMount = function () {
        var toElement = this.props.toElement;
        var toWindow = !toElement;
        if (toWindow) {
            this.state.width = window.innerWidth;
            this.state.height = window.innerHeight;
            window.addEventListener('resize', this.handleWindowResize);
        }
        else {
            this.timeout = setInterval(this.elementResizeTimeout, this.props.resizeTimeout);
        }
    };
    Responsive.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.handleWindowResize);
        if (this.props.toElement)
            clearInterval(this.timeout);
        else
            clearTimeout(this.timeout);
    };
    Responsive.prototype.render = function () {
        var _a = this.props, children = _a.children, toElement = _a.toElement;
        return children ? children(this.state) : null;
    };
    Responsive.defaultProps = {
        resizeTimeout: RESIZE_DEFAULT_TIMEOUT_MS,
    };
    return Responsive;
}(React.Component));
exports.Responsive = Responsive;
//# sourceMappingURL=index.js.map