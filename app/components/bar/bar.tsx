import * as React from "react";
import { IPlate } from "./../../calculator/plates";
import { Plate } from "./../plate/plate";

import "!style!css!less!./bar.less";

interface IBarProperties {
    plates: IPlate[];
}

export class Bar extends React.Component<IBarProperties, {}> {
    render() {
        return (<div className="bar">
            {this.props.plates.map((p, i) => (<Plate key={i} plate={p} />))}
        </div>);
    }
}