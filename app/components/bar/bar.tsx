import * as React from "react";
import { IPlate } from "./../../calculator/plates";
import { Plate } from "./../plate/plate";

import "!style!css!less!./bar.less";
let barLeft = require<string>("./bar-left.png");
let bar = require<string>("./bar.png");
let barRight = require<string>("./bar-right.png");

interface IBarProperties extends React.Props<React.StatelessComponent<IBarProperties>> {
    plates: IPlate[];
}

export const Bar = (props: IBarProperties) => (
    <div className="bar-container">
        <div className="bar-left" style={{ backgroundImage: `url(${barLeft})` }}></div>
        <div className="bar" style={{ backgroundImage: `url(${bar})` }}>
            {props.plates.map((p, i) => (<Plate key={i} plate={p} />)) }
        </div>
        <div className="bar-right" style={{ backgroundImage: `url(${barRight})` }}></div>
    </div>
);