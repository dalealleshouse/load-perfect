import "file?name=[name].[ext]!./index.html";
import "es6-shim";
import "!style!css!less!./styles.less";

import * as React from "react";
import * as ReactDOM  from "react-dom";
import { store } from "./stores/app-store";

import { BarLoader } from "./components/bar-loader/bar-loader";
import { CalculatorInputs, ICalculatorInput } from "./components/calculator-inputs/calculator-inputs";
import { calculatorAction } from "./actions/plate-calculator-actions";

const onChanged = (change: ICalculatorInput) => {
    const action = calculatorAction(change);
    store.dispatch(action);
};

const render = () => ReactDOM.render((
    <div className="container">
        <div className="row">
            <div className="col-md-3">
                <CalculatorInputs {...store.getState().plateCalculator} onChanged={onChanged} >will this work?</CalculatorInputs>
            </div>
            <div className="col-md-9">
                <BarLoader {...store.getState().plateCalculator} />
            </div>
        </div>
    </div>
), document.getElementById("app"));

render();
store.subscribe(render);