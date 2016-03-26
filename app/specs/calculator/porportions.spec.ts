let expect = chai.expect;
import { proportinalHeight, proportinalWidth } from "./../../logic/calculator/proportions";
import { findPlateOrError } from "./../../logic/calculator/plates";

describe("proportions", () => {
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

    describe("proportinalHeight should", () => {
        it("return max height if scaleHeight is false", () => {
            let result = proportinalHeight(findPlateOrError("lbs", 100), 200, 25);
            expect(result).to.eq(200);
        });

        it("return min height for a 2.5 lb weight", () => {
            let result = proportinalHeight(findPlateOrError("lbs", 2.5), 200, 75);
            expect(result).to.be.above(75).and.to.be.below(85);
        });
    });
});