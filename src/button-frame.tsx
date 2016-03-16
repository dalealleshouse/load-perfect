interface IButtonFrameProperties {
    selectedNumbers: number[];
    correct: boolean;
    checkAnswer(): void;
    acceptAnswer(): void;
    redraw(): void;
    redraws: number;
    foo?: string;
}

export class ButtonFrame extends React.Component<IButtonFrameProperties, {}> {
    render() {
        let button: JSX.Element = null;

        switch (this.props.correct) {
            case true:
                button = (<button className="btn btn-success btn-lg" onClick={this.props.acceptAnswer}>
                    <span className="glyphicon glyphicon-ok"></span>
                </button>);
                break;
            case false:
                button = (<button className="btn btn-danger btn-lg">
                    <span className="glyphicon glyphicon-remove"></span>
                </button>);
                break;
            default:
                button = (<button className="btn btn-primary btn-lg" onClick={this.props.checkAnswer} disabled={!this.props.selectedNumbers.length}>=</button>);
        }

        return (
            <div id="button-frame">
                {button}
                <br />
                <br />
                <button className="btn btn-warning btn-xs" onClick={this.props.redraw} disabled={this.props.redraws === 0}>
                    <span className="glyphicon glyphicon-refresh"></span>&nbsp; {this.props.redraws}
                </button>
            </div>
        );
    }
}