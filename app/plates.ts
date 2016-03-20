import * as tsm from "tsmonad";
import * as _ from "lodash";
import { WeightUnit } from "./weight-units";

export type PlateColor = "red" | "blue" | "yellow" | "green" | "white" | "black";

export interface IPlate {
    unit: WeightUnit;
    weight: number;
    color: PlateColor;
}

export const StandardPlates: IPlate[] = [
    { unit: "lbs", weight: 100, color: "black" },
    { unit: "lbs", weight: 55, color: "red" },
    { unit: "lbs", weight: 45, color: "blue" },
    { unit: "lbs", weight: 25, color: "green" },
    { unit: "lbs", weight: 35, color: "yellow" },
    { unit: "lbs", weight: 10, color: "white" },
    { unit: "lbs", weight: 5, color: "blue" },
    { unit: "lbs", weight: 2.5, color: "green" }
];

export const MetricPlates: IPlate[] = [
    { unit: "kilo", weight: 25, color: "red" },
    { unit: "kilo", weight: 20, color: "blue" },
    { unit: "kilo", weight: 15, color: "yellow" },
    { unit: "kilo", weight: 10, color: "green" },
    { unit: "kilo", weight: 5, color: "white" },
    { unit: "kilo", weight: 2.5, color: "red" },
    { unit: "kilo", weight: 2, color: "blue" },
    { unit: "kilo", weight: 1.5, color: "yellow" },
    { unit: "kilo", weight: 1, color: "green" },
    { unit: "kilo", weight: 0.5, color: "white" }
];

// How f'n awesome would it be if I could make the Indentifer type WeightUnit...
export const Plates: { [Identifier: string]: IPlate[] } = {
    "lbs": StandardPlates,
    "kilo": MetricPlates
};

export function getPlates(unit: WeightUnit): tsm.Maybe<IPlate[]> {
    let plates = Plates[unit];
    return (plates) ? tsm.Maybe.just(plates) : tsm.Maybe.nothing();
}

export function findPlate(unit: WeightUnit, weight: number): tsm.Maybe<IPlate> {
    return getPlates(unit)
        .bind(plates => {
            let plate = _.find(plates, { weight: weight });
            return (plate) ? tsm.Maybe.just(plate) : tsm.Maybe.nothing();
        });
}

export function findPlateOrError(unit: WeightUnit, weight: number): IPlate {
    let plate = _.find(Plates[unit], { weight: weight });

    if (plate) return plate;

    throw new Error("Unable to find specified plate");
}

export const DefaultLbsWeightTree: IPlate[] = [
    findPlateOrError("lbs", 100),
    findPlateOrError("lbs", 100),
    findPlateOrError("lbs", 100),
    findPlateOrError("lbs", 100),
    findPlateOrError("lbs", 45),
    findPlateOrError("lbs", 45),
    findPlateOrError("lbs", 25),
    findPlateOrError("lbs", 10),
    findPlateOrError("lbs", 10),
    findPlateOrError("lbs", 5),
    findPlateOrError("lbs", 2.5)
];

export const DefaultKiloWeightTree: IPlate[] = [
    findPlateOrError("kilo", 25),
    findPlateOrError("kilo", 25),
    findPlateOrError("kilo", 25),
    findPlateOrError("kilo", 25),
    findPlateOrError("kilo", 25),
    findPlateOrError("kilo", 25),
    findPlateOrError("kilo", 20),
    findPlateOrError("kilo", 15),
    findPlateOrError("kilo", 10),
    findPlateOrError("kilo", 5),
    findPlateOrError("kilo", 2.5),
    findPlateOrError("kilo", 2),
    findPlateOrError("kilo", 1),
    findPlateOrError("kilo", 0.5)
];