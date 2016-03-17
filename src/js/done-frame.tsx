import * as React from "react";

interface IDoneFrameProperties {
    doneStatus: string;
    resetGame(): void;
}

export class DoneFrame extends React.Component<IDoneFrameProperties, {}> {
    render() {
        return (
            <div className="well text-center">
                <h2>{this.props.doneStatus}</h2>
                <button className="btn btn-default" onClick={this.props.resetGame}>Play again</button>
            </div>
        );
    }
}
