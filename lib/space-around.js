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
var responsive_1 = require("./responsive");
var SpaceAroundStatus;
(function (SpaceAroundStatus) {
    SpaceAroundStatus["Top"] = "Top";
    SpaceAroundStatus["Bottom"] = "Bottom";
    SpaceAroundStatus["LeftTop"] = "LeftTop";
    SpaceAroundStatus["LeftBottom"] = "LeftBottom";
})(SpaceAroundStatus = exports.SpaceAroundStatus || (exports.SpaceAroundStatus = {}));
var SpaceAround = /** @class */ (function (_super) {
    __extends(SpaceAround, _super);
    function SpaceAround() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            itemWidth: 0,
            itemHeight: 0,
            childrenWidth: 0,
            childrenHeight: 0,
            childrenX: 0,
            childrenY: 0,
        };
        _this.handleChildren = function (state) {
            _this.setState({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
                childrenX: state.left || 0,
                childrenY: state.top || 0,
                childrenWidth: state.width,
                childrenHeight: state.height,
            });
        };
        _this.handleItem = function (state) {
            _this.setState({
                itemWidth: state.width,
                itemHeight: state.height
            });
        };
        return _this;
    }
    SpaceAround.prototype.render = function () {
        var _a = this.props, children = _a.children, item = _a.item, _b = _a.container, Container = _b === void 0 ? 'span' : _b, timeout = _a.timeout, calcStyle = _a.calcStyle;
        var _c = this.state, windowWidth = _c.windowWidth, windowHeight = _c.windowHeight, childrenX = _c.childrenX, childrenY = _c.childrenY, childrenWidth = _c.childrenWidth, childrenHeight = _c.childrenHeight, itemWidth = _c.itemWidth, itemHeight = _c.itemHeight;
        var status = SpaceAroundStatus.Bottom;
        var style = calcStyle && {
            top: childrenHeight + "px",
            left: 0
        };
        var hiddenStatus = false;
        var left = childrenX + childrenWidth + (itemWidth * 0.3) + 20 >= windowWidth;
        var top = childrenY + childrenHeight + (itemHeight * 0.7) + 20 >= windowHeight;
        if (left && top) {
            status = SpaceAroundStatus.LeftTop;
            if (calcStyle) {
                style.top = -itemHeight + "px";
                style.left = -itemWidth + "px";
            }
        }
        else if (left) {
            status = SpaceAroundStatus.LeftBottom;
            if (calcStyle) {
                style.top = 0;
                style.left = -itemWidth + "px";
            }
        }
        else if (top) {
            status = SpaceAroundStatus.Top;
            if (calcStyle) {
                style.top = -itemHeight + "px";
                style.left = 0;
            }
        }
        return (React.createElement(Container, { style: { position: 'relative' } },
            React.createElement(responsive_1.Responsive, { fast: true, trackPosition: true, toElement: true, resizeTimeout: timeout, onChange: this.handleChildren, immediate: this.props.immediate }, children),
            React.createElement(responsive_1.Responsive, { fast: true, toElement: true, resizeTimeout: timeout, onChange: this.handleItem, immediate: this.props.immediate }, item ? item(status, style, hiddenStatus) : React.createElement("span", null))));
    };
    SpaceAround.defaultProps = {
        timeout: 500
    };
    return SpaceAround;
}(React.PureComponent));
exports.SpaceAround = SpaceAround;
//# sourceMappingURL=space-around.js.map