"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DoneFrame = (function (_super) {
    __extends(DoneFrame, _super);
    function DoneFrame() {
        _super.apply(this, arguments);
    }
    DoneFrame.prototype.render = function () {
        return (React.createElement("div", {className: "well text-center"}, React.createElement("h2", null, this.props.doneStatus), React.createElement("button", {className: "btn btn-default", onClick: this.props.resetGame}, "Play again")));
    };
    return DoneFrame;
}(React.Component));
exports.DoneFrame = DoneFrame;
