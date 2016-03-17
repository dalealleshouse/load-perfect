"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ButtonFrame = (function (_super) {
    __extends(ButtonFrame, _super);
    function ButtonFrame() {
        _super.apply(this, arguments);
    }
    ButtonFrame.prototype.render = function () {
        var button = null;
        switch (this.props.correct) {
            case true:
                button = (React.createElement("button", {className: "btn btn-success btn-lg", onClick: this.props.acceptAnswer}, React.createElement("span", {className: "glyphicon glyphicon-ok"})));
                break;
            case false:
                button = (React.createElement("button", {className: "btn btn-danger btn-lg"}, React.createElement("span", {className: "glyphicon glyphicon-remove"})));
                break;
            default:
                button = (React.createElement("button", {className: "btn btn-primary btn-lg", onClick: this.props.checkAnswer, disabled: !this.props.selectedNumbers.length}, "="));
        }
        return (React.createElement("div", {id: "button-frame"}, button, React.createElement("br", null), React.createElement("br", null), React.createElement("button", {className: "btn btn-warning btn-xs", onClick: this.props.redraw, disabled: this.props.redraws === 0}, React.createElement("span", {className: "glyphicon glyphicon-refresh"}), "  ", this.props.redraws)));
    };
    return ButtonFrame;
}(React.Component));
exports.ButtonFrame = ButtonFrame;
