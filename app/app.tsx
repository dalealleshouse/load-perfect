import "file?name=[name].[ext]!./index.html";
import "es6-shim";
import "!style!css!less!./styles.less";

import * as React from "react";

import * as ReactDOM  from "react-dom";
import { Provider } from "react-redux";
import { App } from "./components/app";
import { store } from "./stores";

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById("app"));