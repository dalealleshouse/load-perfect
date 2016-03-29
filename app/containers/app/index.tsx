import * as React from "react";

import BarLoader from "../bar-loader";
import CalculatorInputs from "../calculator-inputs";

export const App = () => (<div className="container">
    <div className="row">
        <div className="col-md-3">
            <CalculatorInputs />
        </div>
        <div className="col-md-9">
            <BarLoader />
        </div>
    </div>
</div>);