import * as React from "react";
import { IPlate } from "./../../calculator/plates";
import { proportinalWidth, proportinalHeight } from "./../../calculator/proportions";

import "!style!css!less!./plate.less";

interface IPlateProperties extends React.Props<React.StatelessComponent<IPlateProperties>> {
    plate: IPlate;
}

export const Plate = ({ plate }: IPlateProperties) => {
    let s: React.HTMLAttributes = {
        backgroundColor: plate.color,
        width: proportinalWidth(60, 25)(plate),
        height: proportinalHeight(198, 50)(plate)
    };

    return (<div className="plate" style={s}>
        <span className="badge">
            {plate.weight}
        </span>
    </div>);
};