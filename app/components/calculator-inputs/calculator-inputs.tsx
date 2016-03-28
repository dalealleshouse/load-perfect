import * as React from "react";
import { Bar } from "./../Bar/bar";
import { IPlateCalculation } from "./../../calculator/plate-calculator";
import { WeightUnit } from "./../../calculator/weight-units";

interface ICalculatorInputProperties extends React.Props<React.Component<ICalculatorInputProperties, {}>> {
    units: WeightUnit;
    requestedWeight: number;
    barWeight: number;
    onChanged: (change: ICalculatorInput) => void;
}

export interface ICalculatorInput {
    units?: WeightUnit;
    requestedWeight?: number;
    barWeight?: number;
}

export const CalculatorInputs = ({ onChanged, barWeight, requestedWeight, units, children }: ICalculatorInputProperties) => {
    const changeWeight = (event: React.FormEvent) =>
        onChanged({ "requestedWeight": getInputValueAsInt(event.target as HTMLInputElement) });

    const changeBarWeight = (event: React.FormEvent) =>
        onChanged({ "barWeight": getInputValueAsInt(event.target as HTMLInputElement) });

    const changeUnit = (event: React.FormEvent) =>
        onChanged({ "units": (event.target as HTMLInputElement).value as WeightUnit });

    const getInputValueAsInt = (input: HTMLInputElement) => {
        const val = parseInt(input.value);
        return isNaN(val) ? 0 : val;
    };

    return (<form>
        <label htmlFor="Weight Units">Weight Units</label>
        <div className="radio">
            <label className="radio-inline" htmlFor="Weight Units-0">
                <input type="radio" name="Weight Units" id="Weight Units-0" value="lbs" onClick={changeUnit} defaultChecked />
                lbs
            </label>
            <label className="radio-inline" htmlFor="Weight Units-1">
                <input type="radio" name="Weight Units" id="Weight Units-1" value="kilo" onClick={changeUnit} />
                kilo
            </label>
        </div>
        <fieldset className="form-group">
            <label htmlFor="totalbarweight">Bar Weight <small>(including collars) </small></label>
            <input onChange={changeBarWeight} defaultValue={barWeight} id="totalbarweight" name="totalbarweight"
                type="number" placeholder="Total Bar Weight" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
            <label htmlFor="weight">Weight</label>
            <input onChange={changeWeight} defaultValue={requestedWeight} id="weight" name="Weight"
                type="number" placeholder="Weight" className="form-control" />
        </fieldset>
    </form>);
};