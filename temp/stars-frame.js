"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StarsFrame = (function (_super) {
    __extends(StarsFrame, _super);
    function StarsFrame() {
        _super.apply(this, arguments);
    }
    StarsFrame.prototype.render = function () {
        var stars = Array.apply(null, Array(this.props.numberOfStars))
            .map(function (n, i) { return (React.createElement("span", {key: i, className: "glyphicon glyphicon-star"})); });
        return (React.createElement("div", {id: "stars-frame"}, React.createElement("div", {className: "well"}, stars)));
    };
    return StarsFrame;
}(React.Component));
exports.StarsFrame = StarsFrame;
