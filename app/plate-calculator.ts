import { IPlate } from "./plates";
import { WeightUnit } from "./weight-units";

export interface IPlateCalculation {
    requestedWeight: number;
    actualWeight: number;
    plates: IPlate[];
}

export function minWeight(weightTree: IPlate[]): number {
    if (!weightTree || weightTree.length === 0) return 0;

    return _.min(_.map(weightTree, w => w.weight));
}

export function totalPlateWeight(weightTree: IPlate[]): number {
    if (!weightTree || weightTree.length === 0) return 0;

    return weightTree
        .map(p => p.weight)
        .reduce((prev, curr) => prev + (curr * 2), 0);
}

export function platesPerSide(weightTree: IPlate[], desiredWeightMinusBar: number): IPlateCalculation {
    if (!weightTree || desiredWeightMinusBar <= 0) {
        return {
            requestedWeight: desiredWeightMinusBar,
            actualWeight: 0,
            plates: []
        };
    }

    let minTreeWeight = minWeight(weightTree);
    let newSortedTree = weightTree.slice().sort((a, b) => b.weight - a.weight);
    let plates = recursiveGetPlates(newSortedTree, [], desiredWeightMinusBar);

    return {
        requestedWeight: desiredWeightMinusBar,
        actualWeight: totalPlateWeight(plates),
        plates: plates
    };

    // I'm sure there is a much more preformant way to do this...
    // if it ever becomes a problem, I'll deal with it then...
    function recursiveGetPlates(weightTree: IPlate[], plates: IPlate[], weight: number): IPlate[] {
        if (!weight || weight < minTreeWeight) return plates;

        let index = _.findIndex(weightTree, w => w.weight * 2 <= weight);
        let plate = weightTree[index];

        return (!plate) ?
            plates :
            recursiveGetPlates(
                // It's strange, but the way this is transpiled, the splice(0, index) 
                // will be at the head of the array
                [...weightTree.slice(index + 1), ...weightTree.splice(0, index)],
                [...plates, plate],
                weight - (plate.weight * 2));
    }
};

export function calculatePlates(weightTree: IPlate[], totalWeightOfBar: number, desiredWeight: number): IPlateCalculation {
    if (desiredWeight <= totalWeightOfBar) {
        return {
            requestedWeight: desiredWeight,
            actualWeight: totalWeightOfBar,
            plates: []
        };
    }

    let ps = platesPerSide(weightTree, desiredWeight - totalWeightOfBar);

    return {
        requestedWeight: desiredWeight,
        actualWeight: ps.actualWeight + totalWeightOfBar,
        plates: ps.plates
    };
}
