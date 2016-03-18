import {DoneFrame} from "../js/done-frame";

describe("test", () => {
    it("should fail", () => {
        let df = new DoneFrame();
       expect(false).toBe(true);
    });
    
    fit("should pass", () => {
        let df = new DoneFrame();
       expect(false).toBe(false);
    });
});