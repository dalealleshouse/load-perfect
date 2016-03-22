let expect = chai.expect;
import * as tsm from "tsmonad";
import { lbsPlates, kiloPlates, IPlate, findPlate, getPlates,
    proportinalHeight, proportinalWidth, defaultLbsWeightTree,
    defaultKiloWeightTree, findPlateOrError } from "./../../calculator/plates";

describe("plates", () => {
    function isNothing<T>(maybe: tsm.Maybe<T>) {
        return maybe.equals(tsm.Maybe.nothing());
    };

    describe("getPlates should", () => {
        it("return standard weight plates when asking for lbs", () => {
            let result = getPlates("lbs")
                .caseOf({
                    just: (v: IPlate[]) => v,
                    nothing: () => null
                });

            expect(result).to.equal(lbsPlates);
        });

        it("return metric weight plates when asking for kilo", () => {
            let result = getPlates("kilo")
                .caseOf({
                    just: (v: IPlate[]) => v,
                    nothing: () => null
                });

            expect(result).to.equal(kiloPlates);
        });

        it("should return Maybe.nothing when asking for null", () => {
            let result = getPlates(null);
            expect(isNothing(result)).to.be.true;
        });
    });

    describe("findPlate should", () => {
        it("return Maybe.nothing if plate is not found", () => {
            let result = findPlate("lbs", 0);
            expect(isNothing(result)).to.be.true;
        });

        it("return Maybe.nothing if null weight unit", () => {
            let result = findPlate(null, 0);
            expect(isNothing(result)).to.be.true;
        });

        it("return requested plate", () => {
            let result = findPlate("lbs", 100)
                .caseOf({
                    just: p => p,
                    nothing: () => null
                });

            // this should be doing a reference equal
            expect(result).to.equal(lbsPlates[0]);
        });
    });

    describe("DefaultLbsWeightTree should", () => {
        it("have all lbs unit plates", () => {
            let allStandardPlates = defaultLbsWeightTree.every(w => w.unit === "lbs");
            expect(allStandardPlates).to.be.true;
        });
    });

    describe("DefaultKiloWeightTree should", () => {
        it("have all kilo unit plates", () => {
            let allStandardPlates = defaultKiloWeightTree.every(w => w.unit === "kilo");
            expect(allStandardPlates).to.be.true;
        });
    });

    describe("proportinalWidth should", () => {
        it("return max plate width for a 100 lb weight", () => {
            let result = proportinalWidth(findPlateOrError("lbs", 100), 60, 25);
            expect(result).to.eq(60);
        });

        it("return min plate width for a 2.5 lb weight", () => {
            let result = proportinalWidth(findPlateOrError("lbs", 2.5), 60, 25);
            expect(result).to.be.above(25).and.to.be.below(26);
        });
    });
});