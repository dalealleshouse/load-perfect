import "file?name=[name].[ext]!./index.html";
import "./global";
import "es6-shim";

import * as React from "react";
import * as ReactDOM  from "react-dom";

import { BarLoader } from "./components/bar-loader/bar-loader";

ReactDOM.render((
    <div>
        <BarLoader />
    </div>
), document.getElementById("app"));