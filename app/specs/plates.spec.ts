let expect = chai.expect;
import * as tsm from "tsmonad";
import { StandardPlates, MetricPlates, IPlate, findPlate, getPlates, DefaultLbsWeightTree, DefaultKiloWeightTree } from "./../plates";
import * as _ from "lodash";

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

            expect(result).to.equal(StandardPlates);
        });

        it("return metric weight plates when asking for kilo", () => {
            let result = getPlates("kilo")
                .caseOf({
                    just: (v: IPlate[]) => v,
                    nothing: () => null
                });

            expect(result).to.equal(MetricPlates);
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
            expect(result).to.equal(StandardPlates[0]);
        });
    });

    describe("DefaultLbsWeightTree should", () => {
        it("have all lbs unit plates", () => {
            let allStandardPlates = _.every(DefaultLbsWeightTree, { unit: "lbs" });
            expect(allStandardPlates).to.be.true;
        });
    });

    describe("DefaultKiloWeightTree should", () => {
        it("have all kilo unit plates", () => {
            let allStandardPlates = _.every(DefaultKiloWeightTree, { unit: "kilo" });
            expect(allStandardPlates).to.be.true;
        });
    });
});