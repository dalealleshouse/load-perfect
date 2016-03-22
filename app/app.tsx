import "file?name=[name].[ext]!./index.html";
import "./global";
import "es6-shim";

import * as React from "react";
import * as ReactDOM  from "react-dom";

import { Plate } from "./componets/plate/plate";
import { defaultLbsWeightTree, defaultKiloWeightTree } from "./calculator/plates";

let plates = defaultLbsWeightTree.map((p, i) => (<Plate key={i} plate={p} />));
let mplates = defaultKiloWeightTree.map((p, i) => (<Plate key={i} plate={p} />));

ReactDOM.render((<div>
    <div className="plateTree">
        {plates}
    </div>
    <div className="plateTree">
        {mplates}
    </div>
</div>), document.getElementById("app"));