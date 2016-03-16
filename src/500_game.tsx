namespace app.game {
    interface IGameState {
        numberOfStars?: number;
        selectedNumbers?: number[];
        usedNumbers?: number[];
        correct?: boolean;
        redraws?: number;
        doneStatus?: string;
    }

    export class Game extends React.Component<{}, IGameState> {
        constructor() {
            super();

            let numberOfStars = this.getRandomNumber();
            this.state = {
                selectedNumbers: [],
                usedNumbers: [],
                numberOfStars: numberOfStars,
                correct: null,
                redraws: 5,
                doneStatus: null
            };
        }

        selectNumber = (num: number) => {
            if (this.state.selectedNumbers.contains(num) || this.state.usedNumbers.contains(num))
                return;

            this.setState({
                selectedNumbers: this.state.selectedNumbers.concat(num),
                correct: null
            });
        };

        unselectNumber = (num: number) => {
            this.setState({
                selectedNumbers: this.state.selectedNumbers.remove(num),
                correct: null
            });
        };

        acceptAnswer = () => {
            this.setState({
                selectedNumbers: [],
                usedNumbers: this.state.usedNumbers.concat(this.state.selectedNumbers),
                numberOfStars: this.getRandomNumber(),
                correct: null
            }, this.updateDoneStatus);
        };

        checkAnswer = () => {
            let sumOfSelected = this.state.selectedNumbers.reduce((i, n) => i + n, 0);
            let correct = sumOfSelected === this.state.numberOfStars;

            this.setState({
                correct: correct
            });
        };

        redraw = () => {
            if (this.state.redraws === 0)
                return;

            this.setState({
                selectedNumbers: [],
                numberOfStars: this.getRandomNumber(),
                correct: null,
                redraws: this.state.redraws - 1
            }, this.updateDoneStatus);
        };

        updateDoneStatus = () => {
            if (this.state.usedNumbers.length === 9) {
                this.setState({ doneStatus: "You Won!" });
                return;
            }

            if (this.state.redraws === 0 && !this.hasPossibleSolutions()) {
                this.setState({ doneStatus: "Game Over, Loser!" });
            }
        };

        resetGame = () => {
            this.setState({
                selectedNumbers: [],
                usedNumbers: [],
                numberOfStars: this.getRandomNumber(),
                correct: null,
                redraws: 5,
                doneStatus: null
            });
        };

        render() {
            let numberOfStars = this.state.numberOfStars;
            let selectedNumbers = this.state.selectedNumbers;
            let usedNumbers = this.state.usedNumbers;
            let correct = this.state.correct;
            let redraws = this.state.redraws;
            let doneStatus = this.state.doneStatus;

            let bottomFrame: JSX.Element = (doneStatus) ?
                (<DoneFrame doneStatus={doneStatus}
                    resetGame={this.resetGame} />) :
                (<NumbersFrame selectedNumbers={selectedNumbers}
                    usedNumbers={usedNumbers}
                    selectNumber={this.selectNumber} />);


            return (
                <div id="game">
                    <h2>Play Nine</h2>
                    <hr />
                    <div className="clearFix">
                        <StarsFrame numberOfStars={numberOfStars} />
                        <ButtonFrame selectedNumbers={selectedNumbers}
                            correct={correct}
                            checkAnswer={this.checkAnswer}
                            acceptAnswer={this.acceptAnswer}
                            redraw={this.redraw}
                            redraws={redraws} />
                        <AnswerFrame selectedNumbers={selectedNumbers}
                            unselectNumber={this.unselectNumber}/>
                    </div>

                    {bottomFrame}
                </div>
            );
        }

        private hasPossibleSolutions() {
            let numberOfStars = this.state.numberOfStars;
            let possibleNumbers = this.getPossibleNumbers();
            return this.possibleCombinationSum(possibleNumbers, numberOfStars);
        }

        private getPossibleNumbers() {
            return Array.apply(null, Array(9))
                .map((n, i) => i + 1)
                .filter(i => !this.state.usedNumbers.contains(i));
        }

        private getRandomNumber() {
            return Math.floor(Math.random() * 9) + 1;
        }

        private possibleCombinationSum(arr: number[], n: number) {
            if (arr.indexOf(n) >= 0) { return true; }
            if (arr[0] > n) { return false; }
            if (arr[arr.length - 1] > n) {
                arr.pop();
                return this.possibleCombinationSum(arr, n);
            }
            let listSize = arr.length, combinationsCount = (1 << listSize);
            for (let i = 1; i < combinationsCount; i++) {
                let combinationSum = 0;
                for (let j = 0; j < listSize; j++) {
                    if (i & (1 << j)) { combinationSum += arr[j]; }
                }
                if (n === combinationSum) { return true; }
            }
            return false;
        };
    }
}