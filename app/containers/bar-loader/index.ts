import * as React from "react";

import { WeightUnit } from "../../calculator/weight-units";
import { BarLoader, IBarLoaderProperties } from "../../components/bar-loader";
import { calculatorAction, IAction } from "../../actions/plate-calculator-actions";
import { IApplicationState } from "../../reducers/root-reducer";
import { connect } from "react-redux";


const mapBarLoaderStateToProps = (state: IApplicationState) : IBarLoaderProperties => {
    return {
        plateCalculation: state.plateCalculator.plateCalculation,
        units: state.plateCalculator.units
    };
};

export default connect(mapBarLoaderStateToProps)(BarLoader as any);