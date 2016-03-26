import { WeightUnit } from "./weight-units";
import * as TsMonad from "tsmonad";

type PlateColor = "red" | "blue" | "yellow" | "green" | "white" | "black";

export interface IPlate {
    unit: WeightUnit;
    weight: number;
    color: PlateColor;
    scaleHeight: boolean;
}

const lbsPlates: IPlate[] = [
    { unit: "lbs", weight: 100, color: "black", scaleHeight: false },
    { unit: "lbs", weight: 55, color: "red", scaleHeight: false },
    { unit: "lbs", weight: 45, color: "blue", scaleHeight: false },
    { unit: "lbs", weight: 35, color: "yellow", scaleHeight: true },
    { unit: "lbs", weight: 25, color: "green", scaleHeight: true },
    { unit: "lbs", weight: 10, color: "white", scaleHeight: true },
    { unit: "lbs", weight: 5, color: "blue", scaleHeight: true },
    { unit: "lbs", weight: 2.5, color: "green", scaleHeight: true }
];

const kiloPlates: IPlate[] = [
    { unit: "kilo", weight: 25, color: "red", scaleHeight: false },
    { unit: "kilo", weight: 20, color: "blue", scaleHeight: false },
    { unit: "kilo", weight: 15, color: "yellow", scaleHeight: false },
    { unit: "kilo", weight: 10, color: "green", scaleHeight: false },
    { unit: "kilo", weight: 5, color: "white", scaleHeight: true },
    { unit: "kilo", weight: 2.5, color: "red", scaleHeight: true },
    { unit: "kilo", weight: 2, color: "blue", scaleHeight: true },
    { unit: "kilo", weight: 1.5, color: "yellow", scaleHeight: true },
    { unit: "kilo", weight: 1, color: "green", scaleHeight: true },
    { unit: "kilo", weight: 0.5, color: "white", scaleHeight: true }
];

// How f'n awesome would it be if I could make the key type WeightUnit...
const plates: { [key: string]: IPlate[] } = {
    "lbs": lbsPlates,
    "kilo": kiloPlates
};

const getPlatesFromDictonary =
    (plateDictonary: { [Identifier: string]: IPlate[] }) =>
        (unit: WeightUnit) =>
            (plateDictonary[unit]) ? TsMonad.Maybe.just(plateDictonary[unit]) : TsMonad.Maybe.nothing();;

export const getPlates = getPlatesFromDictonary(plates);

export const findPlate = (unit: WeightUnit, weight: number) => getPlates(unit)
    .fmap(plates => plates.find(p => p.weight === weight));

export function findPlateOrError(unit: WeightUnit, weight: number): IPlate {
    let plate = findPlate(unit, weight).valueOr(undefined);

    if (plate) return plate;

    throw new Error("Unable to find specified plate");
}

const defaultLbsWeightTree: IPlate[] = [
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

const defaultKiloWeightTree: IPlate[] = [
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

const defaultPlates: { [Identifier: string]: IPlate[] } = {
    "lbs": defaultLbsWeightTree,
    "kilo": defaultKiloWeightTree
};

export const getDefaultPlates = getPlatesFromDictonary(defaultPlates);