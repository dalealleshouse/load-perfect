"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AnswerFrame = (function (_super) {
    __extends(AnswerFrame, _super);
    function AnswerFrame() {
        _super.apply(this, arguments);
    }
    AnswerFrame.prototype.render = function () {
        var _this = this;
        var numbers = this.props
            .selectedNumbers
            .map(function (i) { return (React.createElement("span", {key: i, onClick: _this.props.unselectNumber.bind(null, i)}, i)); });
        return (React.createElement("div", {id: "answer-frame"}, React.createElement("div", {className: "well"}, numbers)));
    };
    return AnswerFrame;
}(React.Component));
exports.AnswerFrame = AnswerFrame;
