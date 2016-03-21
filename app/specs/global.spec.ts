require("../global");
let expect = chai.expect;
import * as tsm from "tsmonad";

describe("global Array<T>", () => {
    describe("find should", () => {
        it("should find an item", () => {
            let result = [1, 2, 3]
                .find(n => n === 2);

            expect(result.equals(tsm.Maybe.just(2))).to.be.true;
        });

        it("should return Maybe.nothing for not found", () => {
            let result = [1, 2, 3]
                .find(n => false);

            expect(result.equals(tsm.Maybe.nothing())).to.be.true;
        });
    });

    describe("findIndex should", () => {
        it("should find an index", () => {
            let result = [1, 2, 3]
                .findIndex(n => n === 2);

            expect(result.equals(tsm.Maybe.just(1))).to.be.true;
        });

        it("should return Maybe.nothing for not found", () => {
            let result = [1, 2, 3]
                .findIndex(n => false);

            expect(result.equals(tsm.Maybe.nothing())).to.be.true;
        });

        it("should return first index", () => {
            let result = [1, 2, 3, 2, 2, 2]
                .findIndex(n => false);

            expect(result.equals(tsm.Maybe.nothing())).to.be.true;
        });
    });
})