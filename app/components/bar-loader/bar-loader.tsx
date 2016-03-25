import * as React from "react";
import { IPlate } from "./../../calculator/plates";
import { Bar } from "./../bar/bar";
import { calculatePlates, IPlateCalculation } from "./../../calculator/plate-calculator";
import { defaultLbsWeightTree, defaultKiloWeightTree } from  "./../../calculator/plates";

interface IBarLoaderState {
    calculation?: IPlateCalculation;
    barWeight?: number;
    desiredWeight?: number;
    plateTree?: IPlate[];
}

export class BarLoader extends React.Component<{}, IBarLoaderState> {
    constructor() {
        super();
        this.state = {
            calculation: { plates: [], actualWeight: 0, requestedWeight: 0 },
            barWeight: 45,
            plateTree: defaultLbsWeightTree
        };
    }

    loadBar = (plateTree: IPlate[], barWeight: number, desiredWeight: number) => {
        let calcResult = calculatePlates(plateTree, barWeight, desiredWeight);
        this.setState({ plateTree: plateTree, barWeight: barWeight, desiredWeight: desiredWeight, calculation: calcResult });
    };

    setBar = (event: any) => {
        let weight = parseInt(event.target.value);
        if (isNaN(weight))
            return;

        this.loadBar(this.state.plateTree, weight, this.state.desiredWeight);
    };

    setWeight = (event: any) => {
        let weight = parseInt(event.target.value);
        weight = (isNaN(weight)) ? 0 : weight;

        this.loadBar(this.state.plateTree, this.state.barWeight, weight);
    }

    setUnits = (event: React.FormEvent) => {
        let target = event.target as HTMLInputElement;
        let plates = (target.value === "lbs") ? defaultLbsWeightTree : defaultKiloWeightTree;
        this.loadBar(plates, this.state.barWeight, this.state.desiredWeight);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <form className="form-horizontal">
                            <fieldset>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="Weight Units">Weight Units</label>
                                    <div className="col-md-4">
                                        <label className="radio-inline" for="Weight Units-0">
                                            <input type="radio" name="Weight Units" id="Weight Units-0" value="lbs" onClick={this.setUnits} defaultChecked />
                                            lbs
                                        </label>
                                        <label className="radio-inline" for="Weight Units-1">
                                            <input type="radio" name="Weight Units" id="Weight Units-1" value="kilo" onClick={this.setUnits} />
                                            kilo
                                        </label>
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="weight">Weight</label>
                                    <div className="col-md-4">
                                        <input onChange={this.setWeight} defaultValue={this.state.desiredWeight} id="weight" name="Weight" type="text" placeholder="Weight" className="form-control input-md" />
                                        <span className="help-block">Weight</span>
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="totalbarweight">Total Bar Weight</label>
                                    <div className="col-md-4">
                                        <input onChange={this.setBar} defaultValue={this.state.barWeight} id="totalbarweight" name="totalbarweight" type="text" placeholder="Total Bar Weight" className="form-control input-md" />
                                        <span className="help-block">Bar weight (including collars)</span>
                                    </div>
                                </div>

                            </fieldset>
                        </form>
                    </div>
                    <div className="col-md-9">
                        <Bar plates={this.state.calculation.plates} />
                        <span>ActualWeight: {this.state.calculation.actualWeight}</span>
                    </div>
                </div>
            </div>);
    }
}