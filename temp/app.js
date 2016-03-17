"use strict";
require('file?name=[name].[ext]!../index.html');
require('file?name=[name].[ext]!../css/styles.css');
require('file?name=[name].[ext]!../../node_modules/bootstrap/dist/css/bootstrap.css');
require("./global");
require("react");
var game_1 = require('./game');
ReactDOM.render(React.createElement(game_1.Game, null), document.getElementById("root"));
