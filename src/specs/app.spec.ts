import {DoneFrame} from "../js/done-frame";
let expect = chai.expect;

describe("test", () => {
    it("should fail", () => {
        expect(true).to.be.false;
    });

    it("should pass", () => {
       expect (true).to.be.true;
    });
});