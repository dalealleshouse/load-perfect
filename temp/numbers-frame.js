"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NumbersFrame = (function (_super) {
    __extends(NumbersFrame, _super);
    function NumbersFrame() {
        _super.apply(this, arguments);
    }
    NumbersFrame.prototype.render = function () {
        var _this = this;
        var numbers = Array.apply(null, Array(9))
            .map(function (n, i) { return i + 1; })
            .map(function (i) { return (React.createElement("div", {key: i, onClick: _this.props.selectNumber.bind(null, i), className: _this.getNumberClassName(_this.props.selectedNumbers, _this.props.usedNumbers, i)}, i)); });
        return (React.createElement("div", {id: "numbers-frame"}, React.createElement("div", {className: "well"}, numbers)));
    };
    NumbersFrame.prototype.getNumberClassName = function (selectedNumbers, usedNumbers, num) {
        return "number selected-" + selectedNumbers.contains(num) + " used-" + usedNumbers.contains(num);
    };
    return NumbersFrame;
}(React.Component));
exports.NumbersFrame = NumbersFrame;
