
declare var require: any;

require("!style!css!../css/styles.css");
require("jquery");
require("bootstrap-webpack");
require('file?name=[name].[ext]!../index.html');
require("./global");
require("react");

import {Game} from "./game";

ReactDOM.render(<Game />, document.getElementById("root"));


// import {Main} from './script';

// ReactDOM.render(<Main />, document.getElementById("root"));