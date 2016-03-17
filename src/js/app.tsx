
declare var require: any;

require("!style!css!../css/styles.css");
require("jquery");
require("bootstrap-webpack");
require("file?name=[name].[ext]!../index.html");
require("./global");

import * as React from "react";
import * as ReactDOM  from "react-dom";
import {Game} from "./game";

ReactDOM.render(<Game />, document.getElementById("root"));