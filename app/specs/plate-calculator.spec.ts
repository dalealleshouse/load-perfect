let expect = chai.expect;
import { IPlate, DefaultLbsWeightTree, DefaultKiloWeightTree, findPlateOrError } from "./../plates";
import { platesPerSide, minWeight, totalPlateWeight, calculatePlates } from "./../plate-calculator";
import { WeightUnit } from "./../weight-units";
import { StandardLbsBar } from "./../bars";

describe("plate calculator", () => {
    describe("minWeight should", () => {
        it("return 0 for empty or null weight tree", () => {
            expect(minWeight(null)).to.eql(0);
            expect(minWeight([])).to.eql(0);
        });

        it("return 2.5 from default lbs weight tree", () => {
            expect(minWeight(DefaultLbsWeightTree)).to.eql(2.5);
        });

        it("return 0.5 from default kilo weight tree", () => {
            expect(minWeight(DefaultKiloWeightTree)).to.eql(0.5);
        });
    });

    describe("totalPlateWeight should", () => {
        it("return 0 for null or empty plates", () => {
            expect(totalPlateWeight([])).to.eql(0);
            expect(totalPlateWeight(null)).to.eql(0);
        });

        it("return 90 for one 45 plate", () => {
            let result = totalPlateWeight(buildPlates("lbs", 45));
            expect(result).to.eql(90);
        });

        it("return 375 for one of every plate", () => {
            let result = totalPlateWeight(buildPlates("lbs", 100, 45, 25, 10, 5, 2.5));
            expect(result).to.eql(375);
        });
    });

    describe("platesPerSide should", () => {
        it("return empty array for zero", () => {
            let result = platesPerSide(DefaultLbsWeightTree, 0);
            expect(result).to.not.be.undefined;
        });

        it("return one 45 for 90", () => {
            let result = platesPerSide(DefaultLbsWeightTree, 90);
            testPlates(result.plates, 45);
        });

        it("return two 45 for 180", () => {
            let result = platesPerSide(DefaultLbsWeightTree, 180);
            testPlates(result.plates, 45, 45);
        });

        it("return one of every plate for 375", () => {
            let result = platesPerSide(DefaultLbsWeightTree, 375);
            testPlates(result.plates, 100, 45, 25, 10, 5, 2.5);
        });

        it("return two 100, one 45, and one 5 for 500", () => {
            let result = platesPerSide(DefaultLbsWeightTree, 500);
            testPlates(result.plates, 100, 100, 45, 5);
        });

        it("return only plates in the tree", () => {
            let sampleTree = buildPlates("lbs", 25, 10, 10);
            let result = platesPerSide(sampleTree, 140);
            testPlates(result.plates, 25, 10, 10);
        });

        it("calculate actual vs. requested weight", () => {
            let tree = buildPlates("lbs", 100, 45, 10);
            let result = platesPerSide(tree, 400);
            expect(result.requestedWeight).to.eql(400);
            expect(result.actualWeight).to.eql(310);
        });

        it("calculate as close as possible for weights that can't be exact", () => {
            let result = platesPerSide(DefaultLbsWeightTree, 107);
            testPlates(result.plates, 45, 5, 2.5);
            expect(result.requestedWeight).to.eql(107);
            expect(result.actualWeight).to.eql(105);
        });

        it("return empty tree for weights that are too low", () => {
            let result = platesPerSide(DefaultLbsWeightTree, 1);
            expect(result.plates).to.eqls([]);
            expect(result.requestedWeight).to.eql(1);
            expect(result.actualWeight).to.eql(0);
        });
    });

    describe("calculatePlates should", () => {
        it("return bar weight and no plates for less than bar weight", () => {
            let result = calculatePlates(DefaultLbsWeightTree, StandardLbsBar.weight, 40);
            expect(result).to.eqls({ requestedWeight: 40, actualWeight: 45, plates: [] });
        });

        it("return 1 45 plate for 135", () => {
            let result = calculatePlates(DefaultLbsWeightTree, StandardLbsBar.weight, 135);
            console.log(result);
            console.log(result.plates);
            expect(result).to.eqls({
                requestedWeight: 135,
                actualWeight: 135,
                plates: buildPlates("lbs", 45)
            });
        });
    });

    function testPlates(testTree: IPlate[], ...expectedWeights: number[]) {
        expect(testTree.length, `testTree has a length of ${testTree.length} and expectedWeights has a length of ${expectedWeights.length}`)
            .to
            .eql(expectedWeights.length);

        testTree.forEach((p, i) =>
            expect(p.weight, `Invalid plate at index ${i}`)
                .to
                .equal(expectedWeights[i]));
    }

    function buildPlates(unit: WeightUnit, ...weights: number[]) {
        return weights.map(w => findPlateOrError(unit, w));
    }
});