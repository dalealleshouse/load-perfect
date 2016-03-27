import { WeightUnit } from "./../calculator/weight-units";
import { getDefaultPlates } from "./../calculator/plates";
import { IPlateCalculation, calculatePlates } from "./../calculator/plate-calculator";
import { PLATE_CALCULATOR_STATE_CHANGED, ICalculatorAction, ICalculatorState } from "./../actions/plate-calculator-actions";

export const initialState: ICalculatorState = {
    units: "lbs",
    plateTree: getDefaultPlates("lbs").valueOr(undefined),
    barWeight: 45,
    requestedWeight: 0,
    plateCalculation: undefined
};

export const plateCalculatorReducer = (previousState: ICalculatorState = initialState, action: ICalculatorAction): ICalculatorState => {
    if (!action) return previousState;

    switch (action.type) {
        case PLATE_CALCULATOR_STATE_CHANGED:
            let newState = Object.assign({}, previousState, action);
            if (previousState.units !== newState.units)
                newState.plateTree = getDefaultPlates(newState.units).valueOr(undefined);

            newState.plateCalculation = calculatePlates(newState.plateTree, newState.barWeight, newState.requestedWeight);

            // this is a bit of a hack to remove the type propery that is added by using the passed in action in the assing method
            delete newState.type;

            return newState;
        default:
            return previousState;
    }
};