let expect = chai.expect;
import { proportinalHeight, proportinalWidth } from "./../../calculator/proportions";
import { findPlateOrError } from "./../../calculator/plates";

describe("proportions", () => {
    describe("proportinalWidth should", () => {
        const getWidth = proportinalWidth(60, 25);

        it("return max plate width for a 100 lb weight", () => {
            let result = getWidth(findPlateOrError("lbs", 100));
            expect(result).to.eq(60);
        });

        it("return min plate width for a 2.5 lb weight", () => {
            let result = getWidth(findPlateOrError("lbs", 2.5));
            expect(result).to.be.above(25).and.to.be.below(26);
        });
    });

    describe("proportinalHeight should", () => {
        const getHeight = proportinalHeight(200, 25);

        it("return max height if scaleHeight is false", () => {
            let result = getHeight(findPlateOrError("lbs", 100));
            expect(result).to.eq(200);
        });

        it("return min height for a 2.5 lb weight", () => {
            let result = getHeight(findPlateOrError("lbs", 2.5));
            expect(result).to.be.above(25).and.to.be.below(35);
        });
    });
});