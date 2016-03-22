import * as React from "react";
import { IPlate, proportinalWidth, proportinalHeight } from "./../../calculator/plates";

import "!style!css!less!./plate.less";

interface IPlateProperties {
    plate: IPlate;
}

export class Plate extends React.Component<IPlateProperties, {}> {
    render() {
        let s: React.HTMLAttributes = {
            backgroundColor: this.props.plate.color,
            width: proportinalWidth(this.props.plate, 60, 25),
            height: proportinalHeight(this.props.plate)
        };

        return (<div className="plate" style={s}>
            <span>
                {this.props.plate.weight}
            </span>
        </div>);
    }
}