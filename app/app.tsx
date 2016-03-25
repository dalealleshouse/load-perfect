import "file?name=[name].[ext]!./index.html";
import "!style!css!less!./styles.less";
import "./global";
import "es6-shim";
import "bootstrap-webpack";

import * as React from "react";
import * as ReactDOM  from "react-dom";

import { BarLoader } from "./components/bar-loader/bar-loader";

ReactDOM.render((
    <div>
        <BarLoader />
    </div>
), document.getElementById("app"));