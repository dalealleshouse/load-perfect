let expect = chai.expect;
import { calculatorAction, ICalculatorState, ICalculatorAction, PLATE_CALCULATOR_STATE_CHANGED } from "./../../actions/plate-calculator-actions";

describe("calculatorAction should", () => {
    const state: ICalculatorState = {
        units: "kilo",
        barWeight: 1000,
        requestedWeight: 1000,
        plateTree: []
    };

    it("return action object with specified properties", () => {
        const expected: ICalculatorAction = Object.assign({}, state, { type: PLATE_CALCULATOR_STATE_CHANGED });

        let result = calculatorAction(state);
        expect(result).to.eql(expected);
    });
});