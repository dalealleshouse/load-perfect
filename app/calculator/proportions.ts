import { IPlate } from "./plates";

const MAX_SCALED_HEIGHT = {
    lbs: 45,
    kilo: 10
};

const KILO_TO_LBS = 2.20462;

export const proportinalWidth = (maxWidth: number, minWidth: number) =>
    (plate: IPlate) =>
        calc(maxWidth, minWidth, weightInLbs(plate), 100);

export const proportinalHeight = (maxHeight: number, minHeight: number) => (plate: IPlate) =>
    isPlateScaled(plate) ?
        calc(maxHeight, minHeight, weightInLbs(plate), maxScaledHeightInLbs(plate)) :
        maxHeight;

const weightInLbs = (plate: IPlate) =>
    (plate.unit === "lbs") ? plate.weight : plate.weight * KILO_TO_LBS;

const maxScaledHeightInLbs = (plate: IPlate) =>
    (plate.unit === "lbs") ? MAX_SCALED_HEIGHT[plate.unit] : MAX_SCALED_HEIGHT[plate.unit] * KILO_TO_LBS;

const isPlateScaled = (plate: IPlate) =>
    plate.weight <= MAX_SCALED_HEIGHT[plate.unit];

function calc(max: number, min: number, porportion: number, maxPlateSizeInlbs: number) {
    let sizeRange = (max - min);
    let maxIncrement = maxPlateSizeInlbs;
    let sizePerIncrement = sizeRange / maxIncrement;
    return (sizePerIncrement * porportion) + min;
}