import { WeightUnit } from "./../calculator/weight-units";
import { IPlate } from "./../calculator/plates";
import { IPlateCalculation } from "./../calculator/plate-calculator";

export const PLATE_CALCULATOR_STATE_CHANGED = "PLATE_CALCULATOR_STATE_CHANGED";

export interface IAction {
    type: string;
};

export interface ICalculatorState {
    units?: WeightUnit;
    requestedWeight?: number;
    barWeight?: number;
    plateTree?: IPlate[];
    plateCalculation?: IPlateCalculation;
}

export interface ICalculatorAction extends IAction, ICalculatorState { }

export const calculatorAction = (state: ICalculatorState): ICalculatorAction => {
    return Object.assign({}, state, { type: PLATE_CALCULATOR_STATE_CHANGED });
};