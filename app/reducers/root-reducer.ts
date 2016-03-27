import * as Redux from "redux";
import { ICalculatorState, IAction } from "./../actions/plate-calculator-actions";
import { plateCalculatorReducer as plateCalculator } from "./../reducers/plate-calculator-reducer";

export interface IApplicationState {
    plateCalculator: ICalculatorState;
}

export const rootReducer = Redux.combineReducers({
    plateCalculator
});