"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var done_frame_1 = require("./done-frame");
var numbers_frame_1 = require("./numbers-frame");
var stars_frame_1 = require("./stars-frame");
var button_frame_1 = require("./button-frame");
var answer_frame_1 = require("./answer-frame");
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = this;
        _super.call(this);
        this.selectNumber = function (num) {
            if (_this.state.selectedNumbers.contains(num) || _this.state.usedNumbers.contains(num))
                return;
            _this.setState({
                selectedNumbers: _this.state.selectedNumbers.concat([num]),
                correct: null
            });
        };
        this.unselectNumber = function (num) {
            _this.setState({
                selectedNumbers: _this.state.selectedNumbers.remove(num),
                correct: null
            });
        };
        this.acceptAnswer = function () {
            _this.setState({
                selectedNumbers: [],
                usedNumbers: _this.state.usedNumbers.concat(_this.state.selectedNumbers),
                numberOfStars: _this.getRandomNumber(),
                correct: null
            }, _this.updateDoneStatus);
        };
        this.checkAnswer = function () {
            var sumOfSelected = _this.state.selectedNumbers.reduce(function (i, n) { return i + n; }, 0);
            var correct = sumOfSelected === _this.state.numberOfStars;
            _this.setState({
                correct: correct
            });
        };
        this.redraw = function () {
            if (_this.state.redraws === 0)
                return;
            _this.setState({
                selectedNumbers: [],
                numberOfStars: _this.getRandomNumber(),
                correct: null,
                redraws: _this.state.redraws - 1
            }, _this.updateDoneStatus);
        };
        this.updateDoneStatus = function () {
            if (_this.state.usedNumbers.length === 9) {
                _this.setState({ doneStatus: "You Won!" });
                return;
            }
            if (_this.state.redraws === 0 && !_this.hasPossibleSolutions()) {
                _this.setState({ doneStatus: "Game Over, Loser!" });
            }
        };
        this.resetGame = function () {
            _this.setState({
                selectedNumbers: [],
                usedNumbers: [],
                numberOfStars: _this.getRandomNumber(),
                correct: null,
                redraws: 5,
                doneStatus: null
            });
        };
        var numberOfStars = this.getRandomNumber();
        this.state = {
            selectedNumbers: [],
            usedNumbers: [],
            numberOfStars: numberOfStars,
            correct: null,
            redraws: 5,
            doneStatus: null
        };
    }
    Game.prototype.render = function () {
        var _a = this.state, numberOfStars = _a.numberOfStars, selectedNumbers = _a.selectedNumbers, usedNumbers = _a.usedNumbers, correct = _a.correct, redraws = _a.redraws, doneStatus = _a.doneStatus;
        var bottomFrame = (doneStatus) ?
            (React.createElement(done_frame_1.DoneFrame, {doneStatus: doneStatus, resetGame: this.resetGame})) :
            (React.createElement(numbers_frame_1.NumbersFrame, {selectedNumbers: selectedNumbers, usedNumbers: usedNumbers, selectNumber: this.selectNumber}));
        return (React.createElement("div", {id: "game"}, React.createElement("h2", null, "Play Nine"), React.createElement("hr", null), React.createElement("div", {className: "clearFix"}, React.createElement(stars_frame_1.StarsFrame, {numberOfStars: numberOfStars}), React.createElement(button_frame_1.ButtonFrame, {selectedNumbers: selectedNumbers, correct: correct, checkAnswer: this.checkAnswer, acceptAnswer: this.acceptAnswer, redraw: this.redraw, redraws: redraws}), React.createElement(answer_frame_1.AnswerFrame, {selectedNumbers: selectedNumbers, unselectNumber: this.unselectNumber})), bottomFrame));
    };
    Game.prototype.hasPossibleSolutions = function () {
        var numberOfStars = this.state.numberOfStars;
        var possibleNumbers = this.getPossibleNumbers();
        return this.possibleCombinationSum(possibleNumbers, numberOfStars);
    };
    Game.prototype.getPossibleNumbers = function () {
        var _this = this;
        return Array.apply(null, Array(9))
            .map(function (n, i) { return i + 1; })
            .filter(function (i) { return !_this.state.usedNumbers.contains(i); });
    };
    Game.prototype.getRandomNumber = function () {
        return Math.floor(Math.random() * 9) + 1;
    };
    Game.prototype.possibleCombinationSum = function (arr, n) {
        if (arr.indexOf(n) >= 0) {
            return true;
        }
        if (arr[0] > n) {
            return false;
        }
        if (arr[arr.length - 1] > n) {
            arr.pop();
            return this.possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize);
        for (var i = 1; i < combinationsCount; i++) {
            var combinationSum = 0;
            for (var j = 0; j < listSize; j++) {
                if (i & (1 << j)) {
                    combinationSum += arr[j];
                }
            }
            if (n === combinationSum) {
                return true;
            }
        }
        return false;
    };
    ;
    return Game;
}(React.Component));
exports.Game = Game;
