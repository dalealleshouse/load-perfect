namespace app.game {
    interface IStarsFrameProperties {
        numberOfStars: number;
    }

    export class StarsFrame extends React.Component<IStarsFrameProperties, {}> {
        constructor() {
            super();
        }

        render() {
            // nifty hack to make a repeater that can be mapped over
            let stars = Array.apply(null, Array(this.props.numberOfStars))
                .map((n, i) => (<span key={i} className="glyphicon glyphicon-star"></span>));

            return (
                <div id="stars-frame">
                    <div className="well">
                        {stars}
                    </div>
                </div>
            );
        }
    }
}