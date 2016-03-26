import { IPlate } from "./plates";

const maxPlate = 100;

export function proportinalWidth(plate: IPlate, maxWidth: number, minWidth: number) {
    return calcPorportion(maxWidth, minWidth, proportionalSize(plate));
}

export function proportinalHeight(plate: IPlate, maxHeight: number, minHeight: number) {
    return plate.scaleHeight ?
        calcPorportion(maxHeight, minHeight, proportionalSize(plate), 3) :
        maxHeight;
}

function proportionalSize(plate: IPlate) {
    return (plate.unit === "lbs") ? plate.weight : plate.weight * 2.20462;
}

function calcPorportion(max: number, min: number, porportion: number, proportionModifer: number = 1) {
    let sizePerIncrement = (max - min) * proportionModifer;
    return (porportion * sizePerIncrement / maxPlate) + min;
}