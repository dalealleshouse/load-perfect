import "file?name=[name].[ext]!./index.html";
import "!style!css!less!./styles.less";
import "es6-shim";
import "bootstrap-webpack";

import * as React from "react";
import * as ReactDOM  from "react-dom";
/// FLUX
import { EventEmitter } from "./logic/flux/event-emitter";
import { Dispatcher, IAction } from "./logic/flux/dispatcher";
import { palteCalculatorStore } from "./logic/flux/plate-calculator-store";

let d = new Dispatcher();
d.register(action => {
    switch (action.actionType) {
        case "APP_START":
            console.log("APP_START");
    }
});

d.dispatch({
    actionType: "APP_START",
    data: "started"
});


//// FLUX

import { BarLoader } from "./components/bar-loader/bar-loader";



ReactDOM.render((
    <div>
        <BarLoader />
    </div>
), document.getElementById("app"));