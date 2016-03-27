import * as React from "react";
import { IPlate } from "./../../calculator/plates";
import { proportinalWidth, proportinalHeight } from "./../../calculator/proportions";

import "!style!css!less!./plate.less";

interface IPlateProperties {
    plate: IPlate;
}

export class Plate extends React.Component<IPlateProperties, {}> {
    render() {
        let s: React.HTMLAttributes = {
            backgroundColor: this.props.plate.color,
            width: proportinalWidth(60, 25)(this.props.plate),
            height: proportinalHeight(198, 50)(this.props.plate)
        };

        return (<div className="plate" style={s}>
            <span className="badge">
                {this.props.plate.weight}
            </span>
        </div>);
    }
}