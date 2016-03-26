import { WeightUnit } from "./../calculator/weight-units";
import { IPlateCalculation, calculatePlates } from "./../calculator/plate-calculator";
import { IPlate, getDefaultPlates } from "./../calculator/plates";
import { EventEmitter  } from "./event-emitter";

export interface IApplicationState {
    units: WeightUnit;
    weightTree: IPlate[],
    barWeight: number;
    desiredWeight: number;
    plateCalculation: IPlateCalculation;
}

let state: IApplicationState = {
    units: "lbs",
    weightTree: getDefaultPlates("lbs").valueOr(undefined),
    barWeight: 45,
    desiredWeight: 0,
    plateCalculation: undefined
};

class Store extends EventEmitter {
    // loadBar = (plateTree: IPlate[], barWeight: number, desiredWeight: number) => {
    //     let calcResult = calculatePlates(plateTree, barWeight, desiredWeight);
    //     this.setState({ plateTree: plateTree, barWeight: barWeight, desiredWeight: desiredWeight, calculation: calcResult });
    // };

    // setBar = (event: any) => {
    //     let weight = parseInt(event.target.value);
    //     if (isNaN(weight))
    //         return;

    //     this.loadBar(this.state.plateTree, weight, this.state.desiredWeight);
    // };

    // setWeight = (event: any) => {
    //     let weight = parseInt(event.target.value);
    //     weight = (isNaN(weight)) ? 0 : weight;

    //     this.loadBar(this.state.plateTree, this.state.barWeight, weight);
    // }

    // setUnits = (event: React.FormEvent) => {
    //     let target = event.target as HTMLInputElement;
    //     let plates = (target.value === "lbs") ? defaultLbsWeightTree : defaultKiloWeightTree;
    //     this.loadBar(plates, this.state.barWeight, this.state.desiredWeight);
    // }
}

let palteCalculatorStore = new Store();
export { palteCalculatorStore };