"use strict";
Array.prototype.contains = function (o) {
    return this.indexOf(o) >= 0;
};
Array.prototype.remove = function (o) {
    var i = this.indexOf(o);
    if (i >= 0)
        this.splice(i, 1);
    return this;
};
