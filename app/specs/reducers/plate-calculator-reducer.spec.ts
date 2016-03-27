let expect = chai.expect;
import { plateCalculatorReducer, initialState } from "./../../reducers/plate-calculator-reducer";
import * as deepFreeze from "deep-freeze";
import { calculatorAction, ICalculatorState } from "./../../actions/plate-calculator-actions";
import { calculatePlates } from "./../../calculator/plate-calculator";
import { getDefaultPlates } from "./../../calculator/plates";

describe("appReducer", () => {
    const previousState = deepFreeze(initialState);

    it("return intial state if previous state is undefined", () => {
        const result = plateCalculatorReducer(undefined, { type: "SOMETHING" });
        expect(result).to.equal(initialState);
    });

    it("return previous state if action type is unknown", () => {
        const result = plateCalculatorReducer(previousState, { type: "UNKNOWN_ACTION" });
        expect(result).to.equal(previousState);
    });

    it("return updated options with plate calculation and plate tree", () => {
        const state: ICalculatorState = {
            units: "kilo",
            barWeight: 1000,
            requestedWeight: 1000
        };

        const expected = Object.assign({}, state, {
            plateCalculation: calculatePlates([], 1000, 1000),
            plateTree: getDefaultPlates("kilo").valueOr(undefined)
        });
        const action = deepFreeze(calculatorAction(deepFreeze(state)));
        const result = plateCalculatorReducer(previousState, action);

        expect(result).to.eql(expected);
    });

    it("return updated options for single property change", () => {
        testAction("units", "kilo");
        testAction("requestedWeight", 1000);
        testAction("barWeight", 1000);
    });

    function testAction(property: string, value: any) {
        let stateChange = {};
        stateChange[property] = value;

        let action = deepFreeze(calculatorAction(stateChange));
        let result = plateCalculatorReducer(previousState, action);
        expect(result[property]).to.equal(value);
    }
});