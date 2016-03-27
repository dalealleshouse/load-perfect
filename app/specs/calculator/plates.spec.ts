import * as TsMonad from "tsmonad";
let expect = chai.expect;
import { IPlate, findPlate, getPlates, getDefaultPlates, findPlateOrError } from "./../../calculator/plates";

describe("plates", () => {
    function isNothing<T>(maybe: TsMonad.Maybe<T>) {
        return maybe.equals(TsMonad.Maybe.nothing());
    };

    describe("getPlates should", () => {
        it("return standard weight plates when asking for lbs", () => {
            let result = getPlates("lbs")
                .fmap(plates => plates.every(p => p.unit === "lbs"))
                .valueOr(false);

            expect(result).to.be.true;
        });

        it("return metric weight plates when asking for kilo", () => {
            let result = getPlates("kilo")
                .fmap(plates => plates.every(p => p.unit === "kilo"))
                .valueOr(false);

            expect(result).to.be.true;
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

            expect(result).to.eql({ unit: "lbs", weight: 100, color: "black" });
        });
    });

    describe("DefaultLbsWeightTree should", () => {
        it("have all lbs unit plates", () => {
            let result = getDefaultPlates("lbs")
                .fmap(plates => plates.every(w => w.unit === "lbs"))
                .valueOr(false);

            expect(result).to.be.true;
        });
    });

    describe("DefaultKiloWeightTree should", () => {
        it("have all kilo unit plates", () => {
            let result = getDefaultPlates("kilo")
                .fmap(plates => plates.every(w => w.unit === "kilo"))
                .valueOr(false);

            expect(result).to.be.true;
        });
    });
});