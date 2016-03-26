import * as React from "react";
import { IPlate } from "./../../logic/calculator/plates";
import { proportinalWidth, proportinalHeight } from "./../../logic/calculator/proportions";

import "!style!css!less!./plate.less";

interface IPlateProperties {
    plate: IPlate;
}

export class Plate extends React.Component<IPlateProperties, {}> {
    render() {
        let s: React.HTMLAttributes = {
            backgroundColor: this.props.plate.color,
            width: proportinalWidth(this.props.plate, 60, 25),
            height: proportinalHeight(this.props.plate, 198, 50)
        };

        return (<div className="plate" style={s}>
            <span className="badge">
                {this.props.plate.weight}
            </span>
        </div>);
    }
}