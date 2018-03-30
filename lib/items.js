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
var ResponsiveItems = /** @class */ (function (_super) {
    __extends(ResponsiveItems, _super);
    function ResponsiveItems() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResponsiveItems.prototype.render = function () {
        var _a = this.props, items = _a.items, renderChildren = _a.children, resizeTimeout = _a.resizeTimeout, rows = _a.rows, minItemWidth = _a.minItemWidth, minItemHeight = _a.minItemHeight, immediate = _a.immediate;
        return (React.createElement(responsive_1.Responsive, { toElement: true, resizeTimeout: resizeTimeout, immediate: immediate, children: function (_a) {
                var width = _a.width, height = _a.height;
                var itemsNum = (rows === true) ?
                    Math.floor(height / minItemHeight) : Math.floor(width / minItemWidth);
                var children = items.slice(0, itemsNum);
                var rest = items.slice(itemsNum);
                return renderChildren({ children: children, restItems: rest });
            } }));
    };
    return ResponsiveItems;
}(React.PureComponent));
exports.ResponsiveItems = ResponsiveItems;
//# sourceMappingURL=items.js.map