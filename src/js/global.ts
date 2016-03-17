export {}

/* tslint:disable */
declare global {
    interface Array<T> {
        contains(o: T): boolean;
        remove(o: T): T[];
    }
}
/* tslint:enable */

Array.prototype.contains = function(o) {
    return this.indexOf(o) >= 0;
};

Array.prototype.remove = function(o) {
    let i = this.indexOf(o);

    if (i >= 0) this.splice(i, 1);
    return this;
};