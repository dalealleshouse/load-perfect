
declare var require: any;

// Copy required files into dist directory
require('file?name=[name].[ext]!../css/styles.css');
require('file?name=[name].[ext]!../index.html');
require("./global");
require("react");

import {Game} from './game';

ReactDOM.render(<Game />, document.getElementById("root"));


// import {Main} from './script';

// ReactDOM.render(<Main />, document.getElementById("root"));