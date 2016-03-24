import * as React from "react";
import { IPlate } from "./../../calculator/plates";
import { Bar } from "./../bar/bar";
import { calculatePlates, IPlateCalculation } from "./../../calculator/plate-calculator";
import { defaultLbsWeightTree, defaultKiloWeightTree } from  "./../../calculator/plates";

interface IBarLoaderState {
    calculation?: IPlateCalculation;
    barWeight?: number;
    desiredWeight?: number;
}

export class BarLoader extends React.Component<{}, IBarLoaderState> {
    constructor() {
        super();
        this.state = {
            calculation: { plates: [], actualWeight: 0, requestedWeight: 0 },
            barWeight: 45
        };
    }

    loadBar = (barWeight: number, desiredWeight: number) => {
        let calcResult = calculatePlates(defaultLbsWeightTree, barWeight, desiredWeight);
        this.setState({ barWeight: barWeight, desiredWeight: desiredWeight, calculation: calcResult });
    };

    setBar = (event: any) => {
        let weight = parseInt(event.target.value);
        if (isNaN(weight))
            return;

        this.loadBar(weight, this.state.desiredWeight);
    };

    setWeight = (event: any) => {
        let weight = parseInt(event.target.value);
        weight = (isNaN(weight)) ? 0 : weight;

        this.loadBar(this.state.barWeight, weight);
    }

    render() {
        return (<div>
            <input type="text" onChange={this.setWeight} />
            <input type="text" onChange={this.setBar} />
            <span>ActualWeight: {this.state.calculation.actualWeight} </span>
            <Bar plates={this.state.calculation.plates} />
        </div>);
    }
}