let expect = chai.expect;
import * as deepFreeze from "deep-freeze";
import { rootReducer } from "./../../reducers/root-reducer";
import { initialState } from "./../../reducers/plate-calculator-reducer";

describe("appReducer", () => {
    const state = deepFreeze({ plateCalculator: initialState });

    it("return intial state if previous state is undefined", () => {
        let result = rootReducer(undefined, { type: "SOMETHING" });
        expect(result).to.eql(state);
    });

    it("return previous state if action type is unknown", () => {
        let result = rootReducer(state, { type: "UNKNOWN_ACTION" });
        expect(result).to.eql(state);
    });
});