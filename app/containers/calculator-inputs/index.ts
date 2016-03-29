import * as React from "react";

import { CalculatorInputs, ICalculatorInput } from "../../components/calculator-inputs";
import { calculatorAction, IAction } from "../../actions/plate-calculator-actions";
import { IApplicationState } from "../../reducers/root-reducer";
import { connect } from "react-redux";

const mapStateToProps = (state: IApplicationState): ICalculatorInput => {
    return {
        units: state.plateCalculator.units,
        requestedWeight: state.plateCalculator.requestedWeight,
        barWeight: state.plateCalculator.barWeight
    };
};

const mapDispatchToProps = (dispatch: (action: IAction) => void) => {
    return {
        onChanged: (change: ICalculatorInput) => {
            const action = calculatorAction(change);
            dispatch(action);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorInputs as any);