import { WeightUnit } from "./weight-units";

export interface IBar {
    unit: WeightUnit;
    weight: number;
}

export const StandardLbsBar = { unit: "lbs", weight: 45 };
export const StandardKiloBar = { unit: "kilo", weight: 20 };