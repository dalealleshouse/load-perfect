import * as tsm from "tsmonad";
import { WeightUnit } from "./weight-units";

export type PlateColor = "red" | "blue" | "yellow" | "green" | "white" | "black";

export interface IPlate {
    unit: WeightUnit;
    weight: number;
    color: PlateColor;
}

export const lbsPlates: IPlate[] = [
    { unit: "lbs", weight: 100, color: "black" },
    { unit: "lbs", weight: 55, color: "red" },
    { unit: "lbs", weight: 45, color: "blue" },
    { unit: "lbs", weight: 35, color: "yellow" },
    { unit: "lbs", weight: 25, color: "green" },
    { unit: "lbs", weight: 10, color: "white" },
    { unit: "lbs", weight: 5, color: "blue" },
    { unit: "lbs", weight: 2.5, color: "green" }
];

export const kiloPlates: IPlate[] = [
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
export const plates: { [Identifier: string]: IPlate[] } = {
    "lbs": lbsPlates,
    "kilo": kiloPlates
};

export function getPlates(unit: WeightUnit): tsm.Maybe<IPlate[]> {
    let p = plates[unit];
    return (p) ? tsm.Maybe.just(p) : tsm.Maybe.nothing();
}

export function findPlate(unit: WeightUnit, weight: number): tsm.Maybe<IPlate> {
    return getPlates(unit)
        .bind(plates => {
            let p = plates.find(p => p.weight === weight);

            return (p) ? tsm.Maybe.just(p) : tsm.Maybe.nothing();
        });
}

export function findPlateOrError(unit: WeightUnit, weight: number): IPlate {
    let plate = plates[unit]
        .find(p => p.weight === weight);

    if (plate) return plate;

    throw new Error("Unable to find specified plate");
}

export const defaultLbsWeightTree: IPlate[] = [
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

export const defaultKiloWeightTree: IPlate[] = [
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

export function proportinalWidth(plate: IPlate, maxPlateWidth: number, minPlateWidth: number) {
    let base = (plate.unit === "lbs") ? plate.weight : plate.weight * 2;

    // The largest a plate should be is 60 and the smallest is 25
    let scale = maxPlateWidth - minPlateWidth;
    let maxPlate = 100;
    return (base * (scale / maxPlate)) + minPlateWidth;
}

export function proportinalHeight(plate: IPlate) {
    switch (plate.unit) {
        case "lbs":
            return (plate.weight > 35) ? 200 : ((plate.weight / 7) + 9) * 12;
        case "kilo":
            return (plate.weight > 5) ? 200 : (plate.weight + 10) * 11;
        default:
            break;
    }

    let base = (plate.unit === "kilo") ? plate.weight * 2 : plate.weight;
    return (base > 25) ? 200 : (plate.weight + 15) * 4;
}