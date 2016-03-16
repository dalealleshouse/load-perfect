namespace app.game {
    interface IAnswerFrameProperties {
        selectedNumbers: number[];
        unselectNumber(num: number): void;
    }

    export class AnswerFrame extends React.Component<IAnswerFrameProperties, {}> {
        render() {
            let numbers = this.props
                .selectedNumbers
                .map((i) => (
                    <span key={i}
                        onClick={this.props.unselectNumber.bind(null, i) }>
                        {i}
                    </span>));

            return (
                <div id="answer-frame">
                    <div className="well">
                        {numbers}
                    </div>
                </div>
            );
        }
    }
}