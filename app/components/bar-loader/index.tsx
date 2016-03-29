import * as React from "react";
import { Bar } from "./../Bar/bar";
import { IPlateCalculation } from "./../../calculator/plate-calculator";
import { WeightUnit } from "./../../calculator/weight-units";

export interface IBarLoaderProperties extends React.Props<React.StatelessComponent<IBarLoaderProperties>> {
    plateCalculation: IPlateCalculation;
    units: WeightUnit;
}

export const BarLoader = (props: IBarLoaderProperties) => {
    if (!props || !props.plateCalculation || props.plateCalculation.requestedWeight === 0)
        return (<Bar plates={[]} />);

    const displayWeight = (props.plateCalculation.actualWeight !== props.plateCalculation.requestedWeight) ?
        (<div className="alert alert-warning" role="alert">
            <span className="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>
            Unable to calculate exact weight. Weight: <strong>{props.plateCalculation.actualWeight} {props.units}</strong>
        </div>) :
        (<p className="text-center"><mark>{props.plateCalculation.actualWeight} {props.units}</mark></p>);

    return (
        <div>
            <Bar plates={ props.plateCalculation.plates } />
            {displayWeight}
        </div>);
};