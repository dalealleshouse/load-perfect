import * as React from "react";
import { Bar } from "./../Bar/bar";
import { IPlateCalculation } from "./../../calculator/plate-calculator";
import { WeightUnit } from "./../../calculator/weight-units";

interface ICalculatorInputProperties extends React.Props<React.StatelessComponent<ICalculatorInputProperties>> {
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
    let weightInput: HTMLInputElement = undefined;
    let barWeightInput: HTMLInputElement = undefined;

    const getInputValueAsInt = (input: HTMLInputElement) => {
        const val = parseInt(input.value);
        return isNaN(val) ? 0 : val;
    };

    return (<form>
        <div className="radio">
            <label className="radio-inline" htmlFor="Weight Units-0">
                <input type="radio" name="Weight Units" id="Weight Units-0" value="lbs" onClick={() => onChanged({ units: "lbs" }) } defaultChecked />
                lbs
            </label>
            <label className="radio-inline" htmlFor="Weight Units-1">
                <input type="radio" name="Weight Units" id="Weight Units-1" value="kilo" onClick={() => onChanged({ units: "kilo" }) } />
                kilo
            </label>
        </div>
        <fieldset className="form-group">
            <label htmlFor="totalbarweight">Bar Weight <small>(including collars) </small></label>
            <input ref={n => barWeightInput = n} onChange={ () => onChanged({ barWeight: getInputValueAsInt(barWeightInput) }) } defaultValue={barWeight} name="totalbarweight"
                type="number" placeholder="Bar Weight (including collars)" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
            <label htmlFor="weight">Weight</label>
            <input ref={n => weightInput = n } onChange={ () => onChanged({ requestedWeight: getInputValueAsInt(weightInput) }) } defaultValue={requestedWeight} name="Weight"
                type="number" placeholder="Weight" className="form-control" />
        </fieldset>
    </form>);
};